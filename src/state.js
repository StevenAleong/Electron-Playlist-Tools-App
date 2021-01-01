import { reactive, readonly } from 'vue';
import { v4 as uuidv4 } from 'uuid';

const moment = require('moment');

const Store = require('electron-store');

const jobSchema = {
    type: 'object',
    properties: {
        uniqueId: { type: 'string', default: '' },
        source: { type: 'string', default: '' },
        name: { type: 'string', default: '' },
        playlistId: { type: 'string', default: '' },
        jobType: { type: 'string', default: 'shuffle' },
        frequency: { type: 'number', default: 1 },
        unit: { type: 'string', default: 'day' },
        lastDone: { type: 'string', format: 'date-time', default: '' },
        totalTracks: { type: 'number', default: 0 },
        progress: { type: 'number', default: 0 },
        dateAdded: { type: 'string', format: 'date-time', default: '' },
        cancelProcessing: { type: 'boolean', default: false }
    }
};

const schema = {
    spotifyData: {
        type: 'object',
        token: {
            type: 'object',
            access: { type: 'string', default: '' },
            expiresOn: { type: 'date-time', default: '' },
            refreshToken: { type: 'string', default: '' }
        },
        showSpotify: { type: 'number', default:  1 },
        username: { type: 'string', default: '' }
    },
    deezerData: {
        type: 'object',
        token: {
            type: 'object',
            access: { type: 'string', default: '' },
            expiresOn: { type: 'date-time', default: '' },
        },
        showDeezer: { type: 'number', default:  1 },
        username: { type: 'string', default: '' }
    },
    jobQueue: {
        type: 'array', 
        items: [
            jobSchema
        ],
        default: [] 
    },
    jobSchedule: {
        type: 'array', 
        items: [
            jobSchema
        ],
        default: [] 
    }
};

const store = new Store({schema});

const state = reactive({
    spotifyToken: null,
    spotifyUsername: '',
    showSpotify: true,

    deezerToken: null,
    deezerUsername: '',
    showDeezer: true,

    jobQueue: [],
    jobSchedule: [],
    processing: null
});

const loadData = function() {

    // Queues and Schedule
    state.jobQueue = store.get('jobQueue');
    state.jobSchedule = store.get('jobSchedule');

    // Spotify
    state.showSpotify = store.get('spotifyData.showSpotify') === 1;
    state.spotifyUsername = store.get('spotifyData.username');

    if (store.get('spotifyData.token.access') != null) {
        state.spotifyToken = {
            token: store.get('spotifyData.token.access'),
            refresh: store.get('spotifyData.token.refreshToken'),
            expires: store.get('spotifyData.token.expiresOn')
        };
    }

    // Deezer
    state.showDeezer = store.get('deezerData.showDeezer') === 1;
};

const addToQueue = function(source, id, job, tracks, name) {
    state.jobQueue.push({
        uniqueId: uuidv4(),
        source: source,
        playlistId: id,
        jobType: job,
        totalTracks: tracks,
        name: name,
        progress: 0.00,
        dateAdded: moment(),
        cancelProcessing: false
    });
    // source: { type: 'string', default: '' },
    //     playlistId: { type: 'string', default: '' },
    //     jobType: { type: 'string', default: 'shuffle' },
    //     frequency: { type: 'number', default: 1 },
    //     unit: { type: 'string', default: 'day' },
    //     lastDone: { type: 'string', format: 'date-time', default: '' },
    //     totalTracks: { type: 'number', default: 0 }
}

const processFirstInQueue = function() {
    state.processing = state.jobQueue.shift();
};

const saveSpotifyToken = function(token, refreshToken, expiresOn) {
    store.set('spotifyData.token.access', token);
    store.set('spotifyData.token.refreshToken', refreshToken);
    store.set('spotifyData.token.expiresOn', expiresOn);

    state.spotifyToken = {
        token: token,
        refresh: refreshToken,
        expires: expiresOn
    };
};

const saveSpotifyUsername = function(username) {
    state.spotifyUsername = username;
};

const saveSpotifyRefreshToken = function(token, expiresOn) {
    store.set('spotifyData.token.access', token);
    store.set('spotifyData.token.expiresOn', expiresOn);
    state.spotifyToken.token = token;
    state.spotifyToken.expiresOn = expiresOn;
}

const deleteSpotifyToken = function() {
    store.delete('spotifyData.token.access');
    store.delete('spotifyData.token.refreshToken');
    store.delete('spotifyData.token.expiresOn');
    state.spotifyToken = null;
    state.spotifyUsername = '';
};

const setDeezerInfo = function(token, expiresIn) {
    state.deezerToken = {
        token: token,
        expires: expiresIn
    };
};

const updateSettings = function(showSpotify, showDeezer) {
    state.showSpotify = showSpotify == true;
    state.showDeezer = showDeezer == true;

    store.set('spotifyData.showSpotify', showSpotify == true ? 1 : 0);
    store.set('deezerData.showDeezer', showDeezer == true ? 1 : 0);
};

const updateProcessingTracks = function(totalTracks) {
    if (state.processing != null) {
        state.processing.totalTracks = totalTracks;
    }
}

const updateProcessingProgress = function(progress) {
    if (state.processing != null) {
        state.processing.progress = progress.toFixed(2);
    }
}

const cancelProcessing = function() {
    state.processing.cancelProcessing = true;
};

const clearProcessing = function() {
    state.processing = null;
};

const removeFromQueue = function(uniqueId) {
    state.jobQueue.splice(state.jobQueue.findIndex(item => item.uniqueId === uniqueId), 1);
};



export default { 
    data: readonly(state), 
    saveSpotifyToken,
    saveSpotifyRefreshToken,
    saveSpotifyUsername,
    deleteSpotifyToken,
    setDeezerInfo,
    updateSettings,
    loadData,
    addToQueue,
    processFirstInQueue,
    updateProcessingTracks,
    updateProcessingProgress,
    cancelProcessing,
    clearProcessing,
    removeFromQueue
};
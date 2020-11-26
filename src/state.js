import { reactive, readonly } from 'vue';

const Store = require('electron-store');

const schema = {
    spotify_data: {
        type: 'object',
        token: {
            type: 'object',
            access: { type: 'string' },
            token_type: { type: 'string' },
            scope: { type: 'string' , default: 'playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative' },
            expires_in: { type: 'number', default: 0 },
            refresh_token: { type: 'string' }
        },
        show_spotify: { type: 'number', default:  1 }
    },
    deezer_data: {
        type: 'object',
        token: {
            type: 'object',
            access: { type: 'string' },
            scope: { type: 'string', default: 'basic_access,manage_library' },
            expires_in: { type: 'number', default: 0 },
        },
        show_deezer: { type: 'number', default:  1 }
    }
};

const store = new Store({schema});

const state = reactive({
    spotifyToken: null,
    showSpotify: true,

    deezerToken: null,
    showDeezer: true
});

const setSpotifyInfo = function(token, refreshToken, expiresIn) {
    state.spotifyToken = {
        token: token,
        refresh: refreshToken,
        expires: expiresIn
    };
};

const setDeezerInfo = function(token, expiresIn) {
    state.deezerToken = {
        token: token,
        expires: expiresIn
    };
};

// const getAll = function() {
//     storage.getAll(function(error, data) {
//         if (error) throw error;
      
//         console.log(data);
//     });
// };

const loadSettings = function() {
    state.showSpotify = store.get('spotify_data.show_spotify') === 1;
    state.showDeezer = store.get('deezer_data.show_deezer') === 1;

    console.log(store.get('spotify_data.token.access'));

};

const updateSettings = function(showSpotify, showDeezer) {
    state.showSpotify = showSpotify == true;
    state.showDeezer = showDeezer == true;

    store.set('spotify_data.show_spotify', showSpotify == true ? 1 : 0);
    store.set('deezer_data.show_deezer', showDeezer == true ? 1 : 0);
};

export default { 
    settings: readonly(state), 
    setSpotifyInfo,
    setDeezerInfo,
    updateSettings,
    loadSettings
};
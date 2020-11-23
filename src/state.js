import { reactive, readonly } from 'vue';

//const storage = require('electron-json-storage');

const state = reactive({
    spotifySettings: null,
    showSpotify: true,

    deezerSettings: null,
    showDeezer: true
});

const setSpotifyInfo = function(token, refreshToken, expires) {
    state.spotifySettings = {
        token: token,
        refresh: refreshToken,
        expires: expires
    };
};

// const getAll = function() {
//     storage.getAll(function(error, data) {
//         if (error) throw error;
      
//         console.log(data);
//     });
// };

const loadSettings = function() {
    console.log('Loading settings');

    console.log('Settings loaded');
};

export default { 
    settings: readonly(state), 
    setSpotifyInfo,
    loadSettings
};
import { remote } from 'electron';
import state from '../state';

var SpotifyWebApi = require('spotify-web-api-node');
var moment = require('moment');

let stevenaleongRootUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:16122' : 'https://stevenaleong.com';
let loginWindow;
//let refreshWindow;
let logoutWindow;
let view;

async function createSpotifyLoginWindow(callBack) {
    loginWindow = new remote.BrowserWindow({
        backgroundColor: '#ffffff',
        authoHideMenuBar: true,
        parent: remote.getCurrentWindow(),
        modal: true,
        width: 600,
        height: 800
    });

    view = new remote.BrowserView();
    loginWindow.setBrowserView(view);
    view.setBounds({ x: 0, y: 0, width: 600, height: 800 });
    view.webContents.loadURL(stevenaleongRootUrl + '/apps/spotifyplaylisttools/authorization');

    loginWindow.on('close', async () => {
        view.webContents.executeJavaScript("document.scripts[0].innerHTML").then((res) => {
            if (res != null && res.length > 0) {
                const tokenObj = JSON.parse(res);
                state.saveSpotifyToken(tokenObj.access, tokenObj.refresh, tokenObj.expires);
                callBack(res);
            }            
        });
    });
}

async function refreshSpotifyLogin() {
    //console.log(state.data.spotifyToken);
    await fetch(stevenaleongRootUrl + '/apps/spotifyplaylisttools/refresh?refresh=' + state.data.spotifyToken.refresh)
        .then(response => response.json())
        .then(function (tokenObj) {
            if (tokenObj.refresh != null && tokenObj.refresh.length > 0) {
                state.saveSpotifyToken(tokenObj.access, tokenObj.refresh, tokenObj.expires);
            } else {
                state.saveSpotifyRefreshToken(tokenObj.access, tokenObj.expires);
            }   
        });

    
    // refreshWindow = new remote.BrowserWindow({
    //     parent: remote.getCurrentWindow(),
    //     show: false
    // });

    // view = new remote.BrowserView();
    // refreshWindow.setBrowserView(view);
    // view.webContents.loadURL(stevenaleongRootUrl + '/apps/spotifyplaylisttools/refresh?refresh=' + state.data.spotifyToken.refresh);
    
    // refreshWindow.on('close', async () => {
    //     view.webContents.executeJavaScript("document.scripts[0].innerHTML").then((res) => {
    //         if (res != null && res.length) {
    //             const tokenObj = JSON.parse(res);
                
    //             if (tokenObj.refresh != null && tokenObj.refresh.length > 0) {
    //                 state.saveSpotifyToken(tokenObj.access, tokenObj.refresh, tokenObj.expires);
    //             } else {
    //                 state.saveSpotifyRefreshToken(tokenObj.access, tokenObj.expires);
    //             }                
    //         }            
    //     });
    // });
}

async function logoutSpotify() {
    logoutWindow = new remote.BrowserWindow({
        parent: remote.getCurrentWindow(),
        show: false
    });

    view = new remote.BrowserView();
    logoutWindow.setBrowserView(view);
    view.setBounds({ x: 0, y: 0, width: 600, height: 800 });
    view.webContents.loadURL('https://www.spotify.com/ca-en/logout/');
    
    logoutWindow.close();
    state.deleteSpotifyToken();
}

async function GetSpotifyToken() {
    var expires = state != null && state.data != null && state.data.spotifyToken != null ? moment(state.data.spotifyToken.expires) : moment.min();
    let now = moment().utcOffset(0, true);
    if (expires.diff(now, 'minutes') < 5) {
        // Refresh the token
        await refreshSpotifyLogin();
    }

    return state.data.spotifyToken.token; 
}

async function getUserInformation() {
    var spotifyApi = new SpotifyWebApi();
    var token = await GetSpotifyToken();
    if (token != null) {
        spotifyApi.setAccessToken(token);
        return spotifyApi.getMe();
    }

    return null;    
}

async function getUserPlaylists(limit = 50, page = 1) {
    if (page < 1) page = 1;
    var offset = (page * limit) - limit;

    var spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(await GetSpotifyToken());
    
    return spotifyApi.getUserPlaylists({ limit: limit, offset: offset });
}

async function getPlaylist(playlistId) {
    var spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(await GetSpotifyToken());

    return spotifyApi.getPlaylist(playlistId);
}

async function movePlaylistTrack(playlistId, index, position) {
    var spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(await GetSpotifyToken());

    // Reorder the first two tracks in a playlist to the place before the track at the 10th position
    var options = { };
    return spotifyApi.reorderTracksInPlaylist(playlistId, index, position, options);    
}

export { 
    GetSpotifyToken,
    getUserInformation,
    createSpotifyLoginWindow, 
    refreshSpotifyLogin,
    getUserPlaylists,
    logoutSpotify,
    movePlaylistTrack,
    getPlaylist
};

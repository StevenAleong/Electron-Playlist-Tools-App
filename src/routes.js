import { createWebHistory, createRouter } from 'vue-router';

import Dashboard from './pages/Dashboard.vue';
import About from './pages/About.vue';
import Logs from './pages/Logs.vue';
import Scheduled from './pages/Scheduled.vue';

import SpotifyPlaylistTools from './pages/spotify/PlaylistTools.vue';
import SpotifyFunneler from './pages/spotify/Funneler.vue';
import SpotifyInternetRadio from './pages/spotify/InternetRadio.vue';
import SpotifySettings from './pages/spotify/Settings.vue';
import SpotifySetup from './pages/spotify/Setup.vue';

import DeezerPlaylistTools from './pages/deezer/PlaylistTools.vue';
import DeezerSettings from './pages/deezer/Settings.vue';
import DeezerSetup from './pages/deezer/Setup.vue';

const routes = [
    { path: '/', name: 'Dashboard', component: Dashboard },
    { path: '/about', name: 'About', component: About, meta: { title: 'About' } },
    { path: '/logs', name: 'Logs', component: Logs, meta: { title: 'Logs' } },
    { path: '/scheduled', name: 'Scheduled', component: Scheduled, meta: { title: 'Scheduled' } },

    { path: '/spotify-playlist-tools', name: 'SpotifyPlaylistTools', component: SpotifyPlaylistTools, meta: { title: 'Playlist Tools - Spotify' } },
    { path: '/spotify-funneler', name: 'SpotifyFunneler', component: SpotifyFunneler, meta: { title: 'Funneler - Spotify' } },
    { path: '/spotify-internet-radio', name: 'SpotifyInternetRadio', component: SpotifyInternetRadio, meta: { title: 'Internet Radio - Spotify' } },
    { path: '/spotify-settings', name: 'SpotifySettings', component: SpotifySettings, meta: { title: 'Settings - Spotify' } },
    { path: '/spotify-setup', name: 'SpotifySetup', component: SpotifySetup, meta: { title: 'Setup - Spotify' } },
    
    { path: '/deezer-playlist-tools', name: 'DeezerPlaylistTools', component: DeezerPlaylistTools, meta: { title: 'Playlist Tools - Deezer' } },
    { path: '/deezer-settings', name: 'DeezerSettings', component: DeezerSettings, meta: { title: 'Settings - Deezer' } },
    { path: '/deezer-setup', name: 'DeezerSetup', component: DeezerSetup, meta: { title: 'Setup - Deezer' } }
];

const router = createRouter({
    history: createWebHistory(),
    routes    
});

const DEFAULT_TITLE = 'Playlist Tools by Steven Aleong';

router.afterEach((to) => {
    document.title = to.meta.title || DEFAULT_TITLE;
});

export default router;
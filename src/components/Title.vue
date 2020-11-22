<template>
    <div class="px-4 py-2 bg-yellow-500">
        <h1 class="p-0 m-0">{{currentPageTitle($route)}}</h1>
    </div>
</template>

<script>
export default {
    name: 'Title',
    methods: {
        currentPageTitle: function(routeData) {
            if (routeData.meta.title) {
                return routeData.meta.title;
            }
             
            return routeData.name;            
        }
    }
}
</script>

<style>

</style>

 { path: '/', name: 'Dashboard', component: Dashboard },
    { path: '/about', name: 'About', component: About },
    { path: '/logs', name: 'Logs', component: Logs },
    { path: '/scheduled', name: 'Scheduled', component: Scheduled },

    { path: '/spotify-playlist-tools', name: 'SpotifyPlaylistTools', component: SpotifyPlaylistTools },
    { path: '/spotify-funneler', name: 'SpotifyFunneler', component: SpotifyFunneler },
    { path: '/spotify-internet-radio', name: 'SpotifyInternetRadio', component: SpotifyInternetRadio },
    { path: '/spotify-settings', name: 'SpotifySettings', component: SpotifySettings },
    { path: '/spotify-setup', name: 'SpotifySetup', component: SpotifySetup },
    
    { path: '/deezer-playlist-tools', name: 'DeezerPlaylistTools', component: DeezerPlaylistTools },
    { path: '/deezer-settings', name: 'DeezerSettings', component: DeezerSettings },
    { path: '/deezer-setup', name: 'DeezerSetup', component: DeezerSetup }
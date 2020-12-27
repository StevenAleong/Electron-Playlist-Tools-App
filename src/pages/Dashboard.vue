<template>
    <Block v-if="this.state.data.spotifyToken == null && this.state.data.showSpotify" class="mb-5 bg-green-400 text-white font-bold">
        You are not logged into Spotify.
        <router-link to="/spotify-setup" class="text-green-800 hover:text-green-700">Setup your Spotify account</router-link>
    </Block>

    <Block v-if="this.state.data.deezerToken == null && this.state.data.showDeezer" class="mb-5 bg-red-400 text-white font-bold">
        You are not logged into Deezer.
        <router-link to="/deezer-setup" class="text-red-800 hover:text-red-700">Setup your Deezer account</router-link>
    </Block>

    <div class="rounded overflow-hidden border shadow-md bg-yellow-400 text-white font-bold" v-if="this.state.data.playlistQueue.length == 0 && this.state.data.processing == null">
        <div class="px-5 py-4">
            Nothing is in the queue or is processing.
        </div>
    </div>
    
    <ColourBlock v-if="this.state.data.processing != null" class="mb-4">
        <LoadingIcon />
        [{{displaySourceType}}] {{displayJobType}} {{state.data.processing.name}} with {{state.data.processing.totalTracks}} tracks
    </ColourBlock>

    <div v-if="this.state.data.playlistQueue.length">
        <h2 class="mb-3">Job Queue</h2>

        <table  class="table-auto border-collapse border w-full">
            <thead>
                <tr>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500">Playlist Name</th>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500">Source</th>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500">Job</th>
                    <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 text-right"># Tracks</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="pl in this.state.data.playlistQueue" :key="pl">
                    <td class="px-6 py-2 whitespace-no-wrap border-b border-gray-500">{{pl.name}}</td>
                    <td class="px-6 py-2 whitespace-no-wrap border-b border-gray-500">{{pl.source}}</td>
                    <td class="px-6 py-2 whitespace-no-wrap border-b border-gray-500">{{pl.jobType}}</td>
                    <td class="px-6 py-2 whitespace-no-wrap border-b border-gray-500 text-right">{{pl.totalTracks}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { sources, jobTypes } from '../enums';

export default {
    name: 'Dashboard',
    inject: ['state'],
    computed: {
        displayJobType() {
            if (this.state.data.processing != null) {
                switch (this.state.data.processing.jobType) {
                    case jobTypes.SHUFFLE: 
                        return 'Shuffling';

                    case jobTypes.REVERSE:
                        return 'Reversing';
                }                
            }

            return '';
        },
        displaySourceType() {
            if (this.state.data.processing != null) {
                switch (this.state.data.processing.source) {
                    case sources.SPOTIFY:
                        return 'Spotify';

                    case sources.DEEZER:
                        return 'Deezer';
                }
            }

            return '';
        }
    }
}
</script>

<style>

</style>
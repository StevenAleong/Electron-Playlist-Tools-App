<template>
  <Block v-if="!this.isLoading && this.playlists.length == 0" class="mb-5 bg-green-400 text-white font-bold">
      No playlists found for {{username}}
  </Block>

  <ColourBlock v-if="this.isLoading">
      <LoadingIcon /> Loading Playlists...
  </ColourBlock>

  <ColourBlock v-if="!this.isLoading && this.playlists.length > 0" class="mb-5">
      Playlists for {{username}}
  </ColourBlock>

  <table class="table-auto border-collapse border w-full">
    <tbody>
      <tr v-for="pl in playlists" :key="pl">
        
        <td class="border-b p-2 align-top" style="width: 95px;">
          <a :href="pl.external_urls.spotify" target="_blank">
            <img :src="pl.images[0].url" class="w-full" />
          </a>
        </td>

        <td class="border-b p-2 align-top">
          <div class="font-bold text-2xl">
            <a :href="pl.external_urls.spotify" target="_blank" class="no-underline text-green-500 hover:text-green-800">{{pl.name}}</a>
          </div>
          <div class="text-xs mb-1">
            <i>Tracks: {{pl.tracks.total}}</i>
          </div>
          <div>
            <button v-on:click="shufflePlaylist(pl)" class="px-1 mr-3 text-sm text-blue-500 border rounded-sm hover:bg-green-500 hover:text-white">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="h-3 w-3 fill-current inline-block" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z"/>
                  <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z"/>
              </svg>
              Shuffle
            </button>

            <button v-on:click="reversePlaylist(pl)" class="px-1 mr-3 text-sm text-yellow-800 border rounded-sm hover:bg-yellow-800 hover:text-white">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="h-3 w-3 fill-current inline-block" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/>
                <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>
              </svg>
              Reverse
            </button>

            <button v-on:click="toggleSchedule(pl)" class="px-1 mr-3 text-sm text-pink-700 border rounded-sm hover:bg-pink-800 hover:text-white">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="h-3 w-3 fill-current inline-block" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z"/>
                  <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4zM11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
              </svg>
              Schedule
            </button>
            
            <div v-if="pl.showSchedule === true" class="my-3 p-3 border rounded">
              <h5>Schedule Settings</h5>

              <div>
                <button class="bg-red-400 text-white border-red-700 px-1 mr-1 rounded">
                  Inactive
                </button>

                Shuffle this playlist every

                <select class="px-1 mx-2 border rounded">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                </select>

                <select class="px-1 border rounded">
                  <option>Day(s)</option>
                  <option>Week(s)</option>
                  <option>Month(s)</option>
                </select>
              </div>
              
            </div>

          </div>
        </td>
      </tr>
    </tbody>
  </table>

</template>

<script>
import { getUserInformation, getUserPlaylists } from '../../services/spotifyServices';
import { sources, jobTypes } from '../../enums';

export default {
  name: 'SpotifyPlaylistTools',
  inject: ['state'],
  props: {    
  },
  data() {
    return {
      isLoading: true,
      username: '',
      playlists: [],
      totalPlaylists: 0
    }
  },
  beforeMount() {
    this.loadUserInformation();
    // var _this = this;
    // _this.username = this.state.data.spotifyUsername;


  },
  methods: {
    loadUserInformation() {
      var _this = this;
      var userInfo = getUserInformation();
      userInfo.then(function(data) {
        _this.username = data.body.display_name;
        _this.loadPlaylists();
      });
    },
    shufflePlaylist: function(pl) {
      this.state.addToQueue(sources.SPOTIFY, pl.id, jobTypes.SHUFFLE, pl.tracks.total, pl.name);      
    },
    reversePlaylist: function(pl) {
      this.state.addToQueue(sources.SPOTIFY, pl.id, jobTypes.REVERSE, pl.tracks.total, pl.name); 
    },
    toggleSchedule: function(pl) {
      var plIndex = this.playlists.findIndex(item => item.id === pl.id);
      this.playlists[plIndex].showSchedule = !this.playlists[plIndex].showSchedule;
    },
    async loadPlaylists() {
      var keepLooping = false;
      var i = 1;
      var _this = this;

      do {
        var playlists = getUserPlaylists(50, i);
        playlists.then(function(data) {
          _this.totalPlaylists = data.body.total;

          data.body.items.forEach(function(pl) {
            // console.log('playlist owner', pl.owner.id);
            // console.log('spotifyUsername', _this.state.data.spotifyUsername);
              if (pl.owner.id === _this.username) {
                _this.playlists.push(pl);
              }
          });
          
          //console.log(_this.playlists);

          keepLooping = data.body.next != null;

          if (!keepLooping) {
            _this.isLoading = false;
          }
        });
        
        i++;

      } while(keepLooping);

    }

  }
}
</script>

<style>
    
</style>
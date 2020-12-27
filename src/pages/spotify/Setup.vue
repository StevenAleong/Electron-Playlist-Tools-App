<template>
  <Block v-if="this.state.data.spotifyToken == null" class="mb-5">
    To get this tool working, you'll need to first log in and authorize this app. Once authenticated, the menu
    will change to show you the rest of the options.
  </Block>

  <Block v-if="this.state.data.spotifyToken != null" class="mb-5">
    <ColourBlock class="mb-5">
      You are logged into Spotify, lets Party!
    </ColourBlock>
    
    <button v-if="this.state.data.spotifyToken != null" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-5" @click="logoutSpotify">
      Log Out
    </button>
    
    <button v-if="this.state.data.spotifyToken != null" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" @click="refreshSpotify">
      Refresh Token
    </button>
  </Block>

  <Block v-if="this.state.data.spotifyToken == null" class="mb-5">
    <h2>Login and Authorize this app</h2>
    <div class="mt-5">

      <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-5" @click="loginSpotify">
        Log Into Spotify
      </button>

    </div>
  </Block>
  
</template>

<script>
import { createSpotifyLoginWindow, logoutSpotify, refreshSpotifyLogin } from '../../services/spotifyServices';

export default {
  name: 'SpotifySetup',
  inject: ['state'],
  methods: {
    loginSpotify() {
      createSpotifyLoginWindow(() => { });
    },

    refreshSpotify() {
      refreshSpotifyLogin();
    },

    logoutSpotify() {
      logoutSpotify();
    }
  }
};
</script>

<style></style>

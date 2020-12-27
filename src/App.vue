<template>
  <Header />
  <Menu />
  <div id="main" class="h-full">
    <div id="content-wrapper" class="text-left" style="padding-top: 60px;">
      <Title DisplayText="About Playlist Tools" />
      <div class="p-4">
        <router-view></router-view>    
      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Menu from './components/Menu.vue';
import Title from './components/Title.vue';

import state from './state';
import jobServices from './services/jobServices';
//import { getUserInformation } from './services/spotifyServices';

export default {
  name: 'App',
  provide: {
    state: state
  },
  components: {
    Header,
    Menu,
    Title
  },
  mounted() {
    // There's probably a better way of doing this but i'm dumb.
    state.loadData();
    //this.loadUserInfo();
    jobServices.setupJobTimer();
  },
  methods: {
    // async loadUserInfo() {
    //   var userInfo = getUserInformation();
    //   userInfo.then(function(data) {
    //     if (data != null) {
    //       state.saveSpotifyUsername(data.body.displayName);
    //     }        
    //   });
    // }
  }
}
</script>

<style>
#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5 {
  font-weight: 700;
  text-transform: uppercase;
}

.group:hover .group-hover\:block {
  display: block;
}

#content-wrapper {
  padding-left: 250px;
}

p {
  padding-bottom: 15px;
}

a {
  color: rgba(59, 130, 246, var(--tw-text-opacity));
  text-decoration: underline;
}
  a:hover {
    color: rgba(99, 102, 241, var(--tw-text-opacity));
  }

.colour-background {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
	background-size: 400% 400%;
	animation: gradient 20s ease;
  animation-iteration-count: infinite;
}

.spin {
  animation-name: spin;
  animation-duration: 5000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear; 
}

.dropdown:hover .dropdown-menu {
  display: block;
  z-index: 5;
}

@keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}

@keyframes spin {
    from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg);
    }
}

</style>

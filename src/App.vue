<template>
  <Header />
  <Menu />
  <div id="main" class="h-full">
    <div id="content-wrapper" class="pt-14 text-left">
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
    state.loadSettings();
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

</style>

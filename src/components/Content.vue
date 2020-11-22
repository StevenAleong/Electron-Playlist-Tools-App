<template>
    <div id="content-wrapper" class="pt-14 text-left">
        <div class="p-4">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>

//const About = from './pages/About.vue';

export default {
  name: 'Content',
  props: {
    
  }
}
</script>

<style>

</style>
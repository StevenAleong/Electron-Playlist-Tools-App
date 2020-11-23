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

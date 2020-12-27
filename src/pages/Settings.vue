<template>
    <Block>
        <h2>Sections</h2>
        <div>
            <label class="inline-flex items-center mt-3">
                <input type="checkbox" class="form-checkbox h-5 w-5 text-gray-600" v-model="showSpotify" @change="toggleSettings"><span class="ml-2 text-gray-700">Show Spotify</span>
            </label>
        </div>
        <div>
            <label class="inline-flex items-center mt-3">
                <input type="checkbox" class="form-checkbox h-5 w-5 text-gray-600" v-model="showDeezer" @change="toggleSettings"><span class="ml-2 text-gray-700">Show Deezer</span>
            </label>
        </div>
    </Block>
</template>

<script>

export default {
    name: 'Settings',
    inject: ['state'],
    data() {
        return {
            showSpotify: true,
            showDeezer: true
        }
    },
    mounted() {
        this.showSpotify = this.state.data.showSpotify;
        this.showDeezer = this.state.data.showDeezer;
    },
    props: {

    },
    methods: {
        toggleSettings() {
            this.state.updateSettings(this.showSpotify == true, this.showDeezer == true);
        }
    }
}
</script>

<style>

</style>
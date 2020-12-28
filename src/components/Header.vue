<template>
    <header class="fixed z-50 w-full bg-gray-900 shadow">
        <div class="h-14 flex items-center justify-between">

            <div class="flex items-center h-full px-4">
                <span class="w-full text-white uppercase text-2xl">
                    <img src="../assets/icons/icon.png" class="inline-flex max-h-max h-7 mr-3 align-middle" />
                    <span class="font-extrabold">Playlist Tools App</span> <span class="text-sm">by Steven Aleong</span>
                </span>
            </div>
            <div class="flex items-center text-right h-full px-4">
                <div class="w-full text-white">
                    <div>
                        <b>Queue</b>: {{state.data.playlistQueue.length}}
                    </div>
                    <div>
                        <b>Processing</b>: 
                        <span v-if="state.data.processing != null" class="inline-flex"><span class="text-green-300 track-name mr-1">{{state.data.processing.name}}</span> <span class="text-white-500">({{state.data.processing.totalTracks}} tracks)</span></span>
                        <span v-if="state.data.processing == null">Nothing</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="processing-bar-wrapper">
            <div class="processing-bar processing-background" :style="progressStyle"></div>
        </div>
    </header>
</template>

<style>
    .track-name {
        max-width: 250px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .processing-bar-wrapper {
        height: 5px;
    }
    .processing-bar {
        height: 5px;     
    }
    .processing-background {
        background: linear-gradient(-45deg, #24e33b, #2249e3, #c96e12, #d60b0b);
        background-size: 400% 400%;
        animation: gradient 20s ease;
        animation-iteration-count: infinite;
    }
</style>

<script>
export default {
    name: 'Header',
    inject: ['state'],
    computed: {
      progressStyle () {
        return 'width: ' + (this.state.data.processing != null ? this.state.data.processing.progress : 0) + '%';
      }
    }
}
</script>

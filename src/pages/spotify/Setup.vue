<template>
  <Block class="mb-5">
    Unfortunately, with the way for this to work and so I don't have to host anything on my end, we'll have a few things that you'll need to do to get this tool working.
  </Block>

  <Block class="mb-5">
    <h2>Step 1: Set up a Spotify developers account</h2>
    <ul class="list-disc ml-5">
      <li>Go to <a href="https://developer.spotify.com/dashboard/" target="_blank">https://developer.spotify.com/dashboard/</a></li>
      <li>Log in using your Spotify account</li>
      <li>Click on <b>Create an App</b></li>
      <li>Enter in the App name: <b>Playlist Tools</b> or whatever you want to remind you what the app is</li>
      <li>Enter a short description: <b>Electron App</b></li>
      <li>Check the boxes</li>
      <li>Click <b>Create</b></li>
    </ul>
  </Block>

  <Block>
    <h2>Step 2: Copy Client ID and Client secret into this app</h2>
    <ul class="list-disc ml-5 mb-4">
      <li>Once the app is created, you'll be taken to the app dashboard</li>
      <li>Copy the Client ID and Client Secret into the boxes below</li>
    </ul>

    <div class="flex flex-wrap -mx-3 mb-4">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="clientid">
          Client ID
        </label>
        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="clientid" type="text" placeholder="Client ID" />
        <p class="text-red-500 text-xs italic">Client ID is required</p>
      </div>
      <div class="w-full md:w-1/2 px-3">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="clientsecret">
          Client Secret
        </label>
        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="clientsecret" type="text" placeholder="Client Secret" />
        <p class="text-red-500 text-xs italic">Client secret is required</p>
      </div>
    </div>

    <div>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="saveClientKeys">
        Save
      </button>
    </div>
  </Block>
</template>

<script>
export default {
  name: 'SpotifySetup',
  props: {},
  methods: {
    saveClientKeys() {

    }
  }
};
</script>

<style></style>

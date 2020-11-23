<template>
    <TextBlock class="mb-5">
        A quick overview of everything
    </TextBlock>    

    <TextBlock>
      
        <button @click="storeValue" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Store Value
        </button>

        <button @click="readValue" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
          Read Value
        </button>

        <button @click="deleteValue" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Delete Value
        </button>
    </TextBlock>
</template>

<script>
//const Store = require('electron-store');
//const store = new Store();

export default {
  name: 'Dashboard',
  inject: ['state'],
  props: {
    
  },
  methods: {
    storeValue() {
      //store.set('CurrentDate', new Date());
    },
    readValue() {
      //this.state.getAll();
      //console.log(store.get('CurrentDate'));
    },
    deleteValue() {
    
    }
  },
  mounted() {
    //console.log('hello');
  }
}
</script>

<style>

</style>
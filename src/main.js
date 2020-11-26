import { createApp } from 'vue';
import App from './App.vue';
import router from './routes';

import Block from './components/Block.vue';

const app = createApp(App);
app.component('Block', Block);
app.use(router);
app.mount('#app');

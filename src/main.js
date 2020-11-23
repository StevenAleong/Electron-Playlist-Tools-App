import { createApp } from 'vue';
import App from './App.vue';
import router from './routes';

import TextBlock from './components/TextBlock.vue';

const app = createApp(App);
app.component('TextBlock', TextBlock);
app.use(router);
app.mount('#app');

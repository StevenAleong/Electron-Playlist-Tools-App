import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/routes';

import Block from '@/components/Block.vue';
import ColourBlock from '@/components/ColourBlock.vue';

import LoadingIcon from '@/components/icons/LoadingIcon.vue';
import CancelIcon from '@/components/icons/CancelIcon.vue';

const app = createApp(App);

// Global Components
app.component('Block', Block);
app.component('ColourBlock', ColourBlock);

// Icons
app.component('LoadingIcon', LoadingIcon);
app.component('CancelIcon', CancelIcon);

// Lets Go
app.use(router);
app.mount('#app');

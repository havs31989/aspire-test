import { createApp } from 'vue';
import './styles/style.scss';
import App from './App.vue'
import { router } from './appRouter';

const app = createApp(App)
app.use(router);
app.mount('#app');
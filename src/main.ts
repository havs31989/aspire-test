import "reflect-metadata";
import { createApp } from 'vue';
import './styles/style.css';
import App from './App.vue'
import { router } from './appRouter';
import { container } from 'tsyringe';
import { LanguageService } from './common/services/languageService';
import { LanguageCode } from 'one-frontend-framework';

const languageService = container.resolve(LanguageService);
await languageService.initLanguage(LanguageCode.EN);

const app = createApp(App);
app.use(router);
app.mount('#app');
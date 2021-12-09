import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { Quasar } from 'quasar';
import quasarUserOptions from './quasar-user-options';

const app = createApp(App);

app.config.globalProperties.ApiUrl = 'https://rent-app-api.online/Home';

app.config.globalProperties.UploadUrl = 'https://rent-app-api.online/public/uploads/';

app.use(router);

app.use(Quasar, quasarUserOptions);

app.mount('#app');
 



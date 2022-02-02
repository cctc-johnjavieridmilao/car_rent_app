
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { Quasar } from 'quasar';
import quasarUserOptions from './quasar-user-options';

//import Viewer from "v-viewer";

const app = createApp(App);

//https://rent-app-api.online/Home
//https://rent-app-api.online/public/uploads/

//http://localhost:8080/CAR_RENT/api/Home
//http://localhost:8080/CAR_RENT/api/public/uploads/

app.config.globalProperties.ApiUrl = 'http://arkila-api.online/Home';

app.config.globalProperties.UploadUrl = 'http://arkila-api.online/public/uploads/';

// app.use(Viewer, {
//     defaultOptions: {
//       zIndex: 9999,
//     },
//   });

app.use(router);

app.use(Quasar, quasarUserOptions);

app.mount('#app');
 



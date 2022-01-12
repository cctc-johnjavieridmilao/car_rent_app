
import 'quasar/dist/quasar.css'
import '@quasar/extras/material-icons/material-icons.css'
//import 'viewerjs/dist/viewer.css'
import {Notify, LocalStorage, SessionStorage} from 'quasar'

// To be used on app.use(Quasar, { ... })
export default {
  config: {},
  plugins: {
    Notify,
    LocalStorage,
    SessionStorage
  }
}
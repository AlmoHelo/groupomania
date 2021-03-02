import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//import moment from 'moment'
//createApp(App).prototype.moment = moment

createApp(App).use(router).mount('#app')

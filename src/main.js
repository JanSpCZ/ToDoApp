import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuex from "./store"


import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

//Import used icons here
import { faGear, faHouse, faSitemap, faRocket, faUsers } from "@fortawesome/free-solid-svg-icons"
library.add(faGear, faHouse, faSitemap, faRocket, faUsers)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.use(vuex)

app.mount('#app')

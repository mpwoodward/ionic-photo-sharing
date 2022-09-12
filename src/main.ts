import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

import { IonicVue } from '@ionic/vue'

import { defineCustomElements } from '@ionic/pwa-elements/loader';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'
import '@ionic/vue/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css'
import '@ionic/vue/css/float-elements.css'
import '@ionic/vue/css/text-alignment.css'
import '@ionic/vue/css/text-transformation.css'
import '@ionic/vue/css/flex-utils.css'
import '@ionic/vue/css/display.css'

/* Theme variables */
import './theme/variables.css'

import { firebaseConfig } from '@/firebaseConfig'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

export const auth = getAuth()
export const db = getFirestore(firebaseApp)
export const storage = getStorage(firebaseApp)

let app: any

auth.onAuthStateChanged(async user => {
  if (!app) {
    app = createApp(App)
    .use(IonicVue)
    .use(router)
  
    //const analytics = getAnalytics(fbApp);
    
    router.isReady().then(() => {
      app.mount('#app')
    })

    defineCustomElements(window)
  }
})


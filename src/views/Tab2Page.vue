<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Images</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content v-if="loading">
      <div class="center">
        <ion-spinner color="primary"></ion-spinner>
      </div>
    </ion-content>
    <ion-content :fullscreen="true" v-else>
      <div v-if="photos.length > 0">
        <ion-card v-for="(photo, index) in photos" :key="index">
          <ion-img :src="photo" />
        </ion-card>
      </div>
      <div class="center" v-else>
        <ion-label>There are no photos to display</ion-label>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { db, auth } from '@/main'
import { collection, getDocs } from 'firebase/firestore'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSpinner,
  IonLabel,
  IonCard,
  IonImg,
} from '@ionic/vue'

export default defineComponent({
  name: 'Tab2Page',
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonSpinner,
    IonLabel,
    IonCard,
    IonImg,
  },
  setup() {
    const state = reactive({
      photos: [] as string[],
      loading: false
    })

    const fetchPhotos = async() => {
      if (auth.currentUser) {
        state.loading = true
        
        const imagesCollection = collection(db, 'users', auth.currentUser.uid, 'images')
        const imagesSnap = await getDocs(imagesCollection)

        if (!imagesSnap.empty) {
          imagesSnap.docs.forEach(doc => {
            const data = doc.data()
            if (data.image) {
              state.photos.push(data.image)
            }
          })
        }
      }

      state.loading = false
    }

    fetchPhotos()

    return {
      ...toRefs(state)
    }
  }

})
</script>

<style scoped>
.center {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
}
</style>
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Camera</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="center">
        <ion-button size="large" fill="solid" @click="takePicture">
          <ion-icon :icon="camera"></ion-icon> &nbsp; Camera
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
} from '@ionic/vue'
import { camera } from 'ionicons/icons'
import { auth, db, storage } from '@/main'
import { ref as firebaseStorageRef, uploadString, getDownloadURL } from 'firebase/storage'
import { collection, addDoc } from '@firebase/firestore'
import { Camera, CameraResultType } from '@capacitor/camera'
import { Geolocation } from '@capacitor/geolocation'

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  })
}

export default  defineComponent({
  name: 'Tab1Page',
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonButton,
    IonIcon,
  },
  setup() {
    console.log(auth.currentUser)
    const takePicture = async () => {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64
      })

      const user = auth.currentUser

      if (image?.base64String && user) {
        const uid = user?.uid
        const guid = uuidv4()
        const filePath = `${uid}/images/${guid}.${image.format}`

        const imageRef = firebaseStorageRef(storage, filePath)

        await uploadString(imageRef, image.base64String, 'base64')

        const url = await getDownloadURL(firebaseStorageRef(storage, filePath))
        const loc = await Geolocation.getCurrentPosition()

        const imageDoc = {
          image: url,
          location: { lat: loc.coords.latitude, lon: loc.coords.longitude }
        }

        await addDoc(collection(db, 'users', uid, 'images'), imageDoc)
      }
    }

    return {
      camera,
      takePicture
    }
  },
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

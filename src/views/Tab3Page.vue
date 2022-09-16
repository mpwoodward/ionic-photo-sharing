<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Map</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div id="map"></div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { db, auth } from '@/main'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue'
import { Loader } from '@googlemaps/js-api-loader'
import { collection, getDocs } from 'firebase/firestore'
import { googleMapsConfig } from '@/googleMapsConfig'

declare var google: any

export default defineComponent({
  name: 'Tab3Page',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, },
  setup () {
    const loader = new Loader({
      apiKey: googleMapsConfig.apiKey,
      version: 'weekly',
    })

    const addMap = async () => {
      await loader.load()
      let map = await new google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: {
          lat: googleMapsConfig.lat,
          lng: googleMapsConfig.lng,
        },
        zoom: 3,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      })

      if (auth.currentUser) {
        const imagesCollection = collection(db, 'users', auth.currentUser.uid, 'images')
        const imagesSnap = await getDocs(imagesCollection)

        if (!imagesSnap.empty) {
          imagesSnap.docs.forEach(doc => {
            const data = doc.data();
            const imageLatLng = new google.maps.LatLng(
              data.location.lat,
              data.location.lon
            )

            const marker = new google.maps.Marker({
              position: imageLatLng
            })

            marker.setMap(map)
          })
        }
      }
    }

    onMounted(() => {
      addMap()
    })
  }
})
</script>

<style scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
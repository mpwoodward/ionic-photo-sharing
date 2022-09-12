<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Sign In/Up</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-card>
        <ion-card-header>
          <ion-card-title>
            Welcome to Photo Share
          </ion-card-title>
          <ion-card-subtitle>
            Sign In/Up
          </ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <form
            @submit.prevent="mode === AuthMode.SignIn ? signIn(email, password) : signUp(name, email, password)"
          >
            <ion-item v-if="mode === AuthMode.SignUp">
              <ion-label position="floating">Name</ion-label>
              <ion-input v-model="name"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Email</ion-label>
              <ion-input v-model="email"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Password</ion-label>
              <ion-input v-model="password" type="password"></ion-input>
            </ion-item>
            <ion-button
              expand="block"
              color="primary"
              class="ion-margin-top"
              type="submit"
            >
              {{ mode === AuthMode.SignIn ? "Sign In" : "Sign Up" }}
            </ion-button>
            <ion-button
              expand="block"
              color="secondary"
              class="ion-margin-top"
              @click="mode = mode === AuthMode.SignIn ? AuthMode.SignUp : AuthMode.SignIn"
            >
              {{ mode === AuthMode.SignIn ? "Sign Up" : "Cancel" }}
            </ion-button>
          </form>
        </ion-card-content>
        <ion-card-content v-if="errorMsg" class="error-message">
          {{ errorMsg }}
        </ion-card-content>
      </ion-card>
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
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonInput,
  IonButton,
  IonLabel,
  IonItem,
} from '@ionic/vue'
import { auth, db } from '@/main'
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth'
import { doc, setDoc } from '@firebase/firestore'

enum AuthMode {
  SignIn,
  SignUp
}

export default defineComponent({
  name: 'AuthenticationPage',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonInput,
    IonButton,
    IonLabel,
    IonItem,
  },
  setup() {
    const router = useRouter()
    const state = reactive({
      name: '',
      email: '',
      password: '',
      mode: AuthMode.SignIn,
      errorMsg: '',
    })

    const signIn = async (email: string, password: string) => {
      try {
        if (!email || ! password) {
          state.errorMsg = 'Email and password required!'
          return
        }

        await signInWithEmailAndPassword(auth, email, password)
        router.push('/tabs/tab1')
      } catch (error: any) {
        state.errorMsg = error.message
      }
    }

    const signUp = async (name: string, email: string, password: string) => {
      try {
        if (!name || !email || !password) {
          state.errorMsg = 'Name, email, and password required!'
          return
        }

        const authRes = await createUserWithEmailAndPassword(auth, email, password)
        await setDoc(doc(db, 'users', authRes.user?.uid), {
          name,
          email,
        })

        router.push('/tabs/tab1')
      } catch (error: any) {
        state.errorMsg = error.message
      }
    }

    return {
      ...toRefs(state),
      signIn,
      signUp,
      AuthMode,
    }
  }
})
</script>

<style scoped>
.center {
  display: flex;
  height: 90vh;
  width: 100%;
  align-items: center;
  justify-content: center;
}
.error-message {
  color: #842029;
  background-color: #f8d7da;
  border-color: #f5c2c7;
  text-align: center;
}
</style>
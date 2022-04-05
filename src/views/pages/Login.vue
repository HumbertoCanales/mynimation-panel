<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
      <v-card class="auth-card">
        <!-- logo -->
        <v-card-title class="d-flex align-center justify-center py-7">
          <router-link
            to="/"
            class="d-flex align-center"
          >
            <h2 class="app-title text--primary">
              MYNIMATION
            </h2>
          </router-link>
        </v-card-title>

        <!-- title -->
        <v-card-text>
          <p class="text-2xl font-weight-semibold text--primary mb-2">
            Panel administrativo
          </p>
          <p class="mb-2">
            Inicia sesión con tu cuenta de administrador
          </p>
        </v-card-text>

        <!-- login form -->
        <v-card-text>
          <v-form @submit.prevent="login">
            <v-text-field
              v-model="email"
              outlined
              label="Correo electrónico"
              placeholder="usuario@ejemplo.com"
              hide-details
              class="mb-3"
            ></v-text-field>

            <v-text-field
              v-model="password"
              outlined
              :type="isPasswordVisible ? 'text' : 'password'"
              label="Contraseña"
              placeholder="············"
              :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
              hide-details
              @click:append="isPasswordVisible = !isPasswordVisible"
            ></v-text-field>

            <v-btn
              block
              color="primary"
              class="mt-6"
              type="submit"
            >
              INICIAR SESIÓN
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  setup() {
    return {
      isPasswordVisible: false,
      email: '',
      password: '',

      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
      },
    }
  },
  methods: {
    login() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          this.$router.replace('dashboard')
        })
        .catch((error) => {
          alert("Verifica tus credenciales")
        });
    },
  },
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>

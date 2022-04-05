<template>
  <v-list-item-icon class="me-2">
    <v-icon size="22" @click="logout">
      {{ icons.mdiLogoutVariant }}
    </v-icon>
  </v-list-item-icon>
</template>

<script>
import { mdiLogoutVariant, } from '@mdi/js'
import firebase from "firebase/compat/app"

export default {
  setup() {
    return {
      icons: {
        mdiLogoutVariant
      },
    }
  },
  methods: {
    logout() {
      firebase.auth().signOut().then(() => this.$router.replace('login'))
    }
  }
}
</script>

<style>
</style>

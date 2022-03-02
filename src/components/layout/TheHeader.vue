<template>
  <v-app-bar
    app
    color="red"
    class="justify-center"
  >
      
    <v-img
      src="@/assets/f1logo.png"
      max-width="70"
      @click="reset()"
      >
    </v-img>

    <v-spacer></v-spacer>

    <v-btn icon @click="reset()">
      <v-icon>
        mdi-help-box
      </v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapActions } from "vuex"

export default {
  name: 'TheHeader',

  methods: {
    ...mapActions(['newYear']),

    reset() {
      this.newYear({year: ''})

      this.$router.push("/");
    }
  }
}
</script>

<style>

</style>
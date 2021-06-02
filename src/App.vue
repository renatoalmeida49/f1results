<template>
  <v-app>
    <v-app-bar
      app
      color="red"
      class="justify-center"
    >
      
      <v-img
        src="@/assets/f1logo.png"
        max-width="70"
      >
      </v-img>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>
          mdi-help-box
        </v-icon>
      </v-btn>
    </v-app-bar>

    <v-main
      style="background-color: #242433"
      class="mt-4"
    >
      <v-container>
        <v-row justify="center">
           <v-col style="max-width: 200px">
            <AllSeasons />
          </v-col>
        </v-row>
      </v-container>

      <router-view></router-view>

      <TheFooter />
    </v-main>
  </v-app>
</template>

<script>
import AllSeasons from './components/AllSeasons'
import TheFooter from './components/TheFooter'

export default {
  name: 'App',

  components: {
    AllSeasons,
    TheFooter
  },
};
</script>

<style>
@font-face {
  font-family: "Formula1";
  src: local("Formula1"),
    url('./fonts/Formula1/Formula1-Regular_web_0.ttf') format("truetype");
  /* 1. node_modules/vuetify/src/styles/settings/_variables.scss 
     2. change '$body-font-family: 'Formula1', sans-serif !default;' to apply */
}

</style>

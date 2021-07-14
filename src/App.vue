<template>
  <v-app>
    <TheHeader />

    <v-main
      style="background-color: #242433"
      class="mt-4"
    >
      <v-container>
        <v-row justify="center">
          <AllSeasons />
        </v-row>
      </v-container>

      <router-view></router-view>
      
    </v-main>
    <TheFooter />
  </v-app>
</template>

<script>
import TheHeader from './components/layout/TheHeader'
import AllSeasons from './components/layout/AllSeasons'
import TheFooter from './components/layout/TheFooter'

export default {
  name: 'App',

  components: {
    TheHeader,
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

img,
.v-image {
  cursor: pointer;
}

.v-main {
  min-height: calc(100vh - 64px - 68px - 108px);
}
</style>

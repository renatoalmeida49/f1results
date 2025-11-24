<template>
  <v-app class="font">
    <TheHeader />

    <v-main
      style="background-color: #242433"
      class="mt-4"
    >
      <v-row justify="center">
        <AllSeasons />
      </v-row>
      <!--teste de commit e push-->
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

<style lang="scss">
@font-face {
  font-family: "Formula1";
  src: url('./assets/fonts/Formula1/Formula1-Regular_web_0.ttf');
}

* {
  font-family: "Formula1" !important;
}

img,
.v-image {
  cursor: pointer;
}

.v-main {
  min-height: calc(100vh - 64px - 68px - 108px);
}
</style>

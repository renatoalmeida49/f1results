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

      <v-btn icon @click="forceRender">
        <v-icon>
          mdi-help-box
        </v-icon>
      </v-btn>
    </v-app-bar>

    <v-main
        style="background-color: #242433"
        class="mt-4"
        :key="componentKey"
    >
      <v-container>
        <v-row justify="center">
           <v-col style="max-width: 200px">
            <AllSeasons @year-selected="yearSelected"/>
          </v-col>
        </v-row>
      </v-container>

      <v-divider class="my-5"></v-divider>

      <v-container v-if="selectedYear == ''">
        <HowToUse />
      </v-container>

      <v-container v-else>
        <v-row justify="center">
          <v-col>
            <RoundsOfTheSeason :year="selectedYear" @round-selected="roundSelected"/>
          </v-col>
        </v-row>

        <v-row justify="space-between">
          <v-col xl="4" lg="6" md="6" sm="12" cols="12">
            <QualifyingResult :year="selectedYear" :round="selectedRound" />
          </v-col>
          <v-col xl="4" lg="6" md="6" sm="12" cols="12">
            <RaceResult :year="selectedYear" :round="selectedRound" />
          </v-col>
          <v-col xl="4" lg="12" md="12" sm="12" cols="12">
            <ChampionshipAfterRace :year="selectedYear" :round="selectedRound" />
          </v-col>
        </v-row>

      </v-container>

      <TheFooter />
    </v-main>
  </v-app>
</template>

<script>
import AllSeasons from './components/AllSeasons'
import ChampionshipAfterRace from './components/ChampionshipAfterRace'
import QualifyingResult from './components/QualifyingResult'
import RaceResult from './components/RaceResult'
import RoundsOfTheSeason from './components/RoundsOfTheSeason'
import HowToUse from './components/HowToUse'
import TheFooter from './components/TheFooter'

export default {
  name: 'App',

  components: {
    AllSeasons,
    ChampionshipAfterRace,
    QualifyingResult,
    RaceResult,
    RoundsOfTheSeason,
    HowToUse,
    TheFooter
  },

  data: () => ({
    selectedYear: "",
    selectedRound: 1,

    componentKey: 0,
  }),
  methods: {
    yearSelected(year) {
      this.selectedYear = year
      this.roundSelected(1)
    },
    roundSelected(round) {
      this.selectedRound = round
    },
    reset() {
      this.selectedYear = ""
      this.selectedRound = 1
      this.loading = false
      this.raceName = ""
    },
    forceRender() {
      this.reset()
      this.componentKey += 1
    },
  }
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

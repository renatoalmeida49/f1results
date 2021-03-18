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

      <v-btn icon @click="reset">
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
            <AllSeasons @year-selected="racesAndDriversOfTheSeason"/>
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
            <RoundsOfTheSeason :races="races" @raceSelected="getRaceSelected"/>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col cols="auto">
            <div class="d-flex display-1">{{raceSelected.season}} - {{raceSelected.raceName}}</div>
          </v-col>
        </v-row>

        <v-row justify="space-between" v-if="qualifying.length != 0 && raceResult.length != 0">
          <v-col xl="4" lg="4" md="4" sm="12" cols="12">
            <QualifyingResult :qualifying="qualifying" />
          </v-col>
          <v-col xl="4" lg="4" md="4" sm="12" cols="12">
            <RaceResult :raceResult="raceResult" />
          </v-col>
          <v-col xl="4" lg="4" md="4" sm="12" cols="12">
            <ChampionshipAfterRace :drivers="drivers" />
          </v-col>
        </v-row>

        <v-row v-else>
          <v-col cols="12">
            <p class="title">Selecione uma rodada para ver os resultados.</p>
          </v-col>
        </v-row>
      </v-container>

      <v-divider class="my-5"></v-divider>

      <v-overlay :value="loading">
        <v-progress-circular
          indeterminate
          size="64"
        ></v-progress-circular>
      </v-overlay>

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
    drivers: [],
    loading: false,
    componentKey: 0,
    races: [],

    raceSelected: [],
    qualifying: [],
    raceResult: [],
    round: []
  }),
  methods: {
    reset() {
      // Procurar por meio de recarregar a página
      this.selectedYear = ""

      this.drivers = [],
      this.races = []

      this.raceSelected = []
      this.qualifying = []
      this.raceResult = []
      this.round = []
    },
    async racesAndDriversOfTheSeason(year) {
      this.reset()

      this.selectedYear = year;
      
       await fetch("https://ergast.com/api/f1/" + year + "/drivers.json")
          .then(response => response.json())
          .then(json => {
              this.drivers = json.MRData.DriverTable.Drivers

              for(let driver of this.drivers) {
                  driver.points = parseInt(0)
              }
          })

        await fetch("https://ergast.com/api/f1/" + year + ".json")
          .then(response => response.json())
          .then(json => {
              this.races = json.MRData.RaceTable.Races
          })
    },
    async getRaceSelected(round) {
      this.loading = true
      
      this.raceSelected = this.races[round - 1]

      await fetch("https://ergast.com/api/f1/"+ this.selectedYear + "/" + round + "/qualifying.json")
        .then(response => response.json())
        .then(json => {
            this.qualifying = json.MRData.RaceTable.Races[0]
        })

      await fetch("https://ergast.com/api/f1/" + this.selectedYear + "/" + round + "/results.json")
        .then(response => response.json())
        .then(json => {
            this.raceResult = json.MRData.RaceTable.Races[0]
        })
      
      this.getChampionshipAfterRace(round)
    },
    async getChampionshipAfterRace(round) {
      console.log(this.ready)
      // Situação do campeonato após a corrida: 
      for(let driver of this.drivers) {
        driver.points = parseFloat(0)
      }
      // LOOP para passar por todas as rodadas da temporada, desde a primeira até a solicitada
      for(let i = 1; i <= round; i++) {
          
        console.log("Resultados da rodada " + i + "------------------") 

        // Faz a requisição do resultado da primeira corrida em diante
        await fetch("https://ergast.com/api/f1/" + this.selectedYear + "/" + i + "/results.json")
          .then(response => response.json())
          .then(json => {
            let roundResults = json.MRData.RaceTable.Races[0]

            // Pega o resultado da rodada e passa de piloto em piloto para ver sua pontuação
            for(let z = 0; z < roundResults.Results.length; z++) {

              // Agora passa de piloto em piloto no array de pilotos da temporada para poder entregar os pontos
              for(let y = 0; y < this.drivers.length; y++) {

                // A cada interação verifica
                if(this.drivers[y].driverId == roundResults.Results[z].Driver.driverId) {
                  this.drivers[y].points += parseFloat(roundResults.Results[z].points)
                }
                  
              }
            }
          })
      }

      this.loading = false
      console.log(this.ready)
      this.drivers.sort(this.order)

    },
    order(a, b) {
    if(a.points < b.points) {
        return 1
    }

    if(a.points > b.points) {
        return -1
    }

    return 0
  },
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

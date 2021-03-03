<template>
  <v-app>
    <v-app-bar
      app
      color="red"
      class="d-flex justify-center"
    >
      <v-btn>
        F1
      </v-btn>
    </v-app-bar>

    <v-main
        style="background-color: #242433"
        class="mt-4"
    >
      <v-container>
        <v-row justify="center">
           <v-col style="max-width: 200px">
            <AllSeasons :years="years" @year-selected="racesAndDriversOfTheSeason"/>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col>
            <RoundsOfTheSeason />
          </v-col>
        </v-row>

        <v-row justify="space-between">
          <v-col xl="4" lg="4" md="4" sm="12" cols="12">
            <QualifyingResult />
          </v-col>
          <v-col xl="4" lg="4" md="4" sm="12" cols="12">
            <RaceResult />
          </v-col>
          <v-col xl="4" lg="4" md="4" sm="12" cols="12">
            <ChampionshipAfterRace />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AllSeasons from './components/AllSeasons'
import ChampionshipAfterRace from './components/ChampionshipAfterRace'
import QualifyingResult from './components/QualifyingResult'
import RaceResult from './components/RaceResult'
import RoundsOfTheSeason from './components/RoundsOfTheSeason'

export default {
  name: 'App',

  components: {
    AllSeasons,
    ChampionshipAfterRace,
    QualifyingResult,
    RaceResult,
    RoundsOfTheSeason
  },

  data: () => ({
    seasons: [],

    years: [],

    selectedYear: ""
  }),
  methods: {
     allSeasons() {
      fetch("https://ergast.com/api/f1/seasons.json?limit=200")
          .then(response => response.json())
          .then(json => {
              let array = json.MRData.SeasonTable.Seasons
              this.seasons = array.reverse()

              for(let season of this.seasons) {
                this.years.push(season.season)
              }
          })
    },
    racesAndDriversOfTheSeason() {
      console.log("Chamando função")
    }
  },
  created() {
    this.allSeasons()
  }
};
</script>

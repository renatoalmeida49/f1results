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
            <RoundsOfTheSeason :races="races" @raceSelected="getRaceSelected"/>
          </v-col>
        </v-row>

        <v-row justify="space-between">
          <v-col xl="4" lg="4" md="4" sm="12" cols="12">
            <QualifyingResult :qualifying="qualifying" />
          </v-col>
          <v-col xl="4" lg="4" md="4" sm="12" cols="12">
            <RaceResult :raceResult="raceResult" />
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

    selectedYear: "",
    drivers: [],
    races: [],

    raceSelected: [],
    qualifying: [],
    raceResult: [],
    round: []
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
    async racesAndDriversOfTheSeason(year) {
      this.selectedYear = year;

      this.drivers = []
      this.races = []

      this.raceSelected = []
      this.qualifying = []
      this.raceResult = []
      this.round = []
      
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
    }
  },
  created() {
    this.allSeasons()
  },
};
</script>

<template>
  <div>
    <v-card>
      <v-tabs
        justify="center"
        background-color="lightenGray"
        elevation="24"
        center-active
        dark
      >
        <v-tab
          v-for="n in races.length"
          :key="n"
          @click="raceSelected(n)"
        >
          {{n}}<br>

          <img
              :src="getFlag(n)"
              width="25"
              class="ml-2"
              :alt=n
          />
        </v-tab>
      </v-tabs>
    </v-card>

    <v-row justify="center">
      <v-col cols="auto">
        <h1 class="my-2 mt-5">{{year}} - {{roundSelected}}</h1>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "RoundsOfTheSeason",

  data() {
    return {
      races: [],
      roundSelected: "",
    }
  },

  created() {
    this.racesOfSeason()
  },

  watch: {
    year() {
      this.racesOfSeason()
      this.forceRender()
    }
  },

  computed: {
    ...mapGetters(['year'])
  },

  methods: {
    ...mapActions(['newRound']),

    raceSelected(keynumber) {
      this.roundSelected = this.races[keynumber - 1].raceName

      this.newRound({round: keynumber})
    },


    getFlag(n) {
      let country = this.races[n - 1].Circuit.Location.country
      let images = require.context('../../assets/flags/', false, /\.png$/)

      return images('./' + country.toLowerCase() + ".png")
    },

    async racesOfSeason() {
      await fetch(`https://ergast.com/api/f1/${this.year}.json`)
        .then(response => response.json())
        .then(json => {
          this.races = json.MRData.RaceTable.Races
          this.roundSelected = this.races[0].raceName
        })
    },
  },
}
</script>
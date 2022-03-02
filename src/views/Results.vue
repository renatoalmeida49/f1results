<template>
  <v-container>
    <RoundsOfTheSeason />

    <v-row justify="space-between">
      <v-col xl="4" lg="6" md="6" sm="12" cols="12">
        <QualifyingResult />
      </v-col>
      <v-col xl="4" lg="6" md="6" sm="12" cols="12">
        <RaceResult />
      </v-col>
      <v-col xl="4" lg="12" md="12" sm="12" cols="12">
        <ChampionshipAfterRace />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ChampionshipAfterRace from '../components/home/ChampionshipAfterRace'
import QualifyingResult from '../components/home/QualifyingResult'
import RaceResult from '../components/home/RaceResult'
import RoundsOfTheSeason from '../components/home/RoundsOfTheSeason'

import { mapGetters } from "vuex";

export default {
  name: "Results",

  components: {
    RoundsOfTheSeason,
    QualifyingResult,
    RaceResult,
    ChampionshipAfterRace
  },

  created() {
    if(!this.year)
      this.$router.push("/")
  },

  computed: {
    ...mapGetters(['year', 'round'])
  },
}
</script>
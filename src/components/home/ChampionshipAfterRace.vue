<template>
  <div>
    <h2 style="color: white">Situação do campeonato</h2>
    <v-data-table
      :headers="headers"
      :items="drivers"
      :items-per-page="30"
      class="elevation-10"
      sort-by="#"
      :loading="loading"
    >
      <template v-slot:[`item.posicao`]="{ item }">
        <v-chip
          :color="getColor(item.posicao)"
        >
          {{ item.posicao }}
        </v-chip>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { championship } from "@/services/f1";

export default {
  name: "ChampionshipAfterRace",

  data() {
    return {
      driverStandings: [],
      headers: [
        {text: '#', value: 'posicao'},
        {text: 'Nome', value: 'nome'},
        {text: 'Constutor', value: 'construtor'},
        {text: 'Pontuação', value: 'pontuacao'}
      ],
      drivers: [],
      loading: true
    }
  },
    
  created() {
    this.getDriverStandings()
  },

  computed: {
    ...mapGetters(['year', 'round'])
  },

  watch: {
    year() {
      this.getDriverStandings()
    },

    round() {
      this.getDriverStandings()
    }
  },

  methods: {
    async getDriverStandings() {
      this.loading = true

      this.drivers = []

      this.driverStandings = await championship(this.year, this.round);

      this.drivers = this.driverStandings.map(driver => {
        return {
          posicao: driver.position,
          nome: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
          construtor: driver.Constructors[0]?.name || "",
          pontuacao: driver.points
        }
      })

      this.loading = false
    },

    getColor(position) {
      if(position) return 'black'
    }
  },
}
</script>
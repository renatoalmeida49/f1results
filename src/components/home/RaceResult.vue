<template>
  <div>
    <h2 style="color: white">Resultado da corrida</h2>
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

      <template v-slot:[`item.pontuacao`]="{ item }">
        <v-chip
          :color="getPontuacaoColor(item.pontuacao)"
        >
          {{ item.pontuacao }}
        </v-chip>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { race } from "@/services/f1";

export default {
  name: "RaceResult",

  data() {
    return {
      raceResult: [],
      headers: [
        {text: '#', value: 'posicao'},
        {text: 'Nome', value: 'nome'},
        {text: 'Construtor', value: 'construtor'},
        {text: 'Pontuação', value: 'pontuacao'}
      ],
      drivers: [],
      loading: true
    }
  },

  created() {
    this.getRaceResult()
  },

  computed: {
    ...mapGetters(['year', 'round'])
  },
  
  watch: {
    year() {
      this.getRaceResult()
    },
    round() {
      this.getRaceResult()
    }
  },

  methods: {
    async getRaceResult() {
      this.loading = true

      this.drivers = []

      this.raceResult = await race(this.year, this.round);

      this.drivers = this.raceResult.map(driver => {
        return {
          posicao: driver.position,
          nome: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
          construtor: driver.Constructor.name,
          pontuacao: driver.points
        }
      })
      
      this.loading = false
    },

    getColor(position) {
      if(position == 1) return '#F9A825'
      else if(position == 2) return '#999999'
      else if(position == 3) return '#8D6E63'
      else return 'black'
    },

    getPontuacaoColor(pontuacao) {
      if(pontuacao > 0) return '#546E7A'
      else return null
    }
  },
}
</script>
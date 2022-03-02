<template>
  <div>
    <h2 style="color: white">Qualificação</h2>

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
import { qualifying } from "@/services/f1";

export default {
  name: "Qualifying",

  data() {
    return {
      qualifying: [],
      headers: [
        {text: '#', value: 'posicao'},
        {text: 'Nome', value: 'nome'},
        {text: 'Constutor', value: 'construtor'},
        // LAP TIME: {text: 'Pontuação', value: 'pontuacao'}
      ],
      drivers: [],
      loading: true
    }
  },

  created() {
    this.getQualifying()
  },

  computed: {
    ...mapGetters(['year', 'round'])
  },

  watch: {
    year() {
      this.getQualifying()
    },

    round() {
      this.getQualifying()
    }
  },

  methods: {
    async getQualifying() {
      this.loading = true
      this.drivers = []

      this.qualifying = await qualifying(this.year, this.round);

      if (this.qualifying) {
        this.drivers = this.qualifying.map(driver => {
          return {
            posicao: driver.position,
            nome: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
            construtor: driver.Constructor.name
          }
        })
      }
      
      this.loading = false
    },

    getColor(position) {
      if(position) return 'black'
    }
  },
}
</script>
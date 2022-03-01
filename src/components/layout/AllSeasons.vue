<template>
<div>
    <v-select
      :items="years"
      label="Escolha um ano"
      color="blue"
      elevation="10"
      v-model="selected"
    >
    </v-select>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { allSeasons } from "@/services/f1";

export default {
  name: "AllSeasons",

  data() {
    return {
      selected: "",
      years: []
    }
  },

  created() {
    this.getSeasons()
  },

  watch: {
    selected() {
      this.newYear({year: this.selected})
    }
  },
    

  methods: {
    ...mapActions(['newYear']),

    getSeasons() {
      allSeasons()
        .then(response => {
          this.years = response.map((season) => {
              return season.season
          }).reverse() 
        })
    },
  },
    
}
</script>
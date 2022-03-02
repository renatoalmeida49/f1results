<template>
  <div>
    <v-select
      :items="years"
      label="Escolha um ano"
      :value="getValue"
      color="blue"
      elevation="10"
      @change="updateData"
    >
    </v-select>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { allSeasons } from "@/services/f1";

export default {
  name: "AllSeasons",

  data() {
    return {
      years: []
    }
  },

  created() {
    this.getSeasons()
  },

  computed: {
    ...mapGetters(['year']),

    getValue() {
      if (this.year) {
        return this.year
      }

      return "Escolha um ano";
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

    updateData(event) {
      this.newYear({year: event})

      if (this.$route.path != "/results")
        this.$router.push("/results");
    }
  },
    
}
</script>
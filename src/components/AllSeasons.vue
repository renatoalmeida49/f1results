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
import { bus } from '../main'

export default {
    name: "AllSeasons",
    data() {
        return {
            selected: "",

            seasons: [],
            years: []
        }
    },
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
    },
    watch: {
        selected() {
            bus.$emit('year-selected', this.selected)
        }
    },
    created() {
        this.allSeasons()
    }
}
</script>
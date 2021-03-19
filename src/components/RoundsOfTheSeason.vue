<template>
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
</template>

<script>
export default {
    name: "RoundsOfTheSeason",
    props: ['year'],
    data() {
        return {
            races: []
        }
    },
    methods: {
        raceSelected(keynumber) {
            let array = {
                "key" : keynumber,
                "year": this.races[keynumber - 1].season,
                "round": this.races[keynumber - 1].raceName
            }

            this.$emit('raceSelected', array)
        },
        getFlag(n) {
            let country = this.races[n - 1].Circuit.Location.country
            let images = require.context('../assets/flags/', false, /\.png$/)
            return images('./' + country.toLowerCase() + ".png")
        },
        async racesOfSeason() {
            await fetch("https://ergast.com/api/f1/" + this.year + ".json")
                .then(response => response.json())
                .then(json => {
                    this.races = json.MRData.RaceTable.Races
                    this.raceSelected(1)
                })
        },
    },
    watch: {
        year() {
            this.racesOfSeason()
            this.raceSelected(1)
        }
    },
    created() {
        this.racesOfSeason()
    }
}
</script>
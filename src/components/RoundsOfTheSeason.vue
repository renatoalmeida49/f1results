<template>
    <div>
        <v-card>
            <v-tabs
                justify="center"
                background-color="lightenGray"
                elevation="24"
                center-active
                :key="componentKey"
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
            <div class="d-flex display-1 mt-4">{{year}} - {{roundSelected}}</div>
          </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: "RoundsOfTheSeason",
    props: ['year'],
    data() {
        return {
            races: [],
            roundSelected: "",
            componentKey: 0
        }
    },
    methods: {
        raceSelected(keynumber) {
            this.roundSelected = this.races[keynumber - 1].raceName

            this.$emit('round-selected', keynumber)
        },
        getFlag(n) {
            let country = this.races[n - 1].Circuit.Location.country
            let images = require.context('../assets/flags/', false, /\.png$/)
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
        forceRender() {
            this.componentKey += 1
        }
    },
    watch: {
        year() {
            this.racesOfSeason()
            this.forceRender()
        }
    },
    created() {
        this.racesOfSeason()
    }
}
</script>
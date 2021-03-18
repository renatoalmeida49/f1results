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
    props: ['races'],
    methods: {
        raceSelected(keynumber) {
            this.$emit('raceSelected', keynumber)
        },
        getFlag(n) {
            n--

            let country = this.races[n].Circuit.Location.country

            let images = require.context('../assets/flags/', false, /\.png$/)

            //let path = `../assets/flags/${country.toLowerCase()}.png`
            
            return images('./' + country.toLowerCase() + ".png")
        }
    },
}
</script>
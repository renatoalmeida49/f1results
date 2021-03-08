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
                {{n}}
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
        }
    }
}
</script>
<template>
<div>
    <v-container v-if="selectedYear == ''">
        <HowToUse />
    </v-container>

    <v-container v-else>
        <v-row justify="center">
            <v-col>
                <RoundsOfTheSeason :year="selectedYear" @round-selected="roundSelected"/>
            </v-col>
        </v-row>

        <v-row justify="space-between">
            <v-col xl="4" lg="6" md="6" sm="12" cols="12">
                <QualifyingResult :year="selectedYear" :round="selectedRound" />
            </v-col>
            <v-col xl="4" lg="6" md="6" sm="12" cols="12">
                <RaceResult :year="selectedYear" :round="selectedRound" />
            </v-col>
            <v-col xl="4" lg="12" md="12" sm="12" cols="12">
                <ChampionshipAfterRace :year="selectedYear" :round="selectedRound" />
            </v-col>
        </v-row>
    </v-container>
</div>
</template>

<script>
import ChampionshipAfterRace from '../components/ChampionshipAfterRace'
import QualifyingResult from '../components/QualifyingResult'
import RaceResult from '../components/RaceResult'
import RoundsOfTheSeason from '../components/RoundsOfTheSeason'
import HowToUse from '../components/HowToUse'

import { bus } from '../main'

export default {
    name: "Home",
    components: {
        HowToUse,
        RoundsOfTheSeason,
        QualifyingResult,
        RaceResult,
        ChampionshipAfterRace
    },
    data() {
        return {
            selectedYear: '',

            selectedRound: 1
        }
    },
    methods: {
        roundSelected(round) {
            this.selectedRound = round
        },
    },
    created() {
        bus.$on('year-selected', (year) => {
            this.selectedYear = year
        })
    }
}
</script>

<style>

</style>
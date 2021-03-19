<template>
    <div>
        <h2 style="color: white">Resultado da corrida</h2>
        <v-card
            elevation="10"
            color="lightenGray"
            dark
        >
            <v-list-item
                style="justify-content: center"
                v-for="(result, index) in raceResult.Results"
                :key="index"
                :class="{gold: index == 0, silver: index == 1, bronze: index == 2, pointFinisher: result.points != 0}"
            >
                {{result.position}} - {{result.Driver.givenName}} {{result.Driver.familyName}} - {{result.Constructor.name}} <span v-show="result.points != 0" class="ml-1"> - {{result.points}}</span>
            </v-list-item>
        </v-card>
    </div>
</template>

<script>
export default {
    name: "RaceResult",
    props: ['year', 'round'],
    data() {
        return {
            raceResult: []
        }
    },
    methods: {
        async getRaceResult() {
            await fetch("https://ergast.com/api/f1/" + this.year + "/" + this.round + "/results.json")
                .then(response => response.json())
                .then(json => {
                    this.raceResult = json.MRData.RaceTable.Races[0]
                })
        }
    },
    watch:{
        year() {
            this.getRaceResult()
        },
        round() {
            this.getRaceResult()
        }
    },
    created() {
        this.getRaceResult()
    }
}
</script>

<style scoped>
.gold {
    background: #F9A825 !important;
    border-radius: 6px;
}

.silver {
    background: silver !important;
    border-radius: 6px;
}

.bronze {
    background: #8D6E63 !important;
    border-radius: 6px;
}

.pointFinisher {
    background: #546E7A;
    border-radius: 6px;
}
</style>
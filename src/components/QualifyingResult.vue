<template>
    <div>
        <h2 style="color: white">Qualificação</h2>
        <v-card
            elevation="10"
            color="lightenGray"
            dark
        >
            <v-list-item 
                style="justify-content: center"
                v-for="(grid, index) in qualifying.QualifyingResults"
                :key="index"
            >
                {{grid.position}} - {{grid.Driver.givenName}} {{grid.Driver.familyName}} - {{grid.Constructor.name}}
            </v-list-item>
            
        </v-card>
    </div>
</template>

<script>
export default {
    name: "Qualifying",
    data() {
        return {
            qualifying: []
        }
    },
    props: ['year', 'round'],
    methods: {
        async getQualifying() {
            await fetch("https://ergast.com/api/f1/"+ this.year + "/" + this.round + "/qualifying.json")
                .then(response => response.json())
                .then(json => {
                    this.qualifying = json.MRData.RaceTable.Races[0]
                })
        }
    },
    watch: {
        year() {
            this.getQualifying()
        },
        round() {
            this.getQualifying()
        }
    },
    created() {
        this.getQualifying()
    }
}
</script>
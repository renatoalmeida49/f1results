<template>
    <div>
        <h2 style="color: white">Situação do campeonato</h2>
        <v-card
            elevation="10"
            color="lightenGray"
            dark
        >
            <v-list-item
                style="justify-content: center"
                v-for="(driver, index) in driverStandings.DriverStandings"
                :key="index"
            >
                {{index + 1}} - {{driver.Driver.givenName}} {{driver.Driver.familyName}} - {{driver.Constructors[0].name}} <span v-show="driver.points != 0" class="ml-1"> - {{driver.points}}</span>
            </v-list-item>
        </v-card>
    </div>
</template>

<script>
export default {
    name: "ChampionshipAfterRace",
    props: ['year', 'round'],
    data() {
        return {
            driverStandings: []
        }
    },
    methods: {
        async getDriverStandings() {
            await fetch("https://ergast.com/api/f1/" + this.year + "/" + this.round  + "/driverstandings.json")
                .then(response => response.json())
                .then(json => {
                    this.driverStandings = json.MRData.StandingsTable.StandingsLists[0]
                })
        }
    },
    watch: {
        year() {
            this.getDriverStandings()
        },
        round() {
            this.getDriverStandings()
        }
    },
    created() {
        this.getDriverStandings()
    }
}
</script>
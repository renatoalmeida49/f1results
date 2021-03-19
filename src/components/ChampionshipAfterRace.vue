<template>
    <div>
        <h2 style="color: white">Situação do campeonato</h2>
        <v-data-table
            :headers="headers"
            :items="drivers"
            :items-per-page="30"
            class="elevation-10"
            sort-by="#"
        ></v-data-table>
    </div>
</template>

<script>
export default {
    name: "ChampionshipAfterRace",
    props: ['year', 'round'],
    data() {
        return {
            driverStandings: [],
            headers: [
                {text: '#', value: 'posicao'},
                {text: 'Nome', value: 'nome'},
                {text: 'Constutor', value: 'construtor'},
                {text: 'Pontuação', value: 'pontuacao'}
            ],
            drivers: []
        }
    },
    methods: {
        async getDriverStandings() {
            this.drivers = []
            
            await fetch("https://ergast.com/api/f1/" + this.year + "/" + this.round  + "/driverstandings.json")
                .then(response => response.json())
                .then(json => {
                    this.driverStandings = json.MRData.StandingsTable.StandingsLists[0]
                })
            
            for(let driver of this.driverStandings.DriverStandings) {
                this.drivers.push({
                    posicao: driver.position,
                    nome: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
                    construtor: driver.Constructors[0].name,
                    pontuacao: driver.points
                })
            }
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
<template>
    <div>
        <h2 style="color: white">Situação do campeonato</h2>
        <v-data-table
            :headers="headers"
            :items="drivers"
            :items-per-page="30"
            class="elevation-10"
            sort-by="#"
            :loading="loading"
        >
            <template v-slot:[`item.posicao`]="{ item }">
                <v-chip
                    :color="getColor(item.posicao)"
                >
                    {{ item.posicao }}
                </v-chip>
            </template>
        </v-data-table>
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
            drivers: [],
            loading: true
        }
    },
    methods: {
        async getDriverStandings() {
            this.loading = true

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

            this.loading = false
        },
        getColor(position) {
            if(position) return 'black'
        }
    },
    watch: {
        year() {
           this.getDriverStandings()
        },
        round() {
            if(this.round != 1)
                this.getDriverStandings()
        }
    },
    created() {
        this.getDriverStandings()
    }
}
</script>
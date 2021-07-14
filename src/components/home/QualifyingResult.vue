<template>
    <div>
        <h2 style="color: white">Qualificação</h2>
        <v-data-table
            v-if="qualifying != null"
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

        <v-card
            v-else
            elevation="10"
            color="lightenGray"
            dark
        >
            <v-list-item style="justify-content: center">Desculpe, não temos esses dados.</v-list-item>
        </v-card>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: "Qualifying",
    data() {
        return {
            qualifying: [],
            headers: [
                {text: '#', value: 'posicao'},
                {text: 'Nome', value: 'nome'},
                {text: 'Constutor', value: 'construtor'},
                // LAP TIME: {text: 'Pontuação', value: 'pontuacao'}
            ],
            drivers: [],
            loading: true
        }
    },
    methods: {
        async getQualifying() {
            this.loading = true

            this.drivers = []

            await fetch("https://ergast.com/api/f1/"+ this.year + "/" + this.round + "/qualifying.json")
                .then(response => response.json())
                .then(json => {
                    this.qualifying = json.MRData.RaceTable.Races[0]
                })

            if(this.qualifying != null)
                for(let driver of this.qualifying.QualifyingResults) {
                    this.drivers.push({
                        posicao: driver.position,
                        nome: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
                        construtor: driver.Constructor.name
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
            this.getQualifying()
        },
        round() {
            this.getQualifying()
        }
    },
    computed: {
        ...mapGetters(['year', 'round'])
    },
    created() {
        this.getQualifying()
    }
}
</script>
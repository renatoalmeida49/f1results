<template>
    <div>
        <h2 style="color: white">Resultado da corrida</h2>
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
    name: "RaceResult",
    props: ['year', 'round'],
    data() {
        return {
            raceResult: [],
            headers: [
                {text: '#', value: 'posicao'},
                {text: 'Nome', value: 'nome'},
                {text: 'Construtor', value: 'construtor'},
                {text: 'Pontuação', value: 'pontuacao'}
            ],
            drivers: []
        }
    },
    methods: {
        async getRaceResult() {
            this.drivers = []

            await fetch("https://ergast.com/api/f1/" + this.year + "/" + this.round + "/results.json")
                .then(response => response.json())
                .then(json => {
                    this.raceResult = json.MRData.RaceTable.Races[0]
                })

            for(let driver of this.raceResult.Results) {
                this.drivers.push({
                    posicao: driver.position,
                    nome: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
                    construtor: driver.Constructor.name,
                    pontuacao: driver.points
                })
            }
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
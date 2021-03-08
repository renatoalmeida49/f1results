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
            >
                {{result.position}} - {{result.Driver.givenName}} {{result.Driver.familyName}} - {{result.Constructor.name}} - {{result.points}}
            </v-list-item>
        </v-card>
    </div>
</template>

<script>
export default {
    name: "RaceResult",
    props: ['raceResult']
}
</script>
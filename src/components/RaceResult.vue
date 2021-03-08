<template>
    <div>
        <h2 style="color: white">Race Result</h2>
        <v-card
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
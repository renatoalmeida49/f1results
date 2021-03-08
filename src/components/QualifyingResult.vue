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
    props: ['qualifying']
}
</script>
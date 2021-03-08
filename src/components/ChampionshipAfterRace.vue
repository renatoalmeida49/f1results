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
                v-for="(driver, index) in drivers"
                :key="index"
            >
                {{index + 1}} - {{driver.givenName}} {{driver.familyName}} - {{driver.points}}
            </v-list-item>
        </v-card>
    </div>
</template>

<script>
export default {
    name: "ChampionshipAfterRace",
    props: ['drivers']
}
</script>
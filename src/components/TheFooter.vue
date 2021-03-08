<template>
    <v-footer
        dark
        padless
    >
        <v-card
            flat
            tile
            class="text-center"
            width="100%"
        >
            <v-card-text>
                <v-btn
                    icon
                >
                    <v-icon>mdi-instagram</v-icon>
                </v-btn>

                <v-btn
                    icon
                >
                    <v-icon>mdi-facebook</v-icon>
                </v-btn>

                <v-btn
                    icon
                >
                    <v-icon>mdi-github</v-icon>
                </v-btn>
            </v-card-text>
            <v-card-text>
                Desenvolvido e criado por Novaes. Consumindo de api de ergast.
            </v-card-text>
            <v-card-text>
                2021 - Raktech
            </v-card-text>
        </v-card>
    </v-footer>
</template>

<script>
export default {
    name: "TheFooter"
}
</script>
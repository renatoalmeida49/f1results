<template>
<v-app-bar
    app
    color="red"
    class="justify-center"
>
    
    <v-img
    src="@/assets/f1logo.png"
    max-width="70"
    @click="reset()"
    >
    </v-img>

    <v-spacer></v-spacer>

    <v-btn icon @click="reset()">
    <v-icon>
        mdi-help-box
    </v-icon>
    </v-btn>
</v-app-bar>
</template>

<script>
import { bus } from "../main"

export default {
    name: 'TheHeader',
    methods: {
        reset() {
            bus.$emit('year-selected', '')
        }
    }
}
</script>

<style>

</style>
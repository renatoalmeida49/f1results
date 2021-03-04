<template>
    <div>
        <v-select
            :items="years"
            label="Select a season"
            color="blue"
            v-model="selected"
        >
        </v-select>
    </div>
</template>

<script>
export default {
    name: "AllSeasons",
    props: ['years'],
    data() {
        return {
            selected: ""
        }
    },
    watch: {
        selected() {
            this.$emit('year-selected', this.selected)
        }
    }
}
</script>
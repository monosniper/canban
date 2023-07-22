<script>
    export default {
        props: {
            desk: {
                type: Object,
                required: true
            }
        },
    }
</script>

<template>
    <RouterLink class="v-tab-link" :to="'/'+desk.id">
        <v-tab
            color="#FFFFFF"
            :value="desk.id"
            slider-color="#1F60C0"
        >
            {{ desk.title }}
        </v-tab>
    </RouterLink>
</template>

<style scoped>

</style>

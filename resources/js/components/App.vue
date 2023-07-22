<script>
    import Desks from "@/components/Desks.vue";
    export default {
        components: {
            Desks,
        }
    }
</script>

<template>
    <div class="root">
        <Desks />
        <router-view></router-view>
    </div>
</template>

<style scoped>
    .root {
        min-height: 100vh;
    }
</style>

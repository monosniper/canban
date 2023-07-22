<script>
    import Category from "@/components/Category.vue"
    import CreateCategoryDialog from "@/components/dialogs/CreateCategoryDialog.vue";

    export default {
        components: {
            CreateCategoryDialog,
            Category,
        },
        watch: {
            $route(to, from) {
                this.setCurrentDesk()
            }
        },
        mounted() {
            this.setCurrentDesk()
        },
        computed: {
            desk() {
                return this.$store.getters.getCurrentDesk
            }
        },
        methods: {
            setCurrentDesk() {
                this.$store.commit("setCurrentDesk", this.$route.params.desk)
            },
        }
    }
</script>

<template>
    <div class="desk" v-if="desk">
        <CreateCategoryDialog />

        <Category
            v-for="category in desk.categories"
            :category="category"
        />
    </div>
</template>

<style scoped>
    .desk {
        background: rgba(255,255,255,.08);
        min-height: 90vh;
        margin: 25px;
        padding: 40px;
        display: flex;
        gap: 15px;
    }
</style>

<script>
    import DeskTab from "@/components/DeskTab.vue";
    import CreateDeskDialog from "@/components/dialogs/CreateDeskDialog.vue";
    import RenameDeskDialog from "@/components/dialogs/RenameDeskDialog.vue";
    import DeleteDeskDialog from "@/components/dialogs/DeleteDeskDialog.vue";

    export default {
        components: {
            DeskTab,
            CreateDeskDialog,
            RenameDeskDialog,
            DeleteDeskDialog,
        },
        data: () => ({
            tab: null,
        }),
        mounted() {
            this.$store.dispatch("fetchDesks")
        },
        computed: {
            desks() {
                return this.$store.getters.getAllDesks
            }
        },
    }
</script>

<template>
    <div class="desks">
        <v-tabs
            v-model="tab"
            bg-color="#00060F"
            color="#FFFFFF"
            selected-class="v-tab-selected"
        >
            <CreateDeskDialog />

            <DeskTab
                v-for="desk in desks"
                :desk="desk"
            />

            <v-menu v-if="$store.state.currentDesk">
                <template v-slot:activator="{ props }">
                    <v-btn
                        class="desks__delete"
                        v-bind="props"
                        :rounded="true"
                        variant="text"
                    >
                        <v-icon icon="mdi-dots-vertical" />
                    </v-btn>
                </template>
                <v-list>
                    <RenameDeskDialog :title="$store.state.currentDesk.title" />
                    <DeleteDeskDialog />
                </v-list>
            </v-menu>
        </v-tabs>
    </div>
</template>

<style scoped>
    .v-tab {
        padding: 0 45px;
    }
    .v-tab-link a, .v-tab-link {
        color: white;
        text-decoration: none;
    }

    .desks__delete {
        margin-left: auto;
        height: 48px;
    }

    .v-tab-selected {
        background: rgba(255,255,255,.08);
    }
</style>

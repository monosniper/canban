<script>
    import {mapActions} from "vuex";

    export default {
        data: () => ({
            dialog: false,
            loading: false,
        }),
        methods: {
            ...mapActions(['deleteDesk']),
            async _deleteDesk() {
                this.loading = true

                this.deleteDesk().then(() => {
                    this.loading = false
                    this.dialog = false
                })
            },
        }
    }
</script>

<template>
    <v-dialog
        transition="dialog-top-transition"
        v-model="dialog"
        width="400"
        :close-on-back="false"
        scrim="#000"
    >
        <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" :ripple="true">
                <v-list-item-title>Delete</v-list-item-title>
            </v-list-item>
        </template>

        <v-card class="dialog">
            <v-card-title align="center">
                Are you sure?
            </v-card-title>
            <v-card-actions class="dialog__actions">
                <v-btn class="btn" @click="_deleteDesk" :loading="loading">Yes</v-btn>
                <v-btn class="btn btn_secondary" @click="dialog = false">Cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped>

</style>

<script>
    import {mapActions} from "vuex";

    export default {
        props: {
            title: {
                type: String,
                required: true,
            }
        },
        data: () => ({
            dialog: false,
            loading: false,
            titleRules: [
                v => !!v || 'Title is required',
                v => (v && v.length <= 150) || 'Title must be less than 150 characters',
            ],
        }),
        methods: {
            ...mapActions(['updateDesk']),
            async renameDesk() {
                const { valid } = await this.$refs.form.validate()

                if (valid) {
                    this.loading = true

                    this.updateDesk({
                        title: this.title
                    }).then(() => {
                        this.loading = false
                        this.dialog = false

                        this.$refs.form.reset()
                    })
                }
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
                <v-list-item-title>Rename</v-list-item-title>
            </v-list-item>
        </template>

        <v-card class="dialog">
            <v-card-title align="center">
                Rename Desk
            </v-card-title>
            <v-form ref="form">
                <v-text-field
                    label="Title"
                    v-model="title"
                    :rules="titleRules"
                    required
                ></v-text-field>
            </v-form>
            <v-card-actions class="dialog__actions">
                <v-btn class="btn" @click="renameDesk" :loading="loading">Rename</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped>

</style>

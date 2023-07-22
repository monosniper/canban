<script>
    import {mapActions} from "vuex";

    export default {
        props: {
            category_id: {
                type: Number,
                required: true,
            },
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
            ...mapActions(['updateCategory']),
            async renameCategory() {
                const { valid } = await this.$refs.form.validate()

                if (valid) {
                    this.loading = true

                    this.updateCategory({
                        patch: {
                            title: this.title
                        },
                        id: this.category_id
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
                Rename Category
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
                <v-btn class="btn" @click="renameCategory" :loading="loading">Rename</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped>

</style>

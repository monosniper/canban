<script >
    import {mapActions} from "vuex";

    export default {
        data: () => ({
            dialog: false,
            loading: false,
            title: '',
            titleRules: [
                v => !!v || 'Title is required',
                v => (v && v.length <= 150) || 'Title must be less than 150 characters',
            ],
        }),
        methods: {
            ...mapActions(['storeCategory']),
            async createCategory() {
                const { valid } = await this.$refs.form.validate()

                if (valid) {
                    this.loading = true

                    this.storeCategory(this.title).then(() => {
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
            <v-btn class="desk__add" v-bind="props">
                <v-icon icon="mdi-plus" />
            </v-btn>
        </template>

        <v-card class="dialog">
            <v-card-title align="center">
                New Category
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
                <v-btn class="btn" @click="createCategory" :loading="loading">Create</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped>
    .desk__add {
        background: rgba(255,255,255,.03);
        padding: 13px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: auto;
        min-width: auto;
    }
</style>

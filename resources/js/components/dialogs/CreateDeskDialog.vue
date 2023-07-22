<script>
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
            ...mapActions(['storeDesk']),
            async createDesk() {
                const { valid } = await this.$refs.form.validate()

                if (valid) {
                    this.loading = true

                    this.storeDesk({
                        title: this.title
                    }).then(() => {
                        this.loading = false
                        this.dialog = false
                    })
                }
            }
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
            <v-btn class="desks__add" v-bind="props">
                <v-icon icon="mdi-plus" />
            </v-btn>
        </template>

        <v-card class="dialog">
            <v-card-title align="center">
                New desk
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
                <v-btn class="btn" @click="createDesk" :loading="loading">Create</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped>
    .desks__add {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 48px;
        width: 48px;
        background: transparent;
    }
</style>

<script>
    import {mapActions} from "vuex";

    export default {
        data: () => ({
            dialog: false,
            loading: false,
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 50) || 'Name must be less than 50 characters',
            ],
        }),
        methods: {
            ...mapActions(['storeTag']),
            async createTag() {
                const { valid } = await this.$refs.form.validate()

                if (valid) {
                    this.loading = true

                    this.storeTag({
                        name: this.name
                    }).then(() => {
                        this.loading = false
                        this.dialog = false
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
            <v-btn @click="dialog = !dialog" height="56">
                <v-icon icon="mdi-plus" />
            </v-btn>
        </template>

        <v-card class="dialog">
            <v-card-title align="center">
                New tag
            </v-card-title>
            <v-form ref="form">
                <v-text-field
                    label="Name"
                    v-model="name"
                    :rules="nameRules"
                    required
                ></v-text-field>
            </v-form>
            <v-card-actions class="dialog__actions">
                <v-btn class="btn" @click="createTag" :loading="loading">Create</v-btn>
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

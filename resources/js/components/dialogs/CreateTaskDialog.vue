<script>
    import {mapActions} from "vuex";
    import CreateTagDialog from "@/components/dialogs/CreateTagDialog.vue";

    export default {
        components: {CreateTagDialog},
        props: {
            category_id: {
                type: Number,
                required: true
            }
        },
        computed: {
            tags() {
                return this.$store.getters.getAllTags
            },
        },
        mounted() {
            this.$store.dispatch("fetchTags")
            console.log(this.$store.getters.getAllTags)
        },
        data: () => ({
            loading: false,
            tag_id: undefined,
            title: '',
            file: [],
            titleRules: [
                v => !!v || 'Title is required',
                v => (v && v.length <= 150) || 'Title must be less than 150 characters',
            ],
            description: '',
        }),
        methods: {
            ...mapActions(['storeTask', 'hideCreateTaskDialog']),

            async createTask() {
                const { valid } = await this.$refs.form.validate()

                if (valid) {
                    this.loading = true

                    this.storeTask({
                        data: {
                            title: this.title,
                            description: this.description,
                            category_id: this.category_id,
                            tag_id: this.tag_id,
                        },
                        file: this.file.length ? this.file[0] : undefined
                    }).then(() => {
                        this.loading = false
                        this.hideCreateTaskDialog()

                        this.$refs.form.reset()
                    })
                }
            }
        }
    }
</script>

<template>
    <v-dialog
        transition="dialog-top-transition"
        v-model="this.$store.state.createTaskDialog"
        width="400"
        :close-on-back="false"
        scrim="#000"
    >
        <v-card class="dialog">
            <v-card-title align="center">
                New Task
            </v-card-title>
            <v-form ref="form">
                <v-text-field
                    label="Title"
                    v-model="title"
                    :rules="titleRules"
                    required
                ></v-text-field>
                <v-textarea
                    label="Description"
                    v-model="description"
                ></v-textarea>
                <v-file-input
                    v-model="file"
                    placeholder="Upload your file"
                    label="Attach file"
                    prepend-icon="mdi-paperclip"
                >
                    <template v-slot:selection="{ fileNames }">
                        <template v-for="fileName in fileNames" :key="fileName">
                            <v-chip
                                size="small"
                                label
                                color="primary"
                                class="me-2"
                            >
                                {{ fileName }}
                            </v-chip>
                        </template>
                    </template>
                </v-file-input>
                <v-row>
                    <v-col cols="9">
                        <v-select
                            clearable
                            v-model="tag_id"
                            label="Tag"
                            item-title="name"
                            item-value="id"
                            :items="tags"
                        ></v-select>
                    </v-col>
                    <v-col cols="3">
                        <CreateTagDialog />
                    </v-col>
                </v-row>
            </v-form>
            <v-card-actions class="dialog__actions">
                <v-btn class="btn" @click="createTask" :loading="loading">Create</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped>

</style>

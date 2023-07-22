<script>
import {mapActions} from "vuex";

export default {
    props: {
        task: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            loading: false,
            del_loading: false,
            dialog: false,
            completed: !!this.task.completed,
            style: 'border-color: ' + (this.task?.tag ? "#"+this.task.tag.color : '#1F60C0') + ';'
                + 'padding-bottom: ' + (this.task?.tag ? "15px" : '0') + ';',
        }
    },
    watch: {
        completed() {
            this.loading = true

            this.updateTask({
                patch: {completed: this.completed},
                category_id: this.task.category_id,
                id: this.task.id
            }).then(() => {
                this.loading = false

                if(this.completed) {
                    this.dialog = false
                }
            })
        }
    },
    methods: {
        ...mapActions(['deleteTask', 'updateTask']),
        _deleteTask() {
            this.del_loading = true

            this.deleteTask({
                id: this.task.id,
                category_id: this.task.category_id,
            }).then(() => {
                this.del_loading = false
                this.dialog = false
            })
        }
    }
}
</script>

<template>
    <div @click="dialog = true" :class="'task ' + (completed ? 'completed' : '')">
        <div class="task__inner" :style="style">
            <div class="task__header">
                <div class="task__title">{{ task.title }}</div>
                <div v-if="task.attach_url" class="task__files">
                    1
                    <v-icon icon="mdi-paperclip" />
                </div>
            </div>
            <div class="task__body">{{ task.description }}</div>
        </div>
        <div v-if="task?.tag" class="task__tag">{{ task.tag.name }}</div>
        <v-dialog
            transition="dialog-top-transition"
            v-model="dialog"
            width="400"
            :close-on-back="false"
            scrim="#000"
        >
            <v-card :loading="loading" class="dialog">
                <v-card-title align="center">
                    {{ task.title }}
                </v-card-title>
                <v-card-text>
                    {{ task.description }}

                    <v-row
                        justify="start"
                        align="center"
                        style="margin-top: 20px;gap: 15px"
                    >
                        <v-chip riffle v-if="task.attach_url">
                            <a :href="task.attach_url" style="text-decoration: none;" target="_blank">
                                1
                                <v-icon icon="mdi-paperclip" />
                            </a>
                        </v-chip>
                        <v-chip v-if="task.tag" :color="'#'+task.tag.color" riffle>
                            #{{ task.tag.name }}
                        </v-chip>
                    </v-row>
                </v-card-text>

                <v-form ref="form">
                    <v-checkbox v-model="completed" label="Completed"></v-checkbox>
                </v-form>
                <v-card-actions class="dialog__actions">
                    <v-btn class="btn btn_warn" @click="_deleteTask" :loading="del_loading">Delete</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<style scoped>
    .task {
        background: white;
        border-radius: 15px;
        padding: 15px;
        position: relative;
    }
    .task__tag {
        color: white;
        font-size: 12px;
        background: #a0aec0;
        padding: 3px 6px;
        position: absolute;
        bottom: 5px;
        right: 10px;
    }
    .task__inner {
        border-left: 2px solid;
        border-radius: 3px;
        padding-left: 15px;
    }
    .task.completed {
        background: #ffffff82;
        text-decoration: line-through;
    }
    .task__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .task__title {
        font-size: 16px;
        color: black;
    }
    .task__files {
        font-size: 12px;
        color: #717171;
    }
    .task__body {
        color: #717171;
        font-size: 12px;
    }
</style>

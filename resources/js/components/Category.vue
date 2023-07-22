<script>
    import Task from "@/components/Task.vue"
    import CreateTaskDialog from "@/components/dialogs/CreateTaskDialog.vue";
    import RenameCategoryDialog from "@/components/dialogs/RenameCategoryDialog.vue";
    import DeleteCategoryDialog from "@/components/dialogs/DeleteCategoryDialog.vue";
    import draggable from "vuedraggable";

    export default {
        props: {
            category: {
                type: Object,
                required: true
            }
        },
        components: {
            CreateTaskDialog,
            RenameCategoryDialog,
            DeleteCategoryDialog,
            Task,
            draggable,
        },
        data: () => ({
            showCompleted: true,
        }),
        methods: {
            toggleCompleted() {
                this.showCompleted = !this.showCompleted
            }
        },
        computed: {
            dragOptions() {
                return {
                    animation: 200,
                    group: "description",
                    disabled: false,
                    ghostClass: "ghost"
                };
            }
        }
    }
</script>

<template>
    <div class="category">
        <CreateTaskDialog :category_id="category.id" />

        <div class="category__head">
            <div class="category__title">
                {{ category.title }}
                <span class="category__task-count">({{ category.tasks.length }})</span>
            </div>
            <v-menu>
                <template v-slot:activator="{ props }">
                    <v-btn
                        v-bind="props"
                        :rounded="true"
                        variant="text"
                    >
                        <v-icon icon="mdi-dots-vertical" />
                    </v-btn>
                </template>
                <v-list>
<!--                    <v-list-item @click="toggleCompleted" :ripple="true">-->
<!--                        <v-list-item-title>{{ this.showCompleted ? 'Hide' : 'Show' }} completed</v-list-item-title>-->
<!--                    </v-list-item>-->
                    <RenameCategoryDialog :title="category.title" :category_id="category.id" />
                    <DeleteCategoryDialog :category_id="category.id" />
                </v-list>
            </v-menu>
        </div>
        <div class="category__body">
            <v-btn block class="category__add" @click="$store.commit('toggleCreateTaskDialog', true)">
                <v-icon icon="mdi-plus" />
            </v-btn>

            <div >
                <draggable
                    class="category__tasks"
                    :list="category.tasks"
                    group="people"
                    itemKey="id"
                    ghost-class="ghost"
                >
                    <template #item="{ element, index }">
                        <Task :task="element"/>
                    </template>
                </draggable>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .category {
        background: rgba(255,255,255,.03);
        width: 330px;
        max-width: 90vw;
        border-top: 2px solid #CB29D9;
    }
    .category__body {
        padding: 20px;
    }
    .category__menu {
        background: transparent;
    }
    .category__add {
        background: rgba(255,255,255,.03);
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 15px;
    }
    .category__head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: rgba(255,255,255,.02);
        padding: 15px 20px;
    }
    .category__tasks {
        display: flex;
        gap: 10px;
        flex-direction: column;
    }
</style>

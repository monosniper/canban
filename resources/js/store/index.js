import Vuex from 'vuex'
import axios from 'axios'

export const store = new Vuex.Store({
    state: {
        desks: [],
        tags: [],
        currentDesk: null,
        createTaskDialog: false,
        createTagDialog: false,
    },
    mutations: {
        toggleCreateTaskDialog(state, bool) {
            state.createTaskDialog = bool
        },
        toggleCreateTagDialog(state, bool) {
            state.createTagDialog = bool
        },
        setDesks(state, payload) {
            state.desks = payload
        },
        setTags(state, payload) {
            state.tags = payload
        },
        setCurrentDesk(state, id) {
            state.currentDesk = state.desks.find(desk => desk.id === parseInt(id))
        },
        updateCurrentDesk(state) {
            state.currentDesk = state.desks.find(desk => desk.id === state.currentDesk.id)
        },
        addDesk(state, desk) {
            state.desks = [...state.desks, desk]
        },
        addTag(state, tag) {
            state.tags = [...state.tags, tag]
        },
        addCategory(state, category) {
            state.desks[state.desks.map(e => e.id).indexOf(state.currentDesk.id)].categories = [...state.currentDesk.categories, category]
        },
        addTask(state, { category_id, task }) {
            const categories = state
                .desks
                    [state.desks.map(e => e.id).indexOf(state.currentDesk.id)].categories

            state
                .desks
                    [state.desks.map(e => e.id).indexOf(state.currentDesk.id)]
                .categories
                    [categories.map(e => e.id).indexOf(category_id)]
                .tasks = [task, ...(categories.find(cat => cat.id === category_id).tasks)]
        },
        deleteDesk(state) {
            state.desks.splice(state.desks.map(e => e.id).indexOf(state.currentDesk.id), 1);
        },
        deleteCategory(state, id) {
            const categories = state
                .desks
                    [state.desks.map(e => e.id).indexOf(state.currentDesk.id)].categories

            state
                .desks
                    [state.desks.map(e => e.id).indexOf(state.currentDesk.id)]
                .categories
                    .splice(categories.map(e => e.id).indexOf(id), 1)
        },
        deleteTask(state, {category_id, id}) {
            const categories = state
                .desks
                    [state.desks.map(e => e.id).indexOf(state.currentDesk.id)].categories

            const tasks = categories[categories.map(e => e.id).indexOf(category_id)].tasks

            state
                .desks
                    [state.desks.map(e => e.id).indexOf(state.currentDesk.id)]
                .categories
                    [categories.map(e => e.id).indexOf(category_id)]
                .tasks
                    .splice(tasks.map(e => e.id).indexOf(id), 1)
        },
        updateDesk(state, { title }) {
            state.desks[state.desks.map(e => e.id).indexOf(state.currentDesk.id)].title = title
        },
        updateCategory(state, {patch, id}) {
            const categories = state
                .desks
                    [state.desks.map(e => e.id).indexOf(state.currentDesk.id)].categories

            state
                .desks
                    [state.desks.map(e => e.id).indexOf(state.currentDesk.id)]
                .categories
                    [categories.map(e => e.id).indexOf(id)]
                .title = patch.title
        },
        updateTask(state, {patch, category_id, id}) {
            const categories = state
                .desks
                    [state.desks.map(e => e.id).indexOf(state.currentDesk.id)].categories

            const tasks = categories[categories.map(e => e.id).indexOf(category_id)].tasks

            const task = tasks[tasks.map(e => e.id).indexOf(id)]

            state
                .desks
                    [state.desks.map(e => e.id).indexOf(state.currentDesk.id)]
                .categories
                    [categories.map(e => e.id).indexOf(category_id)]
                .tasks
                    [tasks.map(e => e.id).indexOf(id)] = {...task, patch}
        },
    },
    getters: {
        getAllDesks(state) {
            return state.desks
        },
        getAllTags(state) {
            return state.tags
        },
        getCurrentDesk(state) {
            return state.currentDesk
        },
        getIsCreateTaskDialogShown(state) {
            return state.createTaskDialog
        }
    },
    actions: {
        fetchDesks(context) {
            axios.get('/api/desks').then(rs => {
                context.commit('setDesks', rs.data.data)
            })
        },
        fetchTags(context) {
            axios.get('/api/tags').then(rs => {
                context.commit('setTags', rs.data.data)
            })
        },
        updateDesk({ commit, state }, patch) {
            return axios.patch('/api/desks/'+state.currentDesk.id, patch).then(rs => {
                commit('updateDesk', patch)
            })
        },
        updateCategory(context, { patch, id }) {
            return axios.patch('/api/categories/'+id, patch).then(rs => {
                context.commit('updateCategory', {
                    patch, id
                })
            })
        },
        updateTask(context, { patch, category_id, id }) {
            return axios.patch('/api/tasks/'+id, patch).then(rs => {
                context.commit('updateTask', {
                    patch, category_id, id
                })
            })
        },
        deleteDesk({ commit, state }) {
            return axios.delete('/api/desks/'+state.currentDesk.id).then(rs => {
                commit('deleteDesk', state.currentDesk.id)
            })
        },
        deleteCategory(context, id) {
            return axios.delete('/api/categories/'+id).then(rs => {
                context.commit('deleteCategory', id)
            })
        },
        deleteTask(context, {category_id, id}) {
            return axios.delete('/api/tasks/'+id).then(rs => {
                context.commit('deleteTask', {category_id, id})
            })
        },
        storeTag(context, payload) {
            return axios.post('/api/tags', payload).then(rs => {
                context.commit('addTag', rs.data.data)
            })
        },
        storeDesk(context, payload) {
            return axios.post('/api/desks', payload).then(rs => {
                context.commit('addDesk', rs.data.data)
            })
        },
        storeCategory({ commit, state }, title) {
            return axios.post('/api/categories', {
                title, desk_id: state.currentDesk.id
            }).then(rs => {
                commit('addCategory', rs.data.data)
                commit('updateCurrentDesk')
            })
        },
        storeTask({ commit, state }, { data, file }) {
            const formData = new FormData();

            if(file) {
                formData.append('file', file)
            }

            Object.entries(data).map(([key, value]) => {
                value && formData.append(key, value)
            })

            return axios.post('/api/tasks', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(rs => {
                commit('addTask', {
                    category_id: data.category_id,
                    task: rs.data.data
                })
                commit('updateCurrentDesk')
            })
        },
        hideCreateTaskDialog({ commit }) {
            commit('toggleCreateTaskDialog', false)
        }
    }
})

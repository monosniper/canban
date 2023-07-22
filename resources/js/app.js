import './bootstrap';
import {createApp} from 'vue'
import { createRouter, createWebHistory } from 'vue-router';
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import axios from 'axios'

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'dark'
    },
    icons: {
        defaultSet: 'mdi'
    },
})

import App from "@/components/App.vue";
import Desk from "@/pages/Desk.vue";
import {store} from "@/store/index.js";
import VueAxios from "vue-axios";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/:desk', component: Desk },
    ]
});

const app = createApp(App);

app.use(VueAxios, axios)
app.use(router);
app.use(vuetify);
app.use(store)

app.mount('#app');

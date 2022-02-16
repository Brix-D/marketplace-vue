import Vue from 'vue';
import VueRouter from 'vue-router';
import index from '../views/index';
import catalog from '../views/catalog';
import testColors from '../views/test-colors';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: index,
    },
    {
        path: '/catalog',
        name: 'catalog',
        component: catalog,
    },
    {
        path: '/test-colors',
        name: 'testColors',
        component: testColors,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;

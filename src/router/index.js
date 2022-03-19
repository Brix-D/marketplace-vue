import Vue from 'vue';
import VueRouter from 'vue-router';
import index from '../views/index';
import catalog from '../views/catalog';
import catalogDemand from '../views/catalog/demand';
import serviceView from '../views/service/_alias';
import serviceCreate from '../views/service/create';

import profileSettings from '../views/profile/index';
import profileFinances from '../views/profile/finances';
import profileReviews from '../views/profile/reviews';

import testColors from '../views/test-colors';
const isDev = process.env.NODE_ENV === 'development';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'index',
        component: index,
    },
    {
        path: '/catalog',
        name: 'catalog',
        component: catalog,
    },
    {
        path: '/catalog/demand',
        name: 'catalogDemand',
        component: catalogDemand,
    },
    {
        path: '/service/:alias',
        name: 'serviceView',
        component: serviceView,
    },
    {
        path: '/service/create',
        name: 'serviceCreate',
        component: serviceCreate,
    },
    {
        path: '/profile',
        name: 'profileSettings',
        component: profileSettings,
    },
    {
        path: '/profile/finances',
        name: 'profileFinances',
        component: profileFinances,
    },
    {
        path: '/profile/reviews',
        name: 'profileReviews',
        component: profileReviews,
    },
    {
        path: '/test-colors',
        name: 'testColors',
        component: testColors,
    },
];

const router = new VueRouter({
    //mode: 'history',
    base: !isDev ? process.env.BASE_ROUTER_URL : '',
    routes,
});

export default router;

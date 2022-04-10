import Vue from 'vue';
import VueRouter from 'vue-router';
import index from '../views/index';
import catalog from '../views/catalog';
import catalogDemand from '../views/catalog/demand';
import serviceView from '../views/service/view';
import serviceCreate from '../views/service/create';

import profile from '../views/profile/index';
import profileSettings from '../views/profile/sections/settings';
import profileFinances from '../views/profile/sections/finances';
import profileReviews from '../views/profile/sections/reviews';

import testColors from '../views/test-colors';
const isDev = process.env.NODE_ENV === 'development';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'index',
        //component: index,
        redirect: { name: 'catalog' },
    },
    {
        path: '/catalog',
        name: 'catalog',
        component: catalog,
        //meta: { title: 'Каталог услуг | ' + appName },
    },
    {
        path: '/catalog/demand',
        name: 'catalogDemand',
        component: catalogDemand,
        //meta: { title: 'Каталог потребностей | ' + appName },
    },
    {
        path: '/service/create',
        name: 'serviceCreate',
        component: serviceCreate,
    },
    {
        path: '/service/:alias',
        name: 'serviceView',
        component: serviceView,
        //meta: { title: `${} | ` + appName },
    },
    {
        path: '/profile',
        //name: 'profile',
        children: [
            {
                path: '',
                name: 'profileSettings',
                component: profileSettings,
            },
            {
                path: 'finances',
                name: 'profileFinances',
                component: profileFinances,
            },
            {
                path: 'reviews',
                name: 'profileReviews',
                component: profileReviews,
            },
        ],
        component: profile,
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

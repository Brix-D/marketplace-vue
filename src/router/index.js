import Vue from 'vue';
import VueRouter from 'vue-router';
//import index from '../views/index';
const catalog = () => import('../views/catalog');
const catalogDemand = () => import('../views/catalog/demand');
const serviceView = () => import('../views/service/view');
const serviceCreate = () => import('../views/service/create');

const profile = () => import('../views/profile/index');
const profileSettings = () => import('../views/profile/sections/settings');
const profileFinances = () => import('../views/profile/sections/finances');
const profileReviews = () => import('../views/profile/sections/reviews');
const collectServices = () => import('../views/collect-services');

const testColors = () => import('../views/test-colors');
const isDev = process.env.NODE_ENV === 'development';

Vue.use(VueRouter);

export const routes = [
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
        path: '/service/collect',
        name: 'collectServices',
        component: collectServices,
    },
    {
        path: '/service/:id/:contactId',
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

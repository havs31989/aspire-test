import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from './views/home/Home.vue';
import Cards from './views/cards/Cards.vue';

class AppRouteNames {
    public static readonly Default = 'default';
    public static readonly Home = 'home';
    public static readonly Cards = 'cards';
}

export const appRouteNames = AppRouteNames;

export const appRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        name: appRouteNames.Default,
        component: Home,
    },
    {
        path: '/' + appRouteNames.Home,
        name: appRouteNames.Home,
        component: Home,
        props: true
    },
    {
        path: '/' + appRouteNames.Cards,
        name: appRouteNames.Cards,
        component: Cards,
        props: true
    },
];

export const router = createRouter({
    history: createWebHistory(),
    routes: appRoutes,
});

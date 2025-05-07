import { createMemoryHistory, createRouter, RouteRecordRaw } from 'vue-router'
import Home from './views/home/Home.vue';
import About from './views/about/About.vue';

class AppRouteNames {
    public static readonly Default = 'default';
    public static readonly Home = 'home';
    public static readonly About = 'about';
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
        path: '/about' + appRouteNames.About,
        name: appRouteNames.About,
        component: About,
        props: true
    },
];

export const router = createRouter({
    history: createMemoryHistory(),
    routes: appRoutes,
});
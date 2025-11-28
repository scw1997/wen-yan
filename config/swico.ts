//swico 公共自定义配置

import { defineConfig } from 'swico/vue';

export default defineConfig('base', {
    template: 'vue',
    publicPath: '/wen-yan/',
    router: {
        type: 'browser',
        base: '/wen-yan/',
        routes: [
            {
                path: '/',
                name: 'index',
                component: 'Index'
            },
            {
                path: '/timeline',
                name: 'timeline',
                component: 'Timeline'
            },
            {
                path: '/album',
                name: 'album',
                component: 'Album'
            },
            {
                path: '/diary',
                name: 'diary',
                component: 'Diary'
            }
        ]
    }
});

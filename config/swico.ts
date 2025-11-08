//swico 公共自定义配置

import { defineConfig } from 'swico';

export default defineConfig('base', {
    template: 'vue',
    publicPath:'/wen-yan',
    router: {
        type: 'browser',
        base: '/wen-yan',
        routes: [
            {
                path: '/',
                name: 'index',
                component: 'Index'
            }
        ]
    }
});

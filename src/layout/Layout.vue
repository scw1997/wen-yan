<script setup lang="ts">
import { Outlet, Link, useNav, history } from 'swico/vue';
import { Heart, Home, Book, History, Images } from '@vicons/fa';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import BgmPlayer from '@/components/BgmPlayer.vue';
import { debounce } from '@/utils';
const nav = useNav();
const globalRootHeight = ref(window.innerHeight);
const nameRef = ref('');
const navOptions = [
    {
        name: 'index',
        title: '首页',
        icon: Home,
        iconClass: 'icon-home'
    },
    {
        name: 'timeline',
        title: '时光轴',
        icon: History,
        iconClass: 'icon-history'
    },
    {
        name: 'album',
        title: '光影室',
        icon: Images,
        iconClass: 'icon-images'
    },
    {
        name: 'diary',
        title: '记事本',
        icon: Book,
        iconClass: 'icon-book'
    }
];

watch(
    () => history.location.name,
    (name) => {
        nameRef.value = name;
    }
);

const handleGlobalHeight = debounce(() => {
    //先动态修改内容高度的变量
    globalRootHeight.value = window.innerHeight;
}, 100);

const handleThemeChange = () => {
    const globalLayoutEle = document.getElementById('global-layout-root');
    const curMonth = new Date().getMonth() + 1;
    switch (true) {
        case curMonth >= 3 && curMonth <= 5:
            globalLayoutEle.classList.add('spring');
            break;
        case curMonth >= 6 && curMonth <= 8:
            globalLayoutEle.classList.add('summer');
            break;
        case curMonth >= 9 && curMonth <= 11:
            globalLayoutEle.classList.add('autumn');
            break;
        case curMonth >= 12 && curMonth <= 2:
            globalLayoutEle.classList.add('winter');
            break;
    }
};
onMounted(() => {
    // 处理全局落叶的动画效果，保证能在global-content容器内部完整展示
    handleGlobalHeight();
    //处理全局四季主题
    handleThemeChange();
    //监听窗口变化同步处理
    window.addEventListener('resize', handleGlobalHeight);
});
onUnmounted(() => {
    window.removeEventListener('resize', handleGlobalHeight);
});
</script>

<template>
    <div id="global-layout-root" class="global-layout-root" :style="`height:${globalRootHeight}px`">
        <BgmPlayer />
        <header class="global-header global-container">
            <span class="global-title">
                <span class="title-text">传</span>
                <Heart class="icon-heart" />
                <span class="title-text">燕</span>
            </span>
            <nav class="global-nav">
                <Link
                    v-for="{ name, title, icon, iconClass } in navOptions"
                    :key="name"
                    :class="`cp global-nav-item ${nameRef === name ? 'active' : ''}`"
                    :to="{ name }"
                >
                    <component :is="icon" :class="iconClass" />
                    {{ title }}
                </Link>
            </nav>
        </header>
        <main id="global-content" class="global-content">
            <!-- 全体路由在此渲染 -->
            <Outlet />
        </main>
        <!-- 新增底部 -->
        <footer class="global-footer">
            <div class="footer-content">
                <p>© 2025 - present | 我在呢，一直都在呢...</p>
            </div>
        </footer>
    </div>
</template>

<style scoped lang="less">
.global-layout-root {
    --leaf-green: #8fbc8f;
    width: 100vw;
    overflow: auto;
    background: linear-gradient(
        135deg,
        var(--theme-bg-main-color) 0%,
        var(--theme-bg-secondary-color) 100%
    );
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    &.spring {
        --theme-main-color: #63d76c;
        --theme-secondary-color: #1ca02d;
        --theme-text-color: #287e4ad9;
        --theme-bg-main-color: #c4e9d240;
        --theme-bg-secondary-color: #1fb946;
    }
    .summer {
        --theme-main-color: #ffb66a;
        --theme-secondary-color: #ff6b6b;

        --theme-text-color: #8b4513;
        --theme-bg-main-color: #8b4513;
        --theme-bg-secondary-color: #ffdab9;
    }
    .autumn {
        --theme-main-color: #ffb66a;
        --theme-secondary-color: #ff6b6b;
        --theme-text-color: #8b4513;
        --theme-bg-main-color: #8b4513;
        --theme-bg-secondary-color: #ffdab9;
    }
    .winter {
        --theme-main-color: #ffb66a;
        --theme-secondary-color: #ff6b6b;
        --theme-text-color: #8b4513;
        --theme-bg-main-color: #8b4513;
        --theme-bg-secondary-color: #ffdab9;
    }
    .global-container {
        max-width: 1200px;
        display: flex;
        justify-content: center;
        align-items: center;
        @media (max-width: 1200px) {
            width: 100%;
        }
    }

    .global-header {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        &.global-container {
            padding: 20px 16px;
            justify-content: space-between;
            .global-title {
                flex: none;
                flex-wrap: wrap;
                font-size: 36px;
                color: var(--theme-main-color);
                display: flex;
                align-items: center;
                text-shadow: 2px 2px 4px rgba(139, 69, 19, 0.3);

                .title-text {
                    font-weight: bold;
                }
                .icon-heart {
                    color: #ff6b6b;
                    width: 36px;
                    height: 36px;
                    margin: 0 8px;
                }
            }
            .global-nav {
                flex: none;
                display: flex;
                align-items: center;
                font-size: 22px;
                justify-content: center;
                flex-wrap: wrap;
                .global-nav-item {
                    padding: 8px 12px;
                    border-radius: 8px;
                    text-decoration: none;
                    color: var(--theme-text-color);
                    font-weight: bold;
                    transition: all 0.3s ease;
                    margin-left: 14px;
                    display: flex;
                    align-items: center;
                    background: rgba(255, 250, 236, 0.5);
                    box-shadow: 0 2px 5px rgba(139, 69, 19, 0.1);
                    &:hover {
                        //background: var(--theme-main-color);
                        //color: white;
                        //transform: translateY(-5px);
                        box-shadow: 0 8px 15px rgba(139, 69, 19, 0.3);
                    }
                    &.active {
                        background: var(--theme-main-color);
                        color: white;
                    }
                }
            }
        }
    }

    .global-content {
        --global-content-height: 100vh;
        flex: 1;
        width: 100%;
        height: max-content;
        position: relative;
    }

    .global-footer {
        width: 100%;
        padding: 10px;
        background: rgba(139, 69, 19, 0.1);
        text-align: center;
        .footer-content {
            max-width: 1200px;
            margin: 0 auto;
            color: var(--theme-text-color);
            font-weight: bold;
            font-size: 16px;
        }
    }
}
</style>

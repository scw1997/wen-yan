<script setup lang="ts">
import { Outlet, Link, useLocation, history } from 'swico/vue';
import { Heart, Home, Book, History, Images } from '@vicons/fa';
import { onMounted, ref, watch } from 'vue';
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
        // console.log('name', name);
        nameRef.value = name;
    }
);
</script>

<template>
    <div class="global-layout-root">
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
    height: 100vh;
    width: 100vw;
    overflow: auto;
    background: linear-gradient(135deg, var(--cream) 0%, var(--light-orange) 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
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
                color: var(--autumn-yellow);
                display: flex;
                align-items: center;
                text-shadow: 2px 2px 4px rgba(139, 69, 19, 0.3);

                .title-text {
                    font-weight: bold;
                }
                .icon-heart {
                    color: var(--autumn-red);
                    width: 36px;
                    height: 36px;
                    margin: 0 8px;
                }
            }
            .global-nav {
                flex: none;
                display: flex;
                align-items: center;
                font-size: 20px;
                justify-content: center;
                flex-wrap: wrap;
                .global-nav-item {
                    padding: 8px 15px;
                    border-radius: 8px;
                    text-decoration: none;
                    color: var(--autumn-brown);
                    font-weight: bold;
                    transition: all 0.3s ease;
                    margin-left: 14px;
                    display: flex;
                    align-items: center;
                    background: rgba(255, 250, 236, 0.5);
                    box-shadow: 0 2px 5px rgba(139, 69, 19, 0.1);
                    &:hover {
                        //background: var(--autumn-yellow);
                        //color: white;
                        transform: translateY(-5px);
                        box-shadow: 0 8px 15px rgba(139, 69, 19, 0.3);
                    }
                    &.active {
                        background: var(--autumn-yellow);
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
            color: var(--autumn-brown);
            font-weight: bold;
            font-size: 16px;
        }
    }
}
</style>

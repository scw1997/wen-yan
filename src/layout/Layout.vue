<script setup lang="ts">
import { Outlet, Link, useLocation, history } from 'swico/vue';
import { Heart, Home, Book, History, Images } from '@vicons/fa';
import { onMounted, ref, toRef, watch } from 'vue';
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
        title: '相册',
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
        <header class="global-header">
            <div class="global-container">
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
            </div>
        </header>
        <main class="global-content">
            <section class="global-leaves-container">
                <section class="global-leaves">
                    <div class="leaf leaf-1">🍁</div>
                    <div class="leaf leaf-2">🍂</div>
                    <div class="leaf leaf-3">🍁</div>
                    <div class="leaf leaf-4">🍂</div>
                    <div class="leaf leaf-5">🍁</div>
                    <div class="leaf leaf-6">🍂</div>
                    <div class="leaf leaf-7">🍁</div>
                    <div class="leaf leaf-8">🍂</div>
                    <div class="leaf leaf-9">🍁</div>
                    <div class="leaf leaf-10">🍂</div>
                    <div class="leaf leaf-11">🍁</div>
                    <div class="leaf leaf-12">🍂</div>
                </section>
            </section>

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
        width: 1200px;
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
        padding: 0 10px;
        .global-container {
            padding: 30px 20px;
            justify-content: space-between;
            //border-bottom: 3px solid var(--autumn-yellow);

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
                    margin: 0 12px;
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
                    margin-left: 20px;
                    display: flex;
                    align-items: center;
                    background: rgba(255, 250, 236, 0.5);
                    box-shadow: 0 2px 5px rgba(139, 69, 19, 0.1);
                    &:hover {
                        background: var(--autumn-yellow);
                        color: white;
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
        padding: 10px 0;
        flex: 1;
        width: 100%;
        height: max-content;
        position: relative;
        .global-leaves-container {
            position: absolute;
            height: 100%;
            width: 100%;
            z-index: 3;
            overflow: hidden;
            .global-leaves {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 1;

                .leaf {
                    position: absolute;
                    font-size: 36px;
                    top: -50px;
                    opacity: 0.7;

                    &.leaf-1 {
                        left: 5%;
                        animation: falling 12s linear infinite;
                        animation-delay: 0s;
                    }

                    &.leaf-2 {
                        left: 15%;
                        animation: falling 10s linear infinite;
                        animation-delay: 2s;
                    }

                    &.leaf-3 {
                        left: 25%;
                        animation: falling 15s linear infinite;
                        animation-delay: 1s;
                    }

                    &.leaf-4 {
                        left: 35%;
                        animation: falling 8s linear infinite;
                        animation-delay: 3s;
                    }

                    &.leaf-5 {
                        left: 45%;
                        animation: falling 13s linear infinite;
                        animation-delay: 0s;
                    }

                    &.leaf-6 {
                        left: 55%;
                        animation: falling 11s linear infinite;
                        animation-delay: 4s;
                    }

                    &.leaf-7 {
                        left: 65%;
                        animation: falling 9s linear infinite;
                        animation-delay: 2s;
                    }

                    &.leaf-8 {
                        left: 75%;
                        animation: falling 14s linear infinite;
                        animation-delay: 1s;
                    }

                    &.leaf-9 {
                        left: 85%;
                        animation: falling 10s linear infinite;
                        animation-delay: 5s;
                    }

                    &.leaf-10 {
                        left: 95%;
                        animation: falling 12s linear infinite;
                        animation-delay: 3s;
                    }

                    &.leaf-11 {
                        left: 10%;
                        animation: falling 11s linear infinite;
                        animation-delay: 6s;
                    }

                    &.leaf-12 {
                        left: 40%;
                        animation: falling 13s linear infinite;
                        animation-delay: 7s;
                    }
                }
            }
        }
    }

    .global-footer {
        width: 100%;
        padding: 20px;
        background: rgba(139, 69, 19, 0.1);
        text-align: center;
        .footer-content {
            max-width: 1200px;
            margin: 0 auto;
            color: var(--autumn-brown);
            font-weight: bold;
            font-size: 20px;
        }
    }

    @keyframes falling {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.7;
        }

        100% {
            transform: translateY(999px) rotate(360deg);
            opacity: 0.3;
        }
    }
}
</style>

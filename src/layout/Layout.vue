<script setup lang="ts">
import { Outlet, Link } from 'swico/vue';
import { Heart, Home, Book, History, Images } from '@vicons/fa';
</script>

<template>
    <div class="global-layout-root">
        <!--        <section class="global-leaf">-->
        <!--            &lt;!&ndash; 落叶动画 &ndash;&gt;-->
        <!--            <div class="leaf leaf-1">🍂</div>-->
        <!--            <div class="leaf leaf-2">🍂</div>-->
        <!--            <div class="leaf leaf-3">🍁</div>-->
        <!--            <div class="leaf leaf-4">🍁</div>-->
        <!--        </section>-->
        <header class="global-header">
            <div class="global-container">
                <span class="global-title">
                    <span class="title-text">传</span>
                    <Heart class="icon-heart" />
                    <span class="title-text">燕</span>
                </span>
                <nav class="global-nav">
                    <Link class="cp global-nav-item" :to="{ name: 'index' }">
                        <Home class="icon-home" />
                        首页
                    </Link>
                    <Link class="cp global-nav-item" :to="{ name: 'index' }">
                        <History class="icon-history" />
                        时光轴
                    </Link>
                    <Link class="cp global-nav-item" :to="{ name: 'index' }">
                        <Images class="icon-images" />
                        相片册
                    </Link>
                    <Link class="cp global-nav-item" :to="{ name: 'index' }">
                        <Book class="icon-book" />
                        记事本
                    </Link>
                </nav>
            </div>
        </header>
        <main class="global-content">
            <!-- 全体路由在此渲染 -->
            <Outlet />
        </main>
        <!-- 新增底部 -->
        <footer class="global-footer">
            <div class="footer-content">
                <p>© 2025 | 我在呢，一直都在呢...</p>
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
                    &:active {
                        transform: translateY(-2px);
                    }
                }
            }
        }
    }

    .global-content {
        padding: 10px 0;
        flex: 1;
        width: 100%;
    }
    .global-leaf {
        @keyframes float {
            0% {
                transform: translateY(0px) rotate(0deg);
            }
            50% {
                transform: translateY(-20px) rotate(10deg);
            }
            100% {
                transform: translateY(0px) rotate(0deg);
            }
        }
        @keyframes fall {
            0% {
                transform: translateY(-60px) rotate(0deg);
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
            }
        }
        .leaf {
            position: fixed;
            font-size: 40px;
            opacity: 0.7;
            //z-index: -1;
        }

        .leaf {
            animation: fall 15s linear infinite;
        }

        .leaf-1 {
            top: -60px;
            left: 20%;
            animation-delay: 0s;
        }

        .leaf-2 {
            top: -60px;
            right: 30%;
            animation-delay: 3s;
        }

        .leaf-3 {
            top: -60px;
            left: 30%;
            animation-delay: 6s;
        }

        .leaf-4 {
            top: -60px;
            right: 20%;
            animation-delay: 9s;
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
}
</style>

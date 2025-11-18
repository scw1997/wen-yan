<script setup lang="ts">
import { Outlet, Link } from 'swico';
import { Heart, Home, Book, History, Images } from '@vicons/fa';
</script>

<template>
    <div class="global-layout-root">
        <div class="global-layout-container">
            <header class="global-header">
                <div class="global-header-container">
                    <span class="global-title">
                        <span class="title-text">文</span>
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
            <section class="global-leaf">
                <!-- 落叶动画 -->
                <div class="leaf leaf-1">🍂</div>
                <div class="leaf leaf-2">🍁</div>
                <div class="leaf leaf-3">🍂</div>
                <div class="leaf leaf-4">🍁</div>
                <!-- 新增花瓣 -->
                <div class="petal petal-1">🌸</div>
                <div class="petal petal-2">🌺</div>
                <div class="petal petal-3">🌼</div>
            </section>
            <!-- 全体路由在此渲染 -->
            <Outlet />
        </div>
        <!-- 新增底部 -->
        <footer class="global-footer">
            <div class="footer-content">
                <p>© 2025 文燕情侣博客 | 用心记录我们的美好时光</p>
            </div>
        </footer>
    </div>
</template>

<style scoped lang="less">
.global-layout-root {
    min-height: 100vh;
    width: 100vw;
    overflow: auto;
    background: linear-gradient(135deg, var(--cream) 0%, var(--light-orange) 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    .global-layout-container {
        flex: 1;
        width: 100%;
        max-width: 1200px;
        .global-header {
            padding: 40px 20px 20px;
            .global-header-container {
                padding: 0 10px 20px 10px;
                border-bottom: 3px solid var(--autumn-yellow);
                display: flex;
                align-items: center;
                justify-content: space-between;

                .global-title {
                    font-size: 36px;
                    color: var(--autumn-yellow);
                    display: flex;
                    align-items: center;
                    text-shadow: 2px 2px 4px rgba(139, 69, 19, 0.3);
                    .title-text {
                        font-weight: bold;
                        animation: heartbeat 2s infinite;
                        &:nth-child(1) {
                            animation-delay: 0.2s;
                        }
                        &:nth-child(3) {
                            animation-delay: 0.4s;
                        }
                    }
                    .icon-heart {
                        color: var(--autumn-red);
                        width: 36px;
                        height: 36px;
                        margin: 0 12px;
                        animation: heartbeat 1.5s infinite;
                    }
                }
                .global-nav {
                    display: flex;
                    align-items: center;
                    font-size: 20px;
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
            padding: 10px;
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
                    transform: translateY(-50px) rotate(0deg);
                }
                100% {
                    transform: translateY(100vh) rotate(360deg);
                }
            }
            @keyframes heartbeat {
                0% {
                    transform: scale(1);
                }
                5% {
                    transform: scale(1.1);
                }
                10% {
                    transform: scale(1);
                }
                15% {
                    transform: scale(1.1);
                }
                20% {
                    transform: scale(1);
                }
                100% {
                    transform: scale(1);
                }
            }
            .leaf, .petal {
                position: fixed;
                font-size: 40px;
                opacity: 0.7;
                z-index: -1;
            }

            .leaf {
                animation: float 5s ease-in-out infinite;
            }

            .petal {
                animation: fall 15s linear infinite;
            }

            .leaf-1 {
                top: 10%;
                left: 5%;
                color: var(--leaf-green);
                animation-delay: 0s;
            }

            .leaf-2 {
                top: 20%;
                right: 10%;
                color: var(--autumn-yellow);
                animation-delay: 1s;
            }

            .leaf-3 {
                bottom: 15%;
                left: 15%;
                color: var(--autumn-red);
                animation-delay: 2s;
            }

            .leaf-4 {
                bottom: 5%;
                right: 5%;
                color: var(--leaf-green);
                animation-delay: 3s;
            }

            .petal-1 {
                top: -50px;
                left: 20%;
                color: #ffafcc;
                animation-delay: 0s;
            }

            .petal-2 {
                top: -50px;
                right: 30%;
                color: #ffc8dd;
                animation-delay: 5s;
            }

            .petal-3 {
                top: -50px;
                left: 70%;
                color: #ffb6c1;
                animation-delay: 10s;
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
        }
    }
}

// 响应式设计
@media (max-width: 768px) {
    .global-layout-root {
        .global-layout-container {
            .global-header {
                padding: 20px 10px 10px;
                .global-header-container {
                    flex-direction: column;
                    .global-title {
                        font-size: 28px;
                        margin-bottom: 15px;
                        .icon-heart {
                            width: 28px;
                            height: 28px;
                        }
                    }
                    .global-nav {
                        font-size: 16px;
                        .global-nav-item {
                            padding: 6px 10px;
                            margin-left: 10px;
                        }
                    }
                }
            }
        }
    }
}

@media (max-width: 480px) {
    .global-layout-root {
        .global-layout-container {
            .global-header {
                .global-header-container {
                    .global-nav {
                        flex-wrap: wrap;
                        justify-content: center;
                        .global-nav-item {
                            margin: 5px;
                        }
                    }
                }
            }
        }
    }
}
<script setup lang="ts">
import { Outlet, Link } from 'swico';
import { Heart, Home } from '@vicons/fa';
</script>

<template>
    <div class="global-layout-root">
        <div class="global-layout-container">
            <header class="global-header">
                <span class="global-title">
                    文
                    <Heart class="icon-heart" />
                    燕
                </span>
                <nav class="global-nav">
                    <Link class="cp global-nav-item" :to="{ name: 'index' }">
                        <Home class="icon-home" />
                        首页
                    </Link>
                    <Link class="cp global-nav-item" :to="{ name: 'index' }">时光轴</Link>
                    <Link class="cp global-nav-item" :to="{ name: 'index' }">相片册</Link>
                    <Link class="cp global-nav-item" :to="{ name: 'index' }">记事本</Link>
                </nav>
            </header>
            <!-- 全体路由在此渲染 -->
            <Outlet />
        </div>
    </div>
</template>

<style scoped lang="less">
.global-layout-root {
    height: 100vh;
    width: 100vw;
    overflow: auto;
    background: linear-gradient(135deg, var(--cream) 0%, var(--light-orange) 100%);
    display: flex;
    justify-content: center;
    .global-layout-container {
        width: 1200px;
        .global-header {
            padding: 40px 10px 20px 10px;
            border-bottom: 3px solid var(--autumn-yellow);
            display: flex;
            align-items: center;
            justify-content: space-between;
            .global-title {
                font-size: 30px;
                color: var(--autumn-yellow);
                display: flex;
                align-items: center;
                text-shadow: 2px 2px 4px rgba(139, 69, 19, 0.3);
                .icon-heart {
                    color: var(--autumn-red);
                    width: 30px;
                    height: 30px;
                    margin: 0 8px;
                }
            }
            .global-nav {
                display: flex;
                align-items: center;
                font-size: 20px;
                .global-nav-item {
                    padding: 5px 10px;
                    border-radius: 5px;
                    text-decoration: none;
                    color: var(--autumn-brown);
                    font-weight: bold;
                    transition: all 0.3s ease;
                    margin-left: 20px;
                    &:hover {
                        background: var(--autumn-yellow);
                        color: white;
                        transform: translateY(-3px);
                        box-shadow: 0 5px 15px rgba(139, 69, 19, 0.2);
                    }
                }
            }
        }
    }
}
</style>

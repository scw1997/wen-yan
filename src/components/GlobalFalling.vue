<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
    // 处理全局落叶的动画效果，保证能在global-content容器内部完整展示
    setTimeout(() => {
        //先动态修改内容高度的变量
        const globalContentEle = document.getElementById('global-content');
        const height = globalContentEle.clientHeight;
        globalContentEle.style.setProperty('--global-content-height', height + 'px');

        //根据global-content容器内容高度控制落叶下落速率基本不变
        const globalLeavesEle = document.getElementById('global-leaves');
        globalLeavesEle.style.setProperty(
            '--leaf-fall-duration',
            (height > 700 ? (height - 700) / 100 : '0') + 's'
        );

        document.querySelectorAll('.leaf').forEach((item) => {
            // @ts-ignore
            item.style.animationName = 'falling';
        });
    }, 500);
});
</script>

<template>
    <section class="global-leaves-container">
        <section id="global-leaves" class="global-leaves">
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
</template>

<style scoped lang="less">
.global-leaves-container {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 3;
    left: 0;
    top: 0;
    overflow: hidden;

    .global-leaves {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        --leaf-fall-duration: 0s;
        .leaf {
            position: absolute;
            font-size: 36px;
            top: -50px;
            opacity: 0.7;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
            &.leaf-1 {
                animation-duration: calc(12s + var(--leaf-fall-duration));
                left: 5%;
                animation-delay: 0s;
            }

            &.leaf-2 {
                animation-duration: calc(10s + var(--leaf-fall-duration));
                left: 15%;
                animation-delay: 2s;
            }

            &.leaf-3 {
                animation-duration: calc(7s + var(--leaf-fall-duration));
                left: 25%;
                animation-delay: 1s;
            }

            &.leaf-4 {
                animation-duration: calc(8s + var(--leaf-fall-duration));
                left: 35%;
                animation-delay: 3s;
            }

            &.leaf-5 {
                animation-duration: calc(13s + var(--leaf-fall-duration));
                left: 45%;
                animation-delay: 0s;
            }

            &.leaf-6 {
                animation-duration: calc(11s + var(--leaf-fall-duration));
                left: 55%;
                animation-delay: 4s;
            }

            &.leaf-7 {
                animation-duration: calc(9s + var(--leaf-fall-duration));
                left: 65%;
                animation-delay: 2s;
            }

            &.leaf-8 {
                animation-duration: calc(14s + var(--leaf-fall-duration));
                left: 75%;
                animation-delay: 1s;
            }

            &.leaf-9 {
                animation-duration: calc(10s + var(--leaf-fall-duration));
                left: 85%;
                animation-delay: 5s;
            }

            &.leaf-10 {
                animation-duration: calc(12s + var(--leaf-fall-duration));
                left: 95%;
                animation-delay: 3s;
            }

            &.leaf-11 {
                animation-duration: calc(11s + var(--leaf-fall-duration));
                left: 10%;
                animation-delay: 6s;
            }

            &.leaf-12 {
                animation-duration: calc(13s + var(--leaf-fall-duration));
                left: 40%;
                animation-delay: 7s;
            }
        }
    }
}
</style>

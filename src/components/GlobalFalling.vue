<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { debounce } from '@/utils';

const season = ref<'spring' | 'summer' | 'autumn' | 'winter'>(null);

const handleFallingAnimation = debounce(() => {
    //先动态修改内容高度的变量
    const globalContentEle = document.getElementById('global-content');
    const height = globalContentEle?.scrollHeight || 0;
    globalContentEle?.style.setProperty('--global-content-height', height + 50 + 'px');

    //根据global-content容器内容高度控制落叶下落速率基本不变
    const globalLeavesEle = document.getElementById('global-leaves');
    globalLeavesEle?.style.setProperty(
        '--leaf-fall-duration',
        (height > 700 ? (height - 700) / 100 : '0') + 's'
    );

    document.querySelectorAll('.leaf').forEach((item) => {
        // @ts-ignore
        item.style.animationName = 'falling';
    });
}, 1000);

const handleSeasonChange = () => {
    const curMonth = new Date().getMonth() + 1;
    // const curMonth = 8;
    if (curMonth >= 3 && curMonth <= 5) {
        season.value = 'spring';
    } else if (curMonth >= 6 && curMonth <= 8) {
        season.value = 'summer';
    } else if (curMonth >= 9 && curMonth <= 11) {
        season.value = 'autumn';
    } else {
        season.value = 'winter';
    }
};

onMounted(() => {
    // 处理全局落叶的动画效果，保证能在global-content容器内部完整展示
    setTimeout(() => {
        handleSeasonChange();
        handleFallingAnimation();
        //监听窗口变化同步处理
        window.addEventListener('resize', handleFallingAnimation);
    }, 500);
});
onUnmounted(() => {
    window.removeEventListener('resize', handleFallingAnimation);
});
</script>

<template>
    <section class="global-leaves-container">
        <section id="global-leaves" class="global-leaves">
            <div
                v-for="(item, index) in Array.from({ length: 12 }, (_, i) => i + 1)"
                :key="index"
                :class="`leaf leaf-${item}`"
            >
                <div v-if="season === 'spring'">🌸</div>
                <div v-if="season === 'summer'">🌞</div>
                <div v-if="season === 'autumn'">🍁</div>
                <div v-if="season === 'winter'" style="color: #718bac">❄</div>
            </div>
        </section>
    </section>
</template>

<style scoped lang="less">
.global-leaves-container {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 0;
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
                animation-delay: 1s;
            }

            &.leaf-2 {
                animation-duration: calc(10s + var(--leaf-fall-duration));
                left: 15%;
                animation-delay: 4s;
            }

            &.leaf-3 {
                animation-duration: calc(7s + var(--leaf-fall-duration));
                left: 25%;
                animation-delay: 2s;
            }

            &.leaf-4 {
                animation-duration: calc(8s + var(--leaf-fall-duration));
                left: 35%;
                animation-delay: 6s;
            }

            &.leaf-5 {
                animation-duration: calc(13s + var(--leaf-fall-duration));
                left: 45%;
                animation-delay: 0s;
            }

            &.leaf-6 {
                animation-duration: calc(11s + var(--leaf-fall-duration));
                left: 55%;
                animation-delay: 8s;
            }

            &.leaf-7 {
                animation-duration: calc(9s + var(--leaf-fall-duration));
                left: 65%;
                animation-delay: 5s;
            }

            &.leaf-8 {
                animation-duration: calc(14s + var(--leaf-fall-duration));
                left: 75%;
                animation-delay: 2s;
            }

            &.leaf-9 {
                animation-duration: calc(10s + var(--leaf-fall-duration));
                left: 85%;
                animation-delay: 10s;
            }

            &.leaf-10 {
                animation-duration: calc(12s + var(--leaf-fall-duration));
                left: 95%;
                animation-delay: 7s;
            }

            &.leaf-11 {
                animation-duration: calc(11s + var(--leaf-fall-duration));
                left: 10%;
                animation-delay: 12s;
            }

            &.leaf-12 {
                animation-duration: calc(13s + var(--leaf-fall-duration));
                left: 40%;
                animation-delay: 14s;
            }
        }
    }
}
</style>

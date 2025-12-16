<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import GlobalFalling from '@/components/GlobalFalling.vue';
import { Link } from 'swico/vue';
const timeTogether = ref('0天0小时0分钟0秒');
const currentMonthImage = ref('');
let intervalId: number | null = null;
const startDate = new Date('2025-09-04T22:00:00'); // 这里设置你们开始的日期

// 设置当前月份图片
function setCurrentMonthImage() {
    const month = new Date().getMonth() + 1; // getMonth() 返回 0-11，所以需要 +1
    currentMonthImage.value = `${SWICO_STATIC_PUBLIC_PATH}logoPhotoList/${month}.png`;
}

onMounted(() => {
    setCurrentMonthImage();
    updateTime();
    intervalId = window.setInterval(updateTime, 1000);
});

onUnmounted(() => {
    if (intervalId) {
        clearInterval(intervalId);
    }
});

function updateTime() {
    const now = new Date();
    const diff = now.getTime() - startDate.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    timeTogether.value = `${days}天${hours}小时${minutes}分钟${seconds}秒`;
}
</script>

<template>
    <GlobalFalling />

    <div class="home-container">
        <!-- Cartoon maple trees on both sides -->
        <div class="trees-container">
            <!-- Left tree -->
            <div class="tree tree-left">
                <div class="leaves-cluster cluster-1"></div>
                <div class="leaves-cluster cluster-2"></div>
                <div class="leaves-cluster cluster-3"></div>
                <div class="leaves-cluster cluster-4"></div>
                <div class="tree-trunk"></div>
            </div>

            <!-- Right tree -->
            <div class="tree tree-right">
                <div class="leaves-cluster cluster-1"></div>
                <div class="leaves-cluster cluster-2"></div>
                <div class="leaves-cluster cluster-3"></div>
                <div class="leaves-cluster cluster-4"></div>
                <div class="tree-trunk"></div>
            </div>
        </div>

        <!-- Main content -->
        <div class="content-wrapper">
            <div class="photo-frame">
                <div class="photo-placeholder">
                    <img :src="currentMonthImage" alt="Monthly Photo" class="photo" />
                </div>
            </div>
            <div class="poem-line">🌹两人四季，不问前路🌹</div>
            <div class="poem-line">🌻与你所至，皆是旅途🌻</div>
            <div class="time-display">
                <h2>我们已经一起走过了</h2>
                <div class="time-counter">{{ timeTogether }}</div>
            </div>
            <div class="future-message">余生很短，只争朝夕</div>
        </div>
    </div>
</template>

<style scoped lang="less">
.home-container {
    position: relative;
    height: 100%;
    width: 100%;

    .trees-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 2;

        .tree {
            position: absolute;
            bottom: 0;

            &.tree-left {
                left: 30px;
            }

            &.tree-right {
                right: 150px;
            }

            .leaves-cluster {
                position: absolute;
                background-color: var(--autumn-red);
                border-radius: 50%;
                box-shadow:
                    inset -5px -5px 10px rgba(0, 0, 0, 0.1),
                    inset 3px 3px 5px rgba(255, 255, 255, 0.2);

                &.cluster-1 {
                    width: 100px;
                    height: 100px;
                    top: -180px;
                    left: -30px;
                    background-color: var(--autumn-red);
                }

                &.cluster-2 {
                    width: 120px;
                    height: 120px;
                    top: -150px;
                    left: 20px;
                    background-color: var(--autumn-yellow);
                }

                &.cluster-3 {
                    width: 90px;
                    height: 90px;
                    top: -120px;
                    left: 60px;
                    background-color: var(--autumn-red);
                }

                &.cluster-4 {
                    width: 70px;
                    height: 70px;
                    top: -160px;
                    left: 70px;
                    background-color: var(--autumn-yellow);
                }
            }

            .tree-trunk {
                position: absolute;
                width: 25px;
                height: 200px;
                background: var(--autumn-brown);
                top: -200px;
                left: 45px;
                border-radius: 5px;
                box-shadow:
                    inset -3px 0 5px rgba(0, 0, 0, 0.2),
                    inset 2px 0 3px rgba(255, 255, 255, 0.1);
            }
        }
    }

    .content-wrapper {
        position: relative;
        z-index: 3;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        padding: 20px;

        .photo-frame {
            margin-bottom: 40px;
            animation: pulse 2s infinite;

            .photo-placeholder {
                width: 280px;
                height: 280px;
                border-radius: 50%;
                background-size: cover;
                background-position: center;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 10px 25px rgba(139, 69, 19, 0.3);
                border: 5px solid white;
                overflow: hidden;

                .photo {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
        }
        .poem-line {
            font-family: '楷体', 'KaiTi', serif;
            font-size: 24px;
            color: var(--autumn-brown);
            margin-bottom: 20px;
            text-align: center;
            font-weight: bold;
            letter-spacing: 2px;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
        }
        .time-display {
            text-align: center;
            background: rgba(255, 250, 236, 0.8);
            padding: 25px 40px;
            border-radius: 20px;
            box-shadow: 0 8px 20px rgba(139, 69, 19, 0.2);

            h2 {
                color: var(--autumn-brown);
                font-size: 24px;
                margin-bottom: 15px;
                font-weight: bold;
            }

            .time-counter {
                font-size: 28px;
                font-weight: bold;
                color: var(--autumn-red);
                text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
            }
        }

        .future-message {
            font-family: '微软雅黑', 'Microsoft YaHei', sans-serif;
            font-size: 20px;
            color: var(--autumn-brown);
            text-align: center;
            margin-top: 20px;
            animation: fadeInOut 3s ease-in-out infinite;
            font-style: italic;
        }
    }
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.05);
    }

    100% {
        transform: scale(1);
    }
}

@keyframes fadeInOut {
    0%,
    100% {
        opacity: 0.3;
    }

    50% {
        opacity: 1;
    }
}
</style>

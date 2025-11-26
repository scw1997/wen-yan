<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const timeTogether = ref('0天0小时0分钟0秒');
let intervalId: number | null = null;
const startDate = new Date('2025-09-04T22:00:00'); // 这里设置你们开始的日期

onMounted(() => {
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
    <div class="home-container">
        <!-- Falling leaves in background -->
        <div class="leaves-container">
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
        </div>

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
                    <!-- Couple photo would go here -->
                    <div class="couple-initials">❤️</div>
                </div>
            </div>

            <div class="time-display">
                <h2>我们已经一起走过了</h2>
                <div class="time-counter">{{ timeTogether }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.home-container {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
    background: linear-gradient(135deg, var(--cream) 0%, var(--light-orange) 100%);

    .leaves-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;

        .leaf {
            position: absolute;
            font-size: 30px;
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
                width: 200px;
                height: 200px;
                border-radius: 50%;
                background: linear-gradient(45deg, var(--autumn-yellow), var(--autumn-red));
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 10px 25px rgba(139, 69, 19, 0.3);
                border: 5px solid white;

                .couple-initials {
                    font-size: 60px;
                }
            }
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
    }
}

@keyframes falling {
    0% {
        transform: translateY(0) rotate(0deg);
        opacity: 0.7;
    }

    100% {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0.3;
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
</style>

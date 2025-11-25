<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

// 设置相识日期和在一起的日期（请根据实际情况修改）
const meetDate = new Date('2020-09-01'); // 相识日期
const loveDate = new Date('2021-05-20'); // 在一起日期

// 计算相识天数
const daysSinceMeet = ref(0);
// 计算在一起天数
const daysSinceLove = ref(0);

// 格式化日期显示
const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}.${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')}`;
};

// 更新天数计算
const updateDays = () => {
    const today = new Date();
    daysSinceMeet.value = Math.floor(
        (today.getTime() - meetDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    daysSinceLove.value = Math.floor(
        (today.getTime() - loveDate.getTime()) / (1000 * 60 * 60 * 24)
    );
};

onMounted(() => {
    updateDays();
    // 每小时更新一次天数
    setInterval(updateDays, 3600000);
});

// 相识信息
const meetInfo = computed(() => ({
    date: formatDate(meetDate),
    days: daysSinceMeet.value
}));

// 恋爱信息
const loveInfo = computed(() => ({
    date: formatDate(loveDate),
    days: daysSinceLove.value
}));
</script>

<template>
    <div class="home-container">
        <!-- 背景蒙层 -->
        <div class="background-overlay"></div>

        <div class="container-wrapper">
            <div class="photo-section">
                <div class="photo-placeholder">
                    <!-- 这里放置你们的合照 -->
                    <img src="" alt="我们的合照" class="couple-photo" />
                    <div class="photo-text">Our Moments</div>
                </div>
            </div>

            <div class="timeline-section">
                <div class="timeline-item">
                    <div class="date">{{ meetInfo.date }}</div>
                    <div class="event">初次相遇</div>
                    <div class="days">{{ meetInfo.days }} days</div>
                </div>

                <div class="timeline-item">
                    <div class="date">{{ loveInfo.date }}</div>
                    <div class="event">在一起</div>
                    <div class="days">{{ loveInfo.days }} days</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.home-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100%;
    padding: 20px 10px;
    position: relative;
    overflow: hidden;

    // 背景蒙层
    .background-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background:
            radial-gradient(circle at 10% 20%, rgba(255, 182, 106, 0.15) 0%, transparent 20%),
            radial-gradient(circle at 90% 80%, rgba(255, 107, 107, 0.15) 0%, transparent 20%),
            radial-gradient(circle at 50% 30%, rgba(143, 188, 143, 0.1) 0%, transparent 30%);
        z-index: -1;
    }

    .container-wrapper {
        max-width: 1200px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;

        .photo-section {
            margin-bottom: 40px;

            .photo-placeholder {
                position: relative;
                width: 220px;
                height: 220px;
                border-radius: 50%;
                overflow: hidden;
                background: linear-gradient(45deg, var(--autumn-yellow), var(--light-orange));
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 8px 20px rgba(139, 69, 19, 0.3);

                .couple-photo {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .photo-text {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: rgba(139, 69, 19, 0.8);
                    color: white;
                    text-align: center;
                    padding: 8px;
                    font-size: 16px;
                    font-weight: bold;
                }

                &::after {
                    content: '请上传合照';
                    color: var(--autumn-brown);
                    font-size: 18px;
                    font-weight: bold;
                }
            }
        }

        .timeline-section {
            width: 100%;
            max-width: 500px;

            .timeline-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px 25px;
                background: rgba(255, 250, 236, 0.9);
                border-radius: 15px;
                margin-bottom: 20px;
                box-shadow: 0 4px 15px rgba(139, 69, 19, 0.2);
                transition: all 0.3s ease;
                backdrop-filter: blur(5px); // 添加毛玻璃效果

                &:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 20px rgba(139, 69, 19, 0.3);
                }

                .date {
                    color: var(--autumn-brown);
                    font-weight: bold;
                    font-size: 18px;
                    flex: 1;
                }

                .event {
                    color: var(--autumn-red);
                    font-weight: bold;
                    font-size: 18px;
                    flex: 1;
                    text-align: center;
                }

                .days {
                    color: var(--autumn-yellow);
                    font-weight: bold;
                    font-size: 18px;
                    flex: 1;
                    text-align: right;
                }
            }
        }
    }
}

// 移动端适配
@media (max-width: 768px) {
    .home-container {
        .container-wrapper {
            padding: 15px;

            .photo-section {
                margin-bottom: 30px;

                .photo-placeholder {
                    width: 180px;
                    height: 180px;

                    .photo-text {
                        font-size: 14px;
                        padding: 6px;
                    }

                    &::after {
                        font-size: 16px;
                    }
                }
            }

            .timeline-section {
                max-width: 100%;

                .timeline-item {
                    padding: 15px 20px;
                    margin-bottom: 15px;

                    .date,
                    .event,
                    .days {
                        font-size: 16px;
                    }
                }
            }
        }
    }
}

@media (max-width: 480px) {
    .home-container {
        .container-wrapper {
            .photo-section {
                .photo-placeholder {
                    width: 160px;
                    height: 160px;
                }
            }

            .timeline-section {
                .timeline-item {
                    flex-direction: column;
                    text-align: center;
                    gap: 10px;

                    .date,
                    .event,
                    .days {
                        flex: none;
                        text-align: center;
                    }
                }
            }
        }
    }
}
</style>

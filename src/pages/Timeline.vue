<script setup lang="ts">
import GlobalFalling from '@/components/GlobalFalling.vue';
import Image from '@/components/Image.vue';
import laoCaiChang from '@/assets/lao_cai_chang.jpg';

interface TimelineEvent {
    id: number;
    date: string;
    title: string;
    description: string;
    image?: string;
}

const timelineEvents: TimelineEvent[] = [
    {
        id: 1,
        date: '2025-08-27',
        title: '彼此加上微信',
        description: '彼时仍是酷日盛夏，我们的故事悄然开始...'
    },
    {
        id: 2,
        date: '2025-08-30',
        title: '第一次组队打王者',
        description: '这个狄仁杰，Emm...似乎有点菜🤣'
    },
    {
        id: 3,
        date: '2025-08-31',
        title: '第一次见面',
        description:
            '骑着小黄车，我在前，她在后，漫步在老菜场，听完Live版《枫》，再请教彼此的拍照技术',
        image: laoCaiChang
    },
    {
        id: 4,
        date: '2026-02-14',
        title: '情人节',
        description: '玫瑰与巧克力，还有你眼中的星辰大海。',
        image: 'https://images.unsplash.com/photo-1518681731556-00195d87d958?w=300&h=300&fit=crop'
    },
    {
        id: 5,
        date: '2026-05-20',
        title: '告白日',
        description: '五月的暖阳不及你的温柔，爱你是我做过最勇敢的事。',
        image: 'https://images.unsplash.com/photo-1533158307914-937c4fb64d3c?w=300&h=300&fit=crop'
    },
    {
        id: 6,
        date: '2026-09-04',
        title: '周年纪念',
        description: '一年又一年，感谢时光让我们依然相爱如初。',
        image: 'https://images.unsplash.com/photo-1533158307914-937c4fb64d3c?w=300&h=300&fit=crop'
    }
];
</script>

<template>
    <GlobalFalling />
    <div class="timeline-container">
        <div class="timeline-content">
            <div class="timeline-wrapper">
                <!-- 树枝主干 -->
                <div class="tree-branch"></div>

                <!-- 树叶装饰 -->
                <div class="branch-decoration branch-top">🍃</div>
                <div class="branch-decoration branch-bottom">🍃</div>

                <!-- 时间节点 -->
                <div
                    v-for="(event, index) in timelineEvents"
                    :key="event.id"
                    :class="['timeline-item', index % 2 === 0 ? 'left' : 'right']"
                >
                    <div class="timeline-card">
                        <div class="card-date">{{ event.date }}</div>
                        <h3 class="card-title">{{ event.title }}</h3>

                        <!-- 图片展示 -->
                        <Image v-if="event.image" :url="event.image" :alt="event.title" />

                        <p class="card-description">{{ event.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.timeline-container {
    position: relative;
    min-height: 100%;
    width: 100%;
    padding: 20px;

    .timeline-content {
        position: relative;
        z-index: 2;
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px 0;

        .page-title {
            text-align: center;
            color: var(--autumn-brown);
            font-size: 36px;
            margin-bottom: 40px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
            font-weight: bold;
            font-family: '楷体', 'STKaiti', sans-serif;
            letter-spacing: 2px;
            position: relative;

            &::after {
                content: '';
                display: block;
                width: 100px;
                height: 2px;
                background: linear-gradient(to right, transparent, var(--autumn-red), transparent);
                margin: 10px auto;
            }
        }

        .timeline-wrapper {
            position: relative;
            padding: 60px 0;

            // 树枝主干
            .tree-branch {
                position: absolute;
                top: 0;
                left: 50%;
                transform: translateX(-50%);
                width: 8px;
                height: 100%;
                background: var(--autumn-brown);
                border-radius: 4px;
                z-index: 1;
                box-shadow:
                    inset -2px -2px 4px rgba(0, 0, 0, 0.2),
                    inset 2px 2px 4px rgba(255, 255, 255, 0.2);
            }

            // 树枝装饰
            .branch-decoration {
                position: absolute;
                font-size: 24px;
                z-index: 2;
                left: 50%;
                transform: translateX(-50%);
                color: var(--leaf-green);

                &.branch-top {
                    top: 10px;
                }

                &.branch-bottom {
                    bottom: 10px;
                }
            }

            .timeline-item {
                position: relative;
                width: 50%;
                padding: 10px;
                z-index: 2;
                margin-bottom: 20px;

                &.left {
                    left: 0;
                    padding-right: 20px;
                    text-align: right;

                    .timeline-card {
                        margin-left: auto;
                        // 减小卡片宽度
                        max-width: 70%;
                        :deep {
                            .image-component {
                                padding: 6px 0;
                                margin-left: auto;
                            }
                            img {
                                max-height: 2rem;
                            }
                        }
                    }
                }

                &.right {
                    left: 50%;
                    padding-left: 20px;
                    text-align: left;

                    // 减小卡片宽度
                    .timeline-card {
                        max-width: 70%;
                    }
                }

                .timeline-card {
                    width: max-content;
                    background: rgba(255, 250, 236, 0.9);
                    border-radius: 10px;
                    padding: 12px;
                    box-shadow: 0 4px 10px rgba(139, 69, 19, 0.2);
                    transition:
                        transform 0.3s ease,
                        box-shadow 0.3s ease;
                    position: relative;

                    &:hover {
                        transform: translateY(-3px);
                        box-shadow: 0 6px 15px rgba(139, 69, 19, 0.3);
                    }

                    .card-date {
                        font-size: 12px;
                        color: var(--autumn-brown);
                        font-weight: bold;
                        margin-bottom: 5px;
                    }

                    .card-title {
                        color: var(--autumn-red);
                        font-size: 16px;
                        margin: 6px 0;
                        font-weight: bold;
                    }

                    .card-description {
                        color: var(--autumn-brown);
                        font-size: 13px;
                        line-height: 1.4;
                    }
                }
            }
        }
    }
}

// 响应式设计
@media (max-width: 768px) {
    .timeline-container {
        padding: 10px;

        .timeline-content {
            padding: 10px;

            .page-title {
                font-size: 28px;
                margin-bottom: 20px;
            }

            .timeline-wrapper {
                .tree-branch {
                    left: 20px;
                }

                .branch-decoration {
                    left: 20px;
                }

                .timeline-item {
                    width: 100%;
                    left: 0 !important;
                    padding: 10px 10px 10px 50px !important;
                    text-align: left !important;
                    margin-bottom: 20px;

                    .timeline-card {
                        margin-left: 0 !important;
                        max-width: 85% !important;

                        .card-date,
                        .card-title,
                        .card-description {
                            text-align: left;
                        }
                    }
                }
            }
        }
    }
}
</style>

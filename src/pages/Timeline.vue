<script setup lang="ts">
import { ref } from 'vue';
import GlobalFalling from '@/components/GlobalFalling.vue';

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
        date: '2025-09-04',
        title: '初识',
        description: '那年秋天，微风轻拂，我们的故事悄然开始...',
        image: 'https://images.unsplash.com/photo-1573496358961-3c82838ef664?w=300&h=300&fit=crop'
    },
    {
        id: 2,
        date: '2025-10-15',
        title: '第一次约会',
        description: '在那个咖啡馆里，你的笑容比阳光还要温暖。',
        image: 'https://images.unsplash.com/photo-1465059520946-72d97538d8f4?w=300&h=300&fit=crop'
    },
    {
        id: 3,
        date: '2025-12-24',
        title: '圣诞节',
        description: '雪花纷飞的日子里，我们许下了彼此的承诺。',
        image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=300&h=300&fit=crop'
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

// 图片预览相关
const isPreviewVisible = ref(false);
const previewImage = ref('');
const scale = ref(1);
const translateX = ref(0);
const translateY = ref(0);
let isDragging = false;
let startX = 0;
let startY = 0;
let startTranslateX = 0;
let startTranslateY = 0;

// 打开图片预览
const openPreview = (imageUrl: string) => {
    previewImage.value = imageUrl;
    isPreviewVisible.value = true;
    scale.value = 1;
    translateX.value = 0;
    translateY.value = 0;
};

// 关闭图片预览
const closePreview = () => {
    isPreviewVisible.value = false;
    previewImage.value = '';
};

// 处理滚轮缩放
const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    scale.value = Math.min(Math.max(0.5, scale.value * delta), 5);
};

// 开始拖拽
const startDrag = (e: MouseEvent) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    startTranslateX = translateX.value;
    startTranslateY = translateY.value;
    (e.target as HTMLElement).style.cursor = 'grabbing';
};

// 拖拽中
const onDrag = (e: MouseEvent) => {
    if (!isDragging) return;
    translateX.value = startTranslateX + (e.clientX - startX);
    translateY.value = startTranslateY + (e.clientY - startY);
};

// 结束拖拽
const endDrag = (e: MouseEvent) => {
    isDragging = false;
    (e.target as HTMLElement).style.cursor = 'grab';
};

// 重置变换
const resetTransform = () => {
    scale.value = 1;
    translateX.value = 0;
    translateY.value = 0;
};
</script>

<template>
    <GlobalFalling />
    <div class="timeline-container">
        <div class="timeline-content">
            <h1 class="page-title">我们的时光轴</h1>

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
                        <div
                            v-if="event.image"
                            class="card-image"
                            @click="openPreview(event.image)"
                        >
                            <img :src="event.image" :alt="event.title" />
                            <div class="image-overlay">
                                <span class="preview-icon">🔍</span>
                            </div>
                        </div>

                        <p class="card-description">{{ event.description }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- 图片预览模态框 -->
        <div v-if="isPreviewVisible" class="image-preview" @click="closePreview">
            <div class="preview-toolbar">
                <button class="zoom-btn" @click.stop="scale *= 1.2">+</button>
                <button class="zoom-btn" @click.stop="scale *= 0.8">-</button>
                <button class="reset-btn" @click.stop="resetTransform">↺</button>
            </div>

            <div
                class="preview-content"
                @click.stop
                @wheel="handleWheel"
                @mousedown="startDrag"
                @mousemove="onDrag"
                @mouseup="endDrag"
                @mouseleave="endDrag"
            >
                <img
                    :src="previewImage"
                    alt="Preview"
                    :style="{
                        transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
                        cursor: isDragging ? 'grabbing' : 'grab'
                    }"
                />
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
        padding: 20px;

        .page-title {
            text-align: center;
            color: var(--autumn-brown);
            font-size: 32px;
            margin-bottom: 40px;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
            font-weight: bold;
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

                    // 图片展示区域
                    .card-image {
                        width: 100%;
                        height: 120px;
                        border-radius: 6px;
                        overflow: hidden;
                        margin: 8px 0;
                        position: relative;
                        cursor: pointer;
                        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);

                        img {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                            transition: transform 0.3s ease;
                        }

                        .image-overlay {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background: rgba(0, 0, 0, 0.3);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            opacity: 0;
                            transition: opacity 0.3s ease;

                            .preview-icon {
                                color: white;
                                font-size: 20px;
                            }
                        }

                        &:hover {
                            img {
                                transform: scale(1.05);
                            }

                            .image-overlay {
                                opacity: 1;
                            }
                        }
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

// 图片预览模态框
.image-preview {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;

    .preview-toolbar {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 10px;
        z-index: 1; // 放在背景遮罩层上方但图片下方

        .zoom-btn,
        .reset-btn {
            width: 40px;
            height: 40px;
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            color: white;
            font-size: 18px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(5px);
            transition: all 0.2s ease;

            &:hover {
                background: rgba(255, 255, 255, 0.3);
                transform: scale(1.1);
            }
        }
    }

    .preview-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2; // 图片在最上层

        img {
            max-width: 90vw;
            max-height: 90vh;
            border-radius: 8px;
            box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
            transition: transform 0.1s ease;
            user-select: none;
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
                font-size: 24px;
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

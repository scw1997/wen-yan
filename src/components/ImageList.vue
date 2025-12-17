<template>
    <div class="image-list-component">
        <!-- 图片网格展示 -->
        <div class="image-grid">
            <div
                v-for="(image, index) in images"
                :key="image.url"
                class="media-item"
                @click="openPreview(index)"
            >
                <div class="image-container">
                    <img
                        v-if="!isVideo(image.url)"
                        :src="transparentPlaceholder"
                        :data-src="image.url"
                        :data-thumb="image.thumbUrl"
                        :alt="image.alt || ''"
                        class="lazy-image"
                    />
                    <div v-else class="video-wrapper">
                        <img
                            :src="transparentPlaceholder"
                            :data-src="image.url"
                            :data-thumb="image.thumbUrl"
                            :alt="image.alt || ''"
                            class="lazy-video-thumb"
                        />
                        <div
                            class="play-overlay show"
                            :class="{ 'with-thumbnail': image.thumbUrl }"
                        >
                            <div class="play-button">▶</div>
                        </div>
                    </div>
                    <!-- 加载动画 -->
                    <div class="loading-spinner"></div>
                </div>
            </div>
        </div>

        <!-- 图片预览模态框 -->
        <Teleport to="body">
            <div v-if="isPreviewVisible" class="image-preview" @click="closePreview">
                <div class="preview-content" @click.stop @wheel="handleWheel">
                    <div class="image-info">{{ currentIndex + 1 }} / {{ images.length }}</div>

                    <!-- 当前预览的视频 -->
                    <video
                        v-if="isCurrentVideo()"
                        :src="currentImage?.url"
                        controls
                        class="preview-video"
                        :autoplay="shouldAutoPlayVideo"
                    ></video>

                    <!-- 当前预览的图片 -->
                    <img
                        v-else
                        :src="getPreviewUrl()"
                        :alt="currentImage?.alt || ''"
                        :style="{
                            transform: `scale(${scaleValue})`,
                            cursor: 'default'
                        }"
                        class="preview-image"
                        @load="onPreviewImageLoad"
                    />

                    <button
                        class="nav-btn prev-btn"
                        :disabled="currentIndex === 0"
                        @click.stop="prevImage"
                    >
                        ❰
                    </button>

                    <button
                        class="nav-btn next-btn"
                        :disabled="currentIndex === images.length - 1"
                        @click.stop="nextImage"
                    >
                        ❱
                    </button>
                </div>

                <!-- 右上角按钮组 -->
                <div class="preview-actions">
                    <button
                        v-if="!isCurrentVideo()"
                        class="zoom-btn"
                        @click.stop="scaleValue *= 1.2"
                    >
                        +
                    </button>
                    <button
                        v-if="!isCurrentVideo()"
                        class="zoom-btn"
                        @click.stop="scaleValue *= 0.8"
                    >
                        -
                    </button>
                    <button v-if="!isCurrentVideo()" class="reset-btn" @click.stop="resetTransform">
                        ↺
                    </button>
                    <button class="close-btn" @click.stop="closePreview">✕</button>
                </div>
            </div>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import type { ImageItem } from '@/typings/album';

interface Props {
    images: ImageItem[];
}

const props = defineProps<Props>();

// 透明占位图
const transparentPlaceholder =
    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

// 判断是否为视频文件
const isVideo = (url: string) => {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
    return videoExtensions.some((ext) => url.toLowerCase().endsWith(ext));
};

// 获取视频占位图URL
const getVideoPlaceholder = () => {
    // SVG格式的简单视频图标占位符
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzMzMyIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjMwIiBmaWxsPSIjMjIyIi8+PHBvbHlnb24gcG9pbnRzPSI0MiwyOCA0Miw3MiA3Miw1MCIgZmlsbD0id2hpdGUiLz48L3N2Zz4=';
};

// 预览相关状态
const isPreviewVisible = ref(false);
const currentIndex = ref(0);
const scaleValue = ref(1);
const shouldAutoPlayVideo = ref(false);

// 获取当前图片对象
const currentImage = computed(() => props.images[currentIndex.value]);

// 判断当前是否为视频
const isCurrentVideo = () => {
    if (!currentImage.value) return false;

    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
    return videoExtensions.some((ext) => currentImage.value.url.toLowerCase().endsWith(ext));
};

// 获取当前预览图片的URL
const getPreviewUrl = () => {
    if (!currentImage.value) return '';
    return currentImage.value.previewUrl || currentImage.value.url;
};

// 打开预览
const openPreview = (index: number) => {
    currentIndex.value = index;
    isPreviewVisible.value = true;
    scaleValue.value = 1;
    shouldAutoPlayVideo.value = true;
    document.body.style.overflow = 'hidden';
};

// 关闭预览
const closePreview = () => {
    isPreviewVisible.value = false;
    shouldAutoPlayVideo.value = false;
    document.body.style.overflow = '';
};

// 上一张图片
const prevImage = () => {
    if (currentIndex.value > 0) {
        currentIndex.value--;
        resetTransform();
    }
};

// 下一张图片
const nextImage = () => {
    if (currentIndex.value < props.images.length - 1) {
        currentIndex.value++;
        resetTransform();
    }
};

// 处理滚轮缩放
const handleWheel = (e: WheelEvent) => {
    if (isCurrentVideo()) return;

    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    scaleValue.value = Math.min(Math.max(0.5, scaleValue.value * delta), 5);
};

// 重置变换
const resetTransform = () => {
    scaleValue.value = 1;
};

// 预览图片加载完成事件
const onPreviewImageLoad = (e: Event) => {
    const img = e.target as HTMLImageElement;
    img.classList.add('loaded');
};

// 键盘事件处理
const handleKeyDown = (e: KeyboardEvent) => {
    if (!isPreviewVisible.value) return;

    switch (e.key) {
        case 'Escape':
            closePreview();
            break;
        case 'ArrowLeft':
            prevImage();
            break;
        case 'ArrowRight':
            nextImage();
            break;
    }
};

// 懒加载相关
let observer: IntersectionObserver | null = null;

const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            // 检查是否是视频缩略图
            const isVideoThumb = img.classList.contains('lazy-video-thumb');

            // 优先使用缩略图，如果没有则使用原图
            const thumbSrc = img.getAttribute('data-thumb');
            const dataSrc = img.getAttribute('data-src');

            // 图片加载完成的回调函数
            const onLoad = () => {
                img.classList.add('loaded');
            };

            if (thumbSrc) {
                img.src = thumbSrc;
                img.onload = onLoad;

                // 如果有原图地址，预加载原图
                if (dataSrc && thumbSrc !== dataSrc) {
                    const fullImage = new Image();
                    fullImage.onload = () => {
                        img.setAttribute('data-full-loaded', 'true');
                    };
                    fullImage.src = dataSrc;
                }
            } else if (dataSrc) {
                img.src = dataSrc;
                img.onload = onLoad;
            }
        }
    });
};

// 更新懒加载观察器
const updateObserver = () => {
    if (observer) {
        observer.disconnect();
    } else {
        observer = new IntersectionObserver(handleIntersection, {
            rootMargin: '50px' // 提前50px加载
        });
    }

    // 观察所有懒加载图片
    const lazyImages = document.querySelectorAll('.lazy-image, .lazy-video-thumb');
    lazyImages.forEach((img) => {
        observer!.observe(img);
    });
};

// 监听images变化，重新设置观察器
watch(
    () => props.images,
    () => {
        // 使用nextTick确保DOM已更新
        setTimeout(updateObserver, 0);
    }
);

onMounted(() => {
    // 设置懒加载观察器
    updateObserver();

    // 监听键盘事件
    document.addEventListener('keydown', handleKeyDown);
});

// 在组件卸载时移除事件监听
onBeforeUnmount(() => {
    if (observer) {
        observer.disconnect();
    }
    document.removeEventListener('keydown', handleKeyDown);
});
</script>

<style scoped lang="less">
.image-list-component {
    .image-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 16px;
        padding: 10px 0;
        @media (max-width: 768px) {
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        }
        .media-item {
            aspect-ratio: 1;
            overflow: hidden;
            border-radius: 8px;
            cursor: pointer;
            transition: transform 0.2s ease;
            position: relative;

            .image-container {
                width: 100%;
                height: 100%;
                position: relative;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: center;
                    opacity: 0;
                    transition: opacity 0.3s ease;

                    &.loaded {
                        opacity: 1;
                    }
                }

                .loading-spinner {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 30px;
                    height: 30px;
                    border: 3px solid rgba(255, 255, 255, 0.3);
                    border-top: 3px solid #fff;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    transform: translate(-50%, -50%);
                    opacity: 1;
                    transition: opacity 0.3s ease;
                    z-index: 1; /* 确保加载动画在图片上方 */
                }

                /* 当图片加载完成时隐藏加载动画 */
                img.loaded + .loading-spinner {
                    opacity: 0;
                }

                /* 特殊处理视频缩略图加载完成的情况 */
                img.lazy-video-thumb.loaded + .loading-spinner {
                    opacity: 0;
                }
            }

            &:hover {
                transform: scale(1.05);
            }

            .video-wrapper {
                width: 100%;
                height: 100%;
                position: relative;

                .play-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(0, 0, 0, 0.3);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    z-index: 2; /* 确保播放按钮在最上层 */

                    &.show {
                        opacity: 1;
                    }

                    &.with-thumbnail {
                        background: linear-gradient(
                            to top,
                            rgba(0, 0, 0, 0.6) 0%,
                            rgba(0, 0, 0, 0.3) 30%,
                            transparent 100%
                        );

                        .play-button {
                            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
                        }
                    }

                    .play-button {
                        font-size: 40px;
                        color: white;
                        background: rgba(0, 0, 0, 0.5);
                        border-radius: 50%;
                        width: 70px;
                        height: 70px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding-left: 10px;
                        pointer-events: none;
                        z-index: 3; /* 确保播放按钮图标在最上层 */
                    }
                }
            }
        }
    }
}

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
    .preview-actions {
        position: absolute;
        top: 20px;
        right: 20px;
        display: flex;
        @media (max-width: 768px) {
            display: none;
        }
        [class*='-btn'] {
            width: 30px;
            height: 30px;
            margin-left: 10px;
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            color: white;
            font-size: 20px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(5px);
            transition: all 0.2s ease;
            z-index: 4;

            &:hover:not(:disabled) {
                background: rgba(255, 255, 255, 0.3);
                transform: scale(1.1);
            }

            &:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
        }
    }

    .preview-content {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;

        .nav-btn {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 30px;
            height: 30px;
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            color: white;
            font-size: 20px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(5px);
            transition: all 0.2s ease;
            z-index: 3;
            &.prev-btn {
                left: -50px;
            }
            &.next-btn {
                right: -50px;
            }
            @media (max-width: 768px) {
                top: unset;
                transform: none;
                &.prev-btn {
                    left: 50%;
                    bottom: 20px;
                    transform: translateX(-100%);
                }

                &.next-btn {
                    left: calc(50% + 20px);
                    right: unset;
                    bottom: 20px;
                }
            }

            &:hover:not(:disabled) {
                background: rgba(255, 255, 255, 0.1);
                transform: scale(1.1) translateY(-50%);
            }

            &:disabled {
                opacity: 0.3;
                cursor: not-allowed;
            }
        }
        .image-info {
            position: absolute;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            color: white;
            background: rgba(0, 0, 0, 0.5);
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 14px;
            z-index: 3;
        }

        .preview-image,
        .preview-video {
            max-width: 95vw;
            max-height: 100vh;
            border-radius: 8px;
            box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
        }

        .preview-image {
            transition: transform 0.1s ease;
            user-select: none;
            opacity: 0;

            &.loaded {
                opacity: 1;
            }
        }
    }
}

@keyframes spin {
    0% {
        transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
        transform: translate(-50%, -50%) rotate(360deg);
    }
}
</style>

<template>
    <div class="media-component">
        <!-- 媒体展示 -->
        <div v-if="isVideo(props.url)" class="video-wrapper" @click="openPreview">
            <video ref="videoRef" :style="imgStyle" :poster="getThumbUrl()">
                <source :src="isVisible ? url : ''" :type="getVideoType(url)" />
                浏览器不支持视频播放。
            </video>
            <div class="play-overlay">
                <div class="play-button">▶</div>
            </div>
        </div>

        <img
            v-else
            ref="imageRef"
            :style="imgStyle"
            :src="getDisplayUrl()"
            :alt="alt || ''"
            @click="openPreview"
        />

        <!-- 媒体预览模态框 -->
        <Teleport to="body">
            <div v-if="isPreviewVisible" class="media-preview" @click="closePreview">
                <div class="preview-toolbar">
                    <button v-if="!isVideo(url)" class="zoom-btn" @click.stop="scaleValue *= 1.2">
                        +
                    </button>
                    <button v-if="!isVideo(url)" class="zoom-btn" @click.stop="scaleValue *= 0.8">
                        -
                    </button>
                    <button v-if="!isVideo(url)" class="reset-btn" @click.stop="resetTransform">
                        ↺
                    </button>
                    <button class="close-btn" @click.stop="closePreview">✕</button>
                </div>

                <div class="preview-content" @click.stop @wheel="handleWheel">
                    <video v-if="isVideo(url)" controls autoplay>
                        <source :src="url" :type="getVideoType(url)" />
                        浏览器不支持视频播放。
                    </video>

                    <img
                        v-else
                        :src="getPreviewUrl()"
                        :alt="alt || ''"
                        :style="{
                            transform: `scale(${scaleValue})`,
                            cursor: 'default'
                        }"
                    />
                </div>
            </div>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted, onUnmounted } from 'vue';

interface Props {
    url?: string;
    previewUrl?: string;
    thumbUrl?: string;
    alt?: string;
    imgStyle?: string;
}

const props = withDefaults(defineProps<Props>(), {
    url: '',
    previewUrl: '',
    thumbUrl: '',
    alt: '',
    imgStyle: ''
});

// 媒体预览相关
const isPreviewVisible = ref(false);
const scaleValue = ref(1);
const isVisible = ref(false);
const imageRef = ref<HTMLImageElement | null>(null);
const videoRef = ref<HTMLVideoElement | null>(null);
const observer = ref<IntersectionObserver | null>(null);

// 占位图URL - 使用一个很小的透明图像作为默认占位符
const placeholderUrl =
    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

// 判断是否为视频文件
const isVideo = (url: string) => {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
    return videoExtensions.some((ext) => url.toLowerCase().endsWith(ext));
};

// 获取视频类型
const getVideoType = (url: string) => {
    if (url.toLowerCase().endsWith('.mp4')) return 'video/mp4';
    if (url.toLowerCase().endsWith('.webm')) return 'video/webm';
    if (url.toLowerCase().endsWith('.ogg')) return 'video/ogg';
    if (url.toLowerCase().endsWith('.mov')) return 'video/quicktime';
    return 'video/mp4'; // 默认值
};

// 获取显示用的URL（用于初始展示）
const getDisplayUrl = () => {
    if (isVisible.value) {
        return props.url;
    }
    return placeholderUrl;
};

// 获取预览用的URL
const getPreviewUrl = () => {
    return props.previewUrl || props.url;
};

// 获取视频缩略图URL
const getThumbUrl = () => {
    if (props.thumbUrl) {
        return props.thumbUrl;
    }
    return placeholderUrl;
};

// 打开媒体预览
const openPreview = () => {
    isPreviewVisible.value = true;
    scaleValue.value = 1;
    document.body.style.overflow = 'hidden'; // 防止背景滚动
};

// 关闭媒体预览
const closePreview = () => {
    isPreviewVisible.value = false;
    document.body.style.overflow = ''; // 恢复背景滚动

    // 如果是视频，暂停播放
    if (isVideo(props.url) && videoRef.value) {
        videoRef.value.pause();
    }
};

// 处理键盘事件
const handleKeyDown = (e: KeyboardEvent) => {
    if (!isPreviewVisible.value) return;

    if (e.key === 'Escape') {
        closePreview();
    }
};

// 处理滚轮缩放（仅适用于图片）
const handleWheel = (e: WheelEvent) => {
    if (isVideo(props.url)) return;

    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    scaleValue.value = Math.min(Math.max(0.5, scaleValue.value * delta), 5);
};

// 重置变换（仅适用于图片）
const resetTransform = () => {
    scaleValue.value = 1;
};

// 设置交叉观察器
const setupObserver = () => {
    const targetRef = isVideo(props.url) ? videoRef : imageRef;
    if (!targetRef.value) return;

    observer.value = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    isVisible.value = true;
                    // 加载真实媒体后停止观察
                    if (observer.value) {
                        observer.value.disconnect();
                        observer.value = null;
                    }
                }
            });
        },
        {
            rootMargin: '50px' // 提前50px开始加载
        }
    );

    observer.value.observe(targetRef.value);
};

// 生命周期钩子
onMounted(() => {
    window.addEventListener('keydown', handleKeyDown);
    setupObserver();
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown);
    document.body.style.overflow = ''; // 确保清理样式

    // 清理观察器
    if (observer.value) {
        observer.value.disconnect();
        observer.value = null;
    }
});
</script>

<style scoped lang="less">
.media-component {
    display: block;
    max-width: 100%;
    max-height: 100%;
    position: relative;

    img,
    video {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }

    .video-wrapper {
        position: relative;
        cursor: pointer;

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

            .play-button {
                font-size: 60px;
                color: white;
                background: rgba(0, 0, 0, 0.5);
                border-radius: 50%;
                width: 100px;
                height: 100px;
                display: flex;
                align-items: center;
                justify-content: center;
                padding-left: 10px;
            }
        }

        &:hover .play-overlay {
            opacity: 1;
        }
    }
}

// 媒体预览模态框
.media-preview {
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
        z-index: 3;

        .zoom-btn,
        .reset-btn,
        .close-btn {
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
        z-index: 2;

        img {
            max-width: 90vw;
            max-height: 90vh;
            border-radius: 8px;
            box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
            transition: transform 0.1s ease;
            user-select: none;
        }

        video {
            max-width: 90vw;
            max-height: 90vh;
            border-radius: 8px;
            box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
        }
    }
}
</style>

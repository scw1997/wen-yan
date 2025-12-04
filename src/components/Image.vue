<template>
    <div class="image-component">
        <!-- 图片展示 -->

        <img
            ref="imageRef"
            :src="isVisible ? url : placeholderUrl"
            :alt="alt || ''"
            :style="{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }"
            @click="openPreview"
        />

        <!-- 图片预览模态框 -->
        <Teleport to="body">
            <div v-if="isPreviewVisible" class="image-preview" @click="closePreview">
                <div class="preview-toolbar">
                    <button class="zoom-btn" @click.stop="scaleValue *= 1.2">+</button>
                    <button class="zoom-btn" @click.stop="scaleValue *= 0.8">-</button>
                    <button class="reset-btn" @click.stop="resetTransform">↺</button>
                </div>

                <div class="preview-content" @click.stop @wheel="handleWheel">
                    <img
                        :src="url"
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
import { ref, computed, defineProps, onMounted, onUnmounted } from 'vue';

interface Props {
    url: string;
    alt?: string;
}

const props = withDefaults(defineProps<Props>(), {
    alt: ''
});

// 图片预览相关
const isPreviewVisible = ref(false);
const scaleValue = ref(1);
const isVisible = ref(false);
const imageRef = ref<HTMLImageElement | null>(null);
const observer = ref<IntersectionObserver | null>(null);

// 占位图URL - 使用一个很小的透明图像作为默认占位符
const placeholderUrl =
    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

// 打开图片预览
const openPreview = () => {
    isPreviewVisible.value = true;
    scaleValue.value = 1;
    document.body.style.overflow = 'hidden'; // 防止背景滚动
};

// 关闭图片预览
const closePreview = () => {
    isPreviewVisible.value = false;
    document.body.style.overflow = ''; // 恢复背景滚动
};

// 处理ESC键关闭预览
const handleEscKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isPreviewVisible.value) {
        closePreview();
    }
};

// 处理滚轮缩放
const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    scaleValue.value = Math.min(Math.max(0.5, scaleValue.value * delta), 5);
};

// 重置变换
const resetTransform = () => {
    scaleValue.value = 1;
};

// 设置交叉观察器
const setupObserver = () => {
    if (!imageRef.value) return;

    observer.value = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    isVisible.value = true;
                    // 加载真实图片后停止观察
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

    observer.value.observe(imageRef.value);
};

// 生命周期钩子
onMounted(() => {
    window.addEventListener('keydown', handleEscKey);
    setupObserver();
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleEscKey);
    document.body.style.overflow = ''; // 确保清理样式

    // 清理观察器
    if (observer.value) {
        observer.value.disconnect();
        observer.value = null;
    }
});
</script>

<style scoped lang="less">
.image-component {
    display: block;

    max-width: 100%;

    max-height: 100%;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
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
        z-index: 1;

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
        z-index: 2;

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
</style>

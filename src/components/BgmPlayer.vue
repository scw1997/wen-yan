<template>
    <!-- 使用隐藏的audio标签 -->
    <audio ref="audioRef" style="display: none"></audio>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';

interface Props {
    urlList?: string[];
}

const props = withDefaults(defineProps<Props>(), {
    urlList: () => [
        `${SWICO_STATIC_PUBLIC_PATH}bgm/1.mp3`,
        `${SWICO_STATIC_PUBLIC_PATH}bgm/2.mp3`,
        `${SWICO_STATIC_PUBLIC_PATH}bgm/3.mp3`
    ]
});

// 音频元素引用
const audioRef = ref<HTMLAudioElement | null>(null);
// 当前播放索引
const currentIndex = ref(0);
// 播放状态
const isPlaying = ref(false);
// 失败计数器，用于跟踪连续播放失败次数
const failureCount = ref(0);
// 用户是否已交互标志
const userInteracted = ref(false);
// 是否已初始化音频源
const isInitialized = ref(false);

// 检查URL是否为音频格式
const isAudioFormat = (url: string): boolean => {
    const audioExtensions = /\.(mp3|wav|ogg|aac|flac|m4a|wma|opus)$/i;
    return audioExtensions.test(url);
};

// 获取有效的音频URL列表
const validUrlList = computed(() => {
    return props.urlList.filter((url) => isAudioFormat(url));
});

// 监听有效URL列表变化，重置播放状态
watch(validUrlList, () => {
    currentIndex.value = 0;
    failureCount.value = 0;
    isInitialized.value = false;
    if (validUrlList.value.length > 0 && audioRef.value) {
        // 不再立即设置音频源，改为按需加载
        audioRef.value.src = '';
    }
});

// 播放下一首
const playNext = () => {
    if (validUrlList.value.length === 0) return;

    // 如果所有URL都已尝试失败，则停止播放
    if (failureCount.value >= validUrlList.value.length) {
        console.log('所有音频URL都播放失败，停止循环播放');
        stop();
        return;
    }

    currentIndex.value = (currentIndex.value + 1) % validUrlList.value.length;
    playCurrent();
};

// 播放当前歌曲
const playCurrent = () => {
    if (validUrlList.value.length === 0 || !audioRef.value) return;

    // 按需加载：仅在需要播放时设置音频源
    if (!isInitialized.value || audioRef.value.src !== validUrlList.value[currentIndex.value]) {
        audioRef.value.src = validUrlList.value[currentIndex.value];
        isInitialized.value = true;
    }

    // 如果用户尚未交互，不尝试播放
    if (!userInteracted.value) {
        console.log('等待用户交互后开始播放');
        return;
    }

    audioRef.value
        .play()
        .then(() => {
            isPlaying.value = true;
            // 重置失败计数
            failureCount.value = 0;
        })
        .catch((error) => {
            console.error('播放失败:', error);
            // 增加失败计数
            failureCount.value++;
            // 如果当前音频播放失败，尝试下一首
            playNext();
        });
};

// 处理曲目结束事件
const handleTrackEnd = () => {
    // 重置失败计数
    failureCount.value = 0;
    playNext();
};

// 停止播放
const stop = () => {
    if (audioRef.value) {
        audioRef.value.pause();
        isPlaying.value = false;
    }
};

// 用户交互处理
const handleUserInteraction = () => {
    userInteracted.value = true;
    // 移除所有相关的事件监听器
    document.removeEventListener('click', handleUserInteraction);
    document.removeEventListener('keydown', handleUserInteraction);
    document.removeEventListener('touchstart', handleUserInteraction);

    // 用户交互后开始播放
    playCurrent();
};

// 组件挂载时监听用户交互
onMounted(() => {
    // 添加用户交互事件监听器
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);

    if (validUrlList.value.length > 0 && audioRef.value) {
        // 不再初始化音频源，改为按需加载
        audioRef.value.src = '';
        // 添加播放结束事件监听器
        audioRef.value.addEventListener('ended', handleTrackEnd);
    }
});

// 组件卸载时停止播放并清理
onUnmounted(() => {
    // 移除事件监听器
    document.removeEventListener('click', handleUserInteraction);
    document.removeEventListener('keydown', handleUserInteraction);
    document.removeEventListener('touchstart', handleUserInteraction);

    if (audioRef.value) {
        audioRef.value.pause();
        audioRef.value.removeEventListener('ended', handleTrackEnd);
    }

    // 重置状态
    isPlaying.value = false;
    userInteracted.value = false;
    isInitialized.value = false;
});
</script>

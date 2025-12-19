<template>
    <!-- 无界面组件，仅在后台播放音乐 -->
    <div></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';

// 定义props
interface Props {
    urlList: string[];
}

const props = defineProps<Props>();

// 音频对象引用
const audio = ref<HTMLAudioElement | null>(null);
// 当前播放索引
const currentIndex = ref(0);
// 播放状态
const isPlaying = ref(false);
// 已加载的音频索引集合
const loadedIndices = new Set<number>();

// 检查URL是否为音频格式
const isAudioFormat = (url: string): boolean => {
    const audioExtensions = /\.(mp3|wav|ogg|aac|flac|m4a|wma|opus)$/i;
    return audioExtensions.test(url);
};

// 过滤出有效的音频URL
const validUrls = computed(() => {
    return props.urlList.filter((url) => isAudioFormat(url));
});

// 获取当前索引在有效URL列表中的实际索引
const getCurrentValidIndex = () => {
    let validIndex = 0;
    for (let i = 0; i < props.urlList.length; i++) {
        if (isAudioFormat(props.urlList[i])) {
            if (validIndex === currentIndex.value) {
                return i;
            }
            validIndex++;
        }
    }
    return -1;
};

// 播放下一首
const playNext = () => {
    if (validUrls.value.length === 0) return;

    currentIndex.value = (currentIndex.value + 1) % validUrls.value.length;
    playCurrent();
};

// 播放当前歌曲
const playCurrent = () => {
    if (validUrls.value.length === 0) return;

    if (!audio.value) {
        audio.value = new Audio();
        audio.value.addEventListener('ended', playNext);
    }

    // 只有当对应音乐第一次播放时才设置src加载资源
    const actualIndex = getCurrentValidIndex();
    if (!loadedIndices.has(actualIndex)) {
        audio.value.src = validUrls.value[currentIndex.value];
        loadedIndices.add(actualIndex);
    }

    audio.value
        .play()
        .then(() => {
            isPlaying.value = true;
        })
        .catch((error) => {
            console.error('播放失败:', error);
            // 如果当前音频播放失败，尝试下一首
            playNext();
        });
};

// 停止播放
const stop = () => {
    if (audio.value) {
        audio.value.pause();
        isPlaying.value = false;
    }
};

// 监听urlList变化
watch(
    () => props.urlList,
    (newUrls) => {
        // 清空已加载索引集合
        loadedIndices.clear();

        const validNewUrls = newUrls.filter((url) => isAudioFormat(url));
        if (validNewUrls.length > 0) {
            currentIndex.value = 0;
            playCurrent();
        } else {
            stop();
        }
    },
    { deep: true }
);

// 组件挂载时开始播放
onMounted(() => {
    if (validUrls.value.length > 0) {
        playCurrent();
    }
});

// 组件卸载时停止播放并清理
onUnmounted(() => {
    if (audio.value) {
        audio.value.pause();
        audio.value.removeEventListener('ended', playNext);
        audio.value = null;
    }

    // 清空已加载索引集合
    loadedIndices.clear();
});
</script>

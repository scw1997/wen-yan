<script setup lang="ts">
import { ref } from 'vue';
import GlobalFalling from '@/components/GlobalFalling.vue';

interface DiaryEntry {
    title: string;
    date: string;
    content: string;
    weather?: string;
    writer: string;
}

// 日记条目数据
const diaryEntries = ref<DiaryEntry[]>([
    {
        title: '初识的美好',
        date: '2025.09.04',
        weather: '☀',
        writer: '燕',
        content:
            '今天是我们初次相遇的日子。\n在那个阳光明媚的下午，你穿着白色的连衣裙，微笑着向我走来。那一刻，仿佛整个世界都安静了下来，只剩下我们两个人的心跳声。今天是我们初次相遇的日子。\n在那个阳光明媚的下午，你穿着白色的连衣裙，微笑着向我走来。那一刻，仿佛整个世界都安静了下来，只剩下我们两个人的心跳声。今天是我们初次相遇的日子。\n在那个阳光明媚的下午，你穿着白色的连衣裙，微笑着向我走来。那一刻，仿佛整个世界都安静了下来，只剩下我们两个人的心跳声。今天是我们初次相遇的日子。\n在那个阳光明媚的下午，你穿着白色的连衣裙，微笑着向我走来。那一刻，仿佛整个世界都安静了下来，只剩下我们两个人的心跳声。今天是我们初次相遇的日子。\n在那个阳光明媚的下午，你穿着白色的连衣裙，微笑着向我走来。那一刻，仿佛整个世界都安静了下来，只剩下我们两个人的心跳声。今天是我们初次相遇的日子。\n在那个阳光明媚的下午，你穿着白色的连衣裙，微笑着向我走来。那一刻，仿佛整个世界都安静了下来，只剩下我们两个人的心跳声。今天是我们初次相遇的日子。\n在那个阳光明媚的下午，你穿着白色的连衣裙，微笑着向我走来。那一刻，仿佛整个世界都安静了下来，只剩下我们两个人的心跳声。今天是我们初次相遇的日子。\n在那个阳光明媚的下午，你穿着白色的连衣裙，微笑着向我走来。那一刻，仿佛整个世界都安静了下来，只剩下我们两个人的心跳声。'
    }
]);

// 当前选中的日记
const selectedEntry = ref<DiaryEntry>(diaryEntries.value[0]);

// 选择日记
const selectEntry = (entry: DiaryEntry) => {
    selectedEntry.value = entry;
};
</script>

<template>
    <GlobalFalling />
    <div class="diary-container">
        <div class="diary-content">
            <div class="diary-layout">
                <!-- 左侧日记目录 -->
                <div class="entries-panel">
                    <div
                        v-for="entry in diaryEntries"
                        :key="entry.title"
                        :class="['entry-item', { active: entry.title === selectedEntry.title }]"
                        @click="selectEntry(entry)"
                    >
                        <div class="entry-title">{{ entry.title }}</div>
                        <div class="entry-date">{{ entry.date }} {{ entry.weather }}</div>
                    </div>
                </div>

                <!-- 右侧日记内容 -->
                <div class="content-panel">
                    <div class="content-header">
                        <div class="header-row">
                            <div class="date">{{ selectedEntry.date }}</div>
                            <div class="title">{{ selectedEntry.title }}</div>
                            <div class="weather">{{ selectedEntry.weather }}</div>
                        </div>
                    </div>
                    <div class="content-text">
                        <p
                            v-for="(line, index) in selectedEntry.content.split('\n')"
                            :key="index"
                            class="content-line"
                        >
                            {{ line }}
                        </p>
                        <p class="writer">{{ selectedEntry.writer }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.diary-container {
    position: relative;
    min-height: 100%;
    width: 100%;
    padding: 20px;
    font-family: 'Georgia', 'Times New Roman', serif;

    .diary-content {
        position: relative;
        max-width: 1200px;
        margin: 0 auto;

        .diary-layout {
            display: flex;
            gap: 20px;
            @media (max-width: 768px) {
                flex-direction: column;
            }

            // 左侧日记目录面板
            .entries-panel {
                flex: none;
                width: 220px;
                background: rgba(255, 250, 236, 0.6);
                border-radius: 15px;
                padding: 14px;
                box-shadow: 0 8px 20px rgba(139, 69, 19, 0.3);
                height: fit-content;
                max-height: 500px;
                overflow: auto;
                border: 2px solid #d2b48c;
                position: relative;
                scrollbar-width: none;
                @media (max-width: 768px) {
                    width: 100%;
                }
                &::-webkit-scrollbar {
                    display: none; /* 直接隐藏滚动条 */
                }
                .entry-item {
                    padding: 12px;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    background: rgba(255, 255, 255, 0.5);
                    border: 1px solid #d2b48c;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    position: relative;
                    overflow: hidden;
                    &:not(:last-child) {
                        margin-bottom: 15px;
                    }
                    &:hover {
                        background: rgba(255, 182, 106, 0.5);
                        transform: translateY(-2px);
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
                    }

                    &.active {
                        background: linear-gradient(135deg, var(--autumn-yellow) 0%, #ff8c00 100%);
                        color: white;
                        box-shadow: 0 4px 10px rgba(139, 69, 19, 0.3);
                        border-color: var(--autumn-brown);

                        .entry-date {
                            color: rgba(255, 255, 255, 0.9);
                        }
                    }

                    .entry-title {
                        font-size: 18px;
                        color: var(--autumn-brown);
                        margin-bottom: 8px;
                        font-family: 'Georgia', serif;
                    }

                    .entry-date {
                        font-size: 13px;
                        color: var(--autumn-red);
                        font-style: italic;
                    }
                }
            }

            // 右侧内容面板
            .content-panel {
                flex: 1;
                background: rgba(255, 250, 236, 0.6);
                border-radius: 15px;
                padding: 20px;
                box-shadow: 0 8px 20px rgba(139, 69, 19, 0.3);
                border: 2px solid #d2b48c;
                position: relative;

                .content-header {
                    margin-bottom: 16px;
                    padding-bottom: 15px;
                    border-bottom: 2px dashed var(--autumn-yellow);

                    .header-row {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        position: relative;
                        .date {
                            flex: none;
                            color: var(--autumn-red);
                            font-size: 16px;
                            font-style: italic;
                            text-align: left;
                            position: absolute;
                            left: 0;
                        }

                        .title {
                            flex: 1;
                            color: var(--autumn-brown);
                            font-size: 28px;
                            font-weight: bold;
                            font-family: 'Georgia', serif;
                            letter-spacing: 1px;
                            text-align: center;
                        }

                        .weather {
                            flex: none;
                            color: var(--autumn-red);
                            font-size: 16px;
                            font-style: italic;
                            text-align: right;
                            position: absolute;
                            right: 0;
                        }
                    }
                }

                .content-text {
                    scrollbar-width: none;
                    &::-webkit-scrollbar {
                        display: none; /* 直接隐藏滚动条 */
                    }
                    color: var(--autumn-brown);
                    font-size: 20px;
                    line-height: 1.6;
                    text-align: justify;
                    overflow-y: auto;
                    border-radius: 8px;
                    min-height: 300px;
                    font-family: '楷体', 'KaiTi', serif;
                    .content-line {
                        text-indent: 2em;
                        padding-bottom: 4px;
                        white-space: pre-line;
                    }
                    .writer {
                        text-align: right;
                        padding-top: 10px;
                    }
                }
            }
        }
    }
}
</style>

<script setup lang="ts">
import { ref } from 'vue';
import GlobalFalling from '@/components/GlobalFalling.vue';

interface DiaryEntry {
    id: number;
    title: string;
    date: string;
    content: string;
    weather?: string;
}

// 日记条目数据
const diaryEntries = ref<DiaryEntry[]>([
    {
        id: 1,
        title: '初识的美好',
        date: '2025年9月4日',
        weather: '晴',
        content:
            '今天是我们初次相遇的日子。\n在那个阳光明媚的下午，你穿着白色的连衣裙，微笑着向我走来。\n那一刻，仿佛整个世界都安静了下来，只剩下我们两个人的心跳声。'
    },
    {
        id: 2,
        title: '第一次约会',
        date: '2025年10月15日',
        weather: '阴',
        content:
            '终于等到了我们的第一次正式约会。\n一起去看了电影，吃了晚饭。\n虽然有些紧张，但和你在一起的每一刻都是那么珍贵。\n你的笑声是我听过最美的声音。'
    },
    {
        id: 3,
        title: '浪漫的晚餐',
        date: '2025年11月8日',
        weather: '雨',
        content:
            '为了庆祝我们相识两个月，我特意为你准备了一顿烛光晚餐。\n虽然手艺不怎么样，但你吃得很开心。\n饭后我们一起在雨中散步，那种感觉真的很浪漫。'
    },
    {
        id: 4,
        title: '海边的约定',
        date: '2026年1月5日',
        weather: '多云',
        content:
            '今天我们去了海边，一起走在沙滩上，听着海浪的声音。\n你说希望我们能像大海一样，无论经历什么风浪都能在一起。\n我们在海边许下了永远相爱的约定。'
    },
    {
        id: 5,
        title: '山顶看日出',
        date: '2026年2月18日',
        weather: '晴',
        content:
            '凌晨四点起床爬山，只为一起看日出。\n虽然很累，但当太阳从地平线升起的那一刻，一切都值得了。\n我们紧紧拥抱在一起，感谢这美好的时刻。'
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
                        :key="entry.id"
                        :class="['entry-item', { active: entry.id === selectedEntry.id }]"
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
        padding: 20px 0;

        .diary-layout {
            display: flex;
            gap: 20px;
            min-height: 500px;

            // 左侧日记目录面板
            .entries-panel {
                flex: none;
                width: 250px;
                background: rgba(255, 250, 236, 0.6);
                border-radius: 15px;
                padding: 15px;
                box-shadow: 0 8px 20px rgba(139, 69, 19, 0.3);
                height: fit-content;
                border: 2px solid #d2b48c;
                position: relative;

                &::before {
                    content: '';
                    position: absolute;
                    top: -5px;
                    left: -5px;
                    right: -5px;
                    bottom: -5px;
                    border: 1px solid #deb887;
                    border-radius: 20px;
                    z-index: -1;
                }

                .entry-item {
                    padding: 15px 20px;
                    margin-bottom: 15px;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    background: rgba(255, 255, 255, 0.5);
                    border: 1px solid #d2b48c;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    position: relative;
                    overflow: hidden;

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
                        font-size: 17px;
                        font-weight: bold;
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
                padding: 30px;
                box-shadow: 0 8px 20px rgba(139, 69, 19, 0.3);
                border: 2px solid #d2b48c;
                position: relative;

                &::before {
                    content: '';
                    position: absolute;
                    top: -5px;
                    left: -5px;
                    right: -5px;
                    bottom: -5px;
                    border: 1px solid #deb887;
                    border-radius: 20px;
                    z-index: -1;
                }

                .content-header {
                    margin-bottom: 25px;
                    padding-bottom: 15px;
                    border-bottom: 2px dashed var(--autumn-yellow);

                    .header-row {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        .date {
                            flex: 1;
                            color: var(--autumn-red);
                            font-size: 16px;
                            font-style: italic;
                            text-align: left;
                        }

                        .title {
                            flex: 2;
                            color: var(--autumn-brown);
                            font-size: 28px;
                            font-weight: bold;
                            font-family: 'Georgia', serif;
                            letter-spacing: 1px;
                            text-align: center;
                        }

                        .weather {
                            flex: 1;
                            color: var(--autumn-red);
                            font-size: 16px;
                            font-style: italic;
                            text-align: right;
                        }
                    }
                }

                .content-text {
                    color: var(--autumn-brown);
                    font-size: 17px;
                    line-height: 1.8;
                    text-align: justify;
                    //padding: 10px;
                    border-radius: 8px;
                    //background: rgba(255, 255, 255, 0.6);
                    min-height: 300px;

                    .content-line {
                        margin: 0;
                        padding: 5px 0;
                        border-bottom: 2px solid var(--autumn-yellow);
                    }
                }
            }
        }
    }

    // 响应式设计
    @media (max-width: 768px) {
        padding: 10px;

        .diary-content {
            padding: 10px;

            .diary-layout {
                flex-direction: column;

                .entries-panel {
                    width: auto;
                    margin-bottom: 20px;
                    flex: 0 0 auto;

                    .entry-item {
                        padding: 12px 15px;
                    }
                }

                .content-panel {
                    flex: 0 0 auto;
                    padding: 20px;

                    .content-header {
                        .header-row {
                            .title {
                                font-size: 24px;
                            }
                        }
                    }

                    .content-text {
                        font-size: 16px;

                        .content-line {
                            padding: 3px 0;
                        }
                    }
                }
            }
        }
    }

    // 小屏幕进一步优化
    @media (max-width: 480px) {
        padding: 5px;

        .diary-content {
            padding: 5px;

            .diary-layout {
                .content-panel {
                    padding: 15px;

                    .content-header {
                        .header-row {
                            .title {
                                font-size: 20px;
                            }

                            .date,
                            .weather {
                                font-size: 14px;
                            }
                        }
                    }

                    .content-text {
                        font-size: 15px;
                        padding: 8px 15px;

                        .content-line {
                            padding: 2px 0;
                        }
                    }
                }

                .entries-panel {
                    padding: 10px;

                    .entry-item {
                        padding: 10px 12px;

                        .entry-title {
                            font-size: 16px;
                        }

                        .entry-date {
                            font-size: 12px;
                        }
                    }
                }
            }
        }
    }
}
</style>

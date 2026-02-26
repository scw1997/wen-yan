<script setup lang="ts">
import { ref } from 'vue';
import GlobalFalling from '@/components/GlobalFalling.vue';

interface DiaryEntry {
    title: string;
    date: string;
    content: string;
    writer: string;
}

// 日记条目数据
const diaryEntries = ref<DiaryEntry[]>([
    {
        title: '初次过年见家长环节',
        date: '2026.02.24',
        writer: '燕',
        content:
            '     二零二六年正月初三的一个午后，通渭站接到了你——我的男朋友。这是第一次来见过我的家人，你提着烟酒礼品，独自来赴这场准备了许久的见面。出站口人群熙攘，我还是一眼就认出了你。你沉稳的模样，让我心里那点紧张，忽然就安定了下来。\n' +
            '      回家第一顿，是甘肃待客的最高礼——“罐罐茶”，妈妈张罗了一桌菜。你礼貌让座让我不禁咯咯的笑，鱼头对着谁，谁就是今日主客，毋庸置疑，你当然是。饭后去田间散步，傍晚的月挂在天边，在蓝粉调的衬托下傍晚月下漫步显得格外浪漫，你一味感叹民间的纯朴风。\n' +
            '    还约了哥哥，三人去球场。第一次看你打篮球，三分球很准嘛，帅的，中午吃铜锅，晚上围炉玩扑克，总是使眼色逗你，你憋着笑配合，输了也不恼。\n' +
            '      初五最暖和。我们去通渭县城玩，在南苑草坪上躺着，阳光软软的，风软软的，连时间都变软了。午后和哥哥、小表弟一起爬青岛林、走玻璃栈道，晚上看《镖人》，散场快十一点，索性住在县城，你说这县城的夜景美。我想说，因为有你在我身边，我只觉这夜景该和你一起赏才叫热闹。\n' +
            '     初六上午，去秦嘉徐淑公园。石像、石碑，还有那些千年前的情诗——这地方，该和你一起来。又登清凉寺，香火虽淡，铜铃随风作响，叮叮当当的，心里很静。随后我们便回了长安。\n' +
            '     这四天很短，短到一个人从西安到通渭，也足够把你从客人变成家人。'
    },
    {
        title: '第一个情人节',
        date: '2026.02.12',
        writer: '传',
        content:
            '亲爱的燕，今天是我们在一起的第一个情人节，唯一的遗憾是我们此时不在各自的身边。\n如果我们注定要最终走到一起,这种遗憾根本不算什么。我们一直在向一个共同的目标努力着，这个过程会有一个接一个的考验和挑战。都说生活就是问题叠着问题，这个过程又何尝不是不断解决一个接一个的问题呢，你说对吗？'
    },
    {
        title: '都第100天了呀',
        date: '2025.12.12',
        writer: '传',
        content:
            '亲爱的小燕燕，今天已经是我们在一起的第100天了！\n 这100天里，也没有我们一开始想象的那样一切顺利。从一开始觉得进展太过迅速而让我们彼此觉得太过不真实，到现在度过了三个月的热恋期后，已经慢慢的认识到这种感觉的真实。\n这100天里，我们一起度过了很多属于我们难忘的第一次，未来也会继续有更多这样的第一次。我们也同样有过一些争吵和矛盾，但我觉得那都是我们彼此之间了解真实的对方所必经的过程。巨蟹与处女，两个同样敏感在意细节的人，都愿意将自己的爱完全倾注于对方。那么在困难面前，我也希望我们可以携手用这份爱跨过面前的障碍！\n这100天里，我所认识的燕一直都是那样的活泼，爱笑，乐观向上。她总是会开玩笑，总是会考虑我的感受，总是憋不住想我，会让我觉得稍稍有那么一丢丢粘人。但我的内心其实是无比幸福的！因为从来没有人会这么想让我真正融入她的生活，成为她生命中至关重要的人之一。而我，因为我的病，也许确实在感情方面不是很主动很热情，偶尔也会惹你生气，但我觉得你心里明白我的内心是什么样的。我从来不会把任何人对我的付出和给予当作理所当然，我会让她觉得她所做的一切我都会反馈给她，更何况是我最亲爱的燕。\n亲爱的燕，这只是我们的第一个百天，我期待着更多次的百天，越多越好，与你一起~'
    },
    {
        title: '理想的恋爱模式',
        date: '2025.11.03',
        writer: '燕',
        content:
            '有时候我会多次想象我想要的谈恋爱模式咋样的，我觉得就像我们俩所相处的这般，偶尔聊聊过往趣事，偶尔吐槽工作中的小烦恼，知道对方可能不能完全做到感同身受，但能认真听他（她）讲讲，已经很有意思了，了解彼此的饮食习惯和爱好，窝在沙发上看电影，时不时听你哼歌，真的好听，欢迎在我耳边多绕会儿，虽然你知道自己很优秀，但我还是要再夸夸你，多贴心多有生活 一男孩呀，就让我给遇见了☺️'
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
                        <div class="entry-date">
                            <span>{{ entry.date }}</span>
                            <span>{{ entry.writer }}</span>
                        </div>
                    </div>
                </div>

                <!-- 右侧日记内容 -->
                <div class="content-panel">
                    <div class="content-header">
                        <div class="header-row">
                            <div class="title">{{ selectedEntry.title }}</div>
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
                        <p class="date">{{ selectedEntry.date }}</p>
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
            gap: 14px;
            @media (max-width: 768px) {
                flex-direction: column;
            }

            // 左侧日记目录面板
            .entries-panel {
                flex: none;
                width: 230px;
                background: rgba(255, 250, 236, 0.6);
                border-radius: 15px;
                padding: 14px;
                box-shadow: 0 8px 20px rgba(139, 69, 19, 0.3);
                height: fit-content;
                max-height: 4rem;
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
                        font-size: 19px;
                        color: var(--autumn-brown);
                        margin-bottom: 8px;
                        font-family: 'Georgia', serif;
                    }

                    .entry-date {
                        font-size: 16px;
                        color: var(--autumn-red);
                        font-style: italic;
                        display: flex;
                        justify-content: space-between;
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
                        justify-content: center;
                        align-items: center;
                        position: relative;

                        .title {
                            flex: 1;
                            color: var(--autumn-brown);
                            font-size: 26px;
                            font-weight: bold;
                            font-family: 'Georgia', serif;
                            letter-spacing: 1px;
                            text-align: center;
                        }
                    }
                }

                .content-text {
                    scrollbar-width: none;
                    &::-webkit-scrollbar {
                        display: none; /* 直接隐藏滚动条 */
                    }
                    color: var(--autumn-brown);
                    font-size: 22px;
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
                        padding: 10px 32px 0 0;
                    }
                    .date {
                        font-family: 'Georgia', 'Times New Roman', serif;
                        text-align: right;
                        font-style: italic;
                    }
                }
            }
        }
    }
}
</style>

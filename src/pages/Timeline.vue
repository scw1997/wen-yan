<script setup lang="ts">
import GlobalFalling from '@/components/GlobalFalling.vue';
import Image from '@/components/Image.vue';

interface TimelineEvent {
    date: string;
    title: string;
    description: string;
    image?: string;
}

const timelineEvents: TimelineEvent[] = [
    {
        date: '2025-08-27',
        title: '彼此加上微信',
        description: '彼时仍是酷日盛夏，我们的故事悄然开始...'
    },
    {
        date: '2025-08-30',
        title: '第一次组队打王者',
        description: '这个狄仁杰，Emm...似乎有点菜🤣'
    },
    {
        date: '2025-08-31',
        title: '第一次见面',
        description:
            '骑着小黄车，我在前，她在后，漫步在老菜场，听完Live版《枫》，再请教彼此的拍照技术'
    },
    {
        date: '2025-09-02',
        title: '第一次来她家作客',
        description:
            '第一次尝到她的土豆泥拌面，顺便给她修了下电脑，装了一个叫植物大战僵尸的游戏。美中不足的是晚上的另一个小插曲~'
    },
    {
        date: '2025-09-04',
        title: '正式确认了关系',
        description: '"我不知道，就是想让你留下来"'
    },
    {
        date: '2025-09-06',
        title: '她第一次来我家作客',
        description:
            '天啊，我第一次收到了女孩子送的百合花🙈！\n' +
            '第一次和女生在家吃火锅（还是一天两次）\n' +
            '第一次留宿她\n'
    },
    {
        date: '2025-09-07',
        title: '第一次一起做饭',
        description:
            '她的辣椒炒肉，我的酸辣土豆丝+番茄炒蛋，可惜米饭硬了点😅~\n' +
            '第一次有女生陪我收拾家务\n' +
            '第一次有女生给我按摩 \n' +
            '第一次打乒乓被女生虐了...😠 '
    },
    {
        date: '2025-09-08',
        title: '第一次工作日她中午过来陪我吃饭',
        description: '我还能说什么呢，当然要亲自迎接人家😊'
    },
    {
        date: '2025-09-11',
        title: '第一次把人家整哭了',
        description: '聊到了一些伤心难过的话题，我的错🥺'
    },
    {
        date: '2025-09-12',
        title: '第一次一起去逛公园',
        description: '用我的手机给人脸都拍的糊成啥了，尴尬😳'
    },
    {
        date: '2025-09-13',
        title: '给她录了专属闹钟铃声',
        description: '“太阳都晒屁股啦，再不起床打你屁股！”'
    },
    {
        date: '2025-09-14',
        title: '第一次去她单位',
        description: '我坐在凳子上一句话不敢说，只能假装看书~\n晚上在钟楼前留下了我们的光影'
    },
    {
        date: '2025-09-20',
        title: '第一次用她的建议给我妈送花',
        description: '我妈不敢相信😮，直言这肯定是她的主意'
    },
    {
        date: '2025-09-24',
        title: '第一次陪她过生日🍰',
        description: '0点的文字祝福，生日祝福网页，玫瑰花，动物奶油蛋糕，文房四宝组成了难忘的一天'
    },
    {
        date: '2025-09-26',
        title: '第一次去吃牛排自助',
        description: '单人99元的肉质真不错，吃不动了人家西部牛仔小哥还在投喂呢...'
    },
    {
        date: '2025-09-28',
        title: '第一次给她父母寄了中秋礼品',
        description: '临潼特色软籽石榴 + 泾阳特色茯茶，希望她的家人喜欢😄'
    },
    {
        date: '2025-09-29',
        title: '她第一次给我妈买了礼物',
        description: '她记得我妈腰背不好，买了两种按摩仪，晚上一起试试哪种好用'
    },
    {
        date: '2025-09-30',
        title: '我说错了话，脑子瓦特了😔',
        description: '因为按摩仪的事我不该这样处理，都是我的问题，忽视了她的付出'
    },
    {
        date: '2025-10-02',
        title: '她第一次来见了我的家人',
        description: '太自然了，朵朵第一天就黏上了她，之前礼物选的真是棒🤪~'
    },
    {
        date: '2025-10-03',
        title: '太平国家森林公园一日游',
        description:
            '中途赶上了蒙蒙细雨，不过为了飞天瀑布出片也是拼了😎\n晚上一起制作了我们的干花相框'
    },
    {
        date: '2025-10-09',
        title: '第一次一起吃纸包鱼',
        description: '也是第一次知道了还有奶啤这么个饮料'
    },
    {
        date: '2025-10-14',
        title: '第一次给她做茄丁面',
        description: '我的拿手好戏怎么会轻易翻车呢'
    },
    {
        date: '2025-10-18',
        title: '第一次一起包饺子',
        description: '洋芋丁馅的饺子果然很好吃'
    },
    {
        date: '2025-10-19',
        title: '卡通画头像 + 炒馒头',
        description: '她是如此的又是如此地有才华'
    },
    {
        date: '2025-10-24',
        title: '她第一次给我留了早餐纸条',
        description: '”要吃早餐哟！晚上见“'
    },
    {
        date: '2025-10-26',
        title: '昆明池一日游',
        description: '一张张的粉黛🌸丽人大片！'
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
                    :key="event.date"
                    :class="['timeline-item', index % 2 === 0 ? 'left' : 'right']"
                >
                    <div class="timeline-card">
                        <div class="card-date">{{ event.date }}</div>
                        <h3 class="card-title">{{ event.title }}</h3>

                        <!--                        &lt;!&ndash; 图片展示 &ndash;&gt;-->
                        <!--                        <Image v-if="event.image" :url="event.image" :alt="event.title" />-->

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
                        //:deep {
                        //    .image-component {
                        //        padding: 6px 0;
                        //        margin-left: auto;
                        //    }
                        //    img {
                        //        max-height: 2rem;
                        //    }
                        //}
                    }
                }

                &.right {
                    left: 50%;
                    padding-left: 20px;
                    text-align: left;
                }

                .timeline-card {
                    max-width: 80%;
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
                        line-height: 1.7;
                        white-space: pre-line;
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

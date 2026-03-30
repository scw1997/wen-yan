<script setup lang="ts">
import GlobalFalling from '@/components/GlobalFalling.vue';

interface TimelineEvent {
    date: string;
    title: string;
    description: string;
}

const timelineEvents: TimelineEvent[] = [
    {
        title: '第一次一起做包子',
        date: '2026.03.28',
        description: '我和馅来你擀皮~最后相当成功！'
    },
    {
        title: '重庆之旅',
        date: '2026.03.18',
        description:
            '山城雾都，逛街堪比爬山！仙女山，天生三桥，九黎城，乌江，十八梯，李子坝...洪崖洞人忒多,火锅都吃了两顿'
    },
    {
        date: '2026-02-19',
        title: '第一次来到你老家',
        description:
            '乡村的宁静旷野和你家人的淳朴热情，属实是一段难忘的旅程！对了，还在县城住了一晚，啧啧啧~'
    },
    {
        date: '2026-02-12',
        title: '第一个情人节',
        description:
            '互相挑选了送给对方的礼物，提前过的导致这孩子14号那天在老家又突然感性，情绪上来了~'
    },
    {
        date: '2026-02-06',
        title: '第一次见了你哥',
        description: '你这孩子，第一次吃饭还让人哥破费了。非拦着我不让我付钱，陷我于不义啊！'
    },
    {
        date: '2026-01-24',
        title: '广仁寺的祈福墙',
        description:
            '在广仁寺的祈福墙留下我们的愿望，晚上欣赏完不夜城灯光秀，又漫无目的地在广场一起游荡~~'
    },
    {
        date: '2026-01-17',
        title: '偷偷溜进某高校 + 第一次现场观看职业篮球比赛',
        description:
            '大操场把我们又带回了大学时光，临别之际又邂逅了几只黑天鹅🦢。晚上的篮球比赛很精彩，双方战至最后一刻！'
    },
    {
        date: '2026-01-01',
        title: '第一次一起见了我爸',
        description: '哈哈，我爸脚力太强了，走路把你给走迷糊了😵'
    },
    {
        date: '2025-12-31',
        title: '第一次一起跨年',
        description: '可惜今年西安限流封禁了，赶到诗经里却已经提前结束了😭，把咱俩给冻得！'
    },
    {
        date: '2025-12-25',
        title: '第一次一起过圣诞',
        description: '逛完老城根，阴差阳错得买了一份🍓蛋糕，可是我吃不动了啊，姐们儿😭'
    },
    {
        date: '2025-12-17',
        title: '我的手也被我的切药器划伤了😭',
        description: '这回旋镖，啪啪打脸啊~'
    },
    {
        date: '2025-12-06',
        title: '海德小镇的夜晚',
        description: '”那是圣诞老人🎅，不是雪人⛄！“欧式圣诞风格真不错。'
    },
    {
        date: '2025-11-29',
        title: '终南山南五台一日爬',
        description: '你天天都在想着去，没想到脚力确实不错啊，成功登顶⛰！'
    },
    {
        date: '2025-11-26',
        title: '你的手被我的切药器划伤了',
        description: '安慰你的同时我在劝你以后小心点，你看我咋就没划伤过'
    },
    {
        date: '2025-11-22',
        title: '第一次一起做DIY',
        description: '蜡笔小新佛爷版手工DIY。你的手工配色调的不错啊'
    },
    {
        date: '2025-11-15',
        title: '汉景帝阳陵博物院一日游',
        description: '又是一张张的深秋银杏林🍁大片，新手机拍照真不错'
    },
    { date: '2025-11-13', title: '你第一次陪我加班到了晚上8点半', description: '这孩子，真傻' },
    {
        date: '2025-11-09',
        title: '手机丢失的难过一晚',
        description: '好在第二天陪你把手机卡都办妥了，有我在呢'
    },
    {
        date: '2025-11-01',
        title: '第一次给你的本名英雄买了件衣服',
        description: 'Emm...0-9的狄仁杰缺衣服穿了😉'
    },
    {
        date: '2025-10-31',
        title: '第一次一起去K歌',
        description: '这孩子非要让我唱《枫》，降调都唱不上去，上炕都费劲😭'
    },
    {
        date: '2025-10-30',
        title: '第一次给你做油泼面',
        description: '油泼面+凉粉+牛筋面，好一个豪华重油辣套餐！'
    },
    { date: '2025-10-24', title: '你第一次给我留了早餐纸条', description: '”要吃早餐哟！晚上见“' },
    {
        date: '2025-10-19',
        title: '你给咱弄了卡通画头像',
        description: '你是如此的又是如此地有才华'
    },
    { date: '2025-10-18', title: '第一次一起包饺子', description: '洋芋丁馅的饺子果然很好吃' },
    {
        date: '2025-10-14',
        title: '第一次给你做茄丁面',
        description: '我的拿手好戏怎么会轻易翻车呢'
    },
    {
        date: '2025-10-09',
        title: '第一次一起吃纸包鱼',
        description: '也是第一次知道了还有奶啤这么个饮料'
    },
    {
        date: '2025-10-03',
        title: '第一次制作了我们的干花相框',
        description: '我这一点经验都没有，全程给你打下手'
    },
    {
        date: '2025-10-02',
        title: '你第一次来见了我的家人',
        description: '太自然了，朵朵第一天就黏上了你，之前礼物选的真是棒🤪~'
    },
    {
        date: '2025-09-29',
        title: '你第一次给我妈买了礼物',
        description: '你记得我妈腰背不好，买了两种按摩仪，晚上一起试试哪种好用'
    },
    {
        date: '2025-09-28',
        title: '第一次给你父母寄了中秋礼品',
        description: '临潼特色软籽石榴 + 泾阳特色茯茶，希望你的家人喜欢😄'
    },
    {
        date: '2025-09-24',
        title: '第一次陪你过生日🍰',
        description: '0点的文字祝福，生日祝福网页，玫瑰花，动物奶油蛋糕，文房四宝组成了难忘的一天'
    },
    {
        date: '2025-09-13',
        title: '给你录了专属闹钟铃声',
        description: '“太阳都晒屁股啦，再不起床打你屁股！”'
    },
    {
        date: '2025-09-12',
        title: '第一次一起去逛公园',
        description: '用我的手机给人脸都拍的糊成啥了，尴尬😳'
    },
    {
        date: '2025-09-11',
        title: '第一次把你整哭了',
        description: '聊到了一些伤心难过的话题，我的错🥺'
    },
    {
        date: '2025-09-08',
        title: '第一次工作日你中午过来陪我吃饭',
        description: '我还能说什么呢，当然要亲自迎接人家😊'
    },
    {
        date: '2025-09-07',
        title: '第一次一起做饭',
        description:
            '你的辣椒炒肉，我的酸辣土豆丝+番茄炒蛋，可惜米饭硬了点😅~\n第一次有女生陪我收拾家务\n第一次有女生给我按摩 \n第一次打乒乓被女生虐了...😠 '
    },
    {
        date: '2025-09-06',
        title: '你第一次来我家作客',
        description:
            '天啊，我第一次收到了女孩子送的百合花🙈！\n第一次和女生在家吃火锅（还是一天两次）\n第一次留宿你\n第一次与你一起整晚失眠'
    },
    { date: '2025-09-04', title: '正式确认了关系', description: '"我不知道，就是想让你留下来"' },
    {
        date: '2025-09-02',
        title: '第一次来你家作客',
        description:
            '第一次尝到你的土豆泥拌面，顺便给你修了下电脑，装了一个叫植物大战僵尸的游戏。美中不足的是晚上的另一个小插曲~'
    },
    {
        date: '2025-08-31',
        title: '第一次见面',
        description:
            '骑着小黄车，我在前，你在后，漫步在老菜场，听完Live版《枫》，再请教彼此的拍照技术'
    },
    {
        date: '2025-08-30',
        title: '第一次组队打王者',
        description: '这个狄仁杰，Emm...似乎有点菜🤣'
    },
    {
        date: '2025-08-27',
        title: '彼此加上微信',
        description: '彼时仍是酷日盛夏，我们的故事悄然开始...'
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
                    }
                }

                &.right {
                    left: 50%;
                    padding-left: 20px;
                    text-align: left;
                }

                .timeline-card {
                    max-width: 90%;
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
                        font-size: 16px;
                        color: var(--autumn-brown);
                        font-weight: bold;
                        margin-bottom: 5px;
                    }

                    .card-title {
                        color: var(--autumn-red);
                        font-size: 22px;
                        margin: 6px 0;
                        font-weight: bold;
                    }

                    .card-description {
                        color: var(--autumn-brown);
                        font-size: 18px;
                        line-height: 1.7;
                        white-space: pre-line;
                    }
                }
            }
        }
    }
}
</style>

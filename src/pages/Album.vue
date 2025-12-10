<script setup lang="ts">
import { ref } from 'vue';
import GlobalFalling from '@/components/GlobalFalling.vue';
import Image from '@/components/Image.vue';

interface Photo {
    title: string;
    url: string;
    style?: string;
}

interface Item {
    year: string;
    photoList: Photo[];
}

interface AlbumCategory {
    typeName: '生活' | '旅行' | '纪念';
    items: Item[];
}

// 相册分类数据
const albumCategories = ref<AlbumCategory[]>([
    {
        typeName: '生活',
        items: [
            {
                year: '2026',
                photoList: [
                    {
                        title: '海边漫步',
                        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop'
                    },
                    {
                        title: '山顶日出',
                        url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=400&fit=crop'
                    },
                    {
                        title: '山顶日出',
                        url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=400&fit=crop'
                    }
                ]
            }
        ]
    },
    {
        typeName: '旅行',
        items: [
            {
                year: '2026',
                photoList: [
                    {
                        title: '情人节',
                        url: 'https://images.unsplash.com/photo-1518681731556-00195d87d958?w=400&h=400&fit=crop'
                    }
                ]
            },
            {
                year: '2025',
                photoList: [
                    {
                        title: '圣诞礼物',
                        url: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=400&h=400&fit=crop'
                    }
                ]
            }
        ]
    },
    {
        typeName: '纪念',
        items: [
            {
                year: '2026',
                photoList: [
                    {
                        title: '温馨早餐',
                        url: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=400&h=400&fit=crop'
                    },
                    {
                        title: '午后阳光',
                        url: 'https://images.unsplash.com/photo-1499084733843-6aaea41dad0c?w=400&h=400&fit=crop'
                    }
                ]
            }
        ]
    }
]);

// 当前选中的分类
const selectedCategory = ref<AlbumCategory>(albumCategories.value[0]);

// 展开状态记录
const expandedYears = ref<Record<string, boolean>>({});

// 切换年份展开/折叠状态
const toggleYearExpansion = (year: string) => {
    expandedYears.value[year] = !expandedYears.value[year];
};

// 检查年份是否展开
const isYearExpanded = (year: string) => {
    return expandedYears.value[year] !== false; // 默认展开
};

// 选择分类
const selectCategory = (category: AlbumCategory) => {
    selectedCategory.value = category;
};
</script>

<template>
    <GlobalFalling />
    <div class="album-container">
        <div class="album-content">
            <!-- 统一的相册面板容器 -->
            <div class="album-panel">
                <!-- 顶部 Tab 栏 -->
                <div class="categories-tabs">
                    <div
                        v-for="category in albumCategories"
                        :key="category.typeName"
                        :class="[
                            'tab-item',
                            { active: category.typeName === selectedCategory.typeName }
                        ]"
                        @click="selectCategory(category)"
                    >
                        {{ category.typeName }}
                        <span class="photo-count">
                            {{
                                category.items.reduce(
                                    (total, item) => total + item.photoList.length,
                                    0
                                )
                            }}
                        </span>
                    </div>
                </div>

                <!-- 照片列表 -->
                <div class="photos-panel">
                    <div v-for="item in selectedCategory.items" :key="item.year" class="year-group">
                        <div class="year-header" @click="toggleYearExpansion(item.year)">
                            <h2 class="year-title">{{ item.year }}年</h2>
                            <span class="expand-icon">
                                {{ isYearExpanded(item.year) ? '−' : '+' }}
                            </span>
                        </div>

                        <div v-show="isYearExpanded(item.year)" class="masonry-layout">
                            <div
                                v-for="photo in item.photoList"
                                :key="photo.url"
                                class="masonry-item"
                            >
                                <div class="photo-card">
                                    <div class="photo-frame">
                                        <Image
                                            :url="photo.url"
                                            :alt="photo.title"
                                            :img-style="photo.style ?? 'width:2rem;height:2rem'"
                                        />
                                    </div>
                                    <!--                                    <div class="photo-info">-->
                                    <!--                                        <h3 class="photo-title">{{ photo.title }}</h3>-->
                                    <!--                                    </div>-->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.album-container {
    position: relative;
    min-height: 100%;
    width: 100%;

    .album-content {
        position: relative;
        max-width: 1200px;
        margin: 0 auto;
        padding: 16px;
        //@media (max-width: 1200px) {
        //    padding: 20px;
        //}

        // 统一的相册面板容器
        .album-panel {
            background: rgba(255, 250, 236, 0.6);
            border-radius: 15px;
            box-shadow: 0 8px 20px rgba(139, 69, 19, 0.3);
            border: 2px solid #d2b48c;
            position: relative;
            padding: 18px;

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

            // 顶部 Tab 栏
            .categories-tabs {
                display: flex;
                justify-content: center;
                border-radius: 10px;
                position: relative;
                flex-wrap: wrap;
                margin-bottom: 20px;

                .tab-item {
                    padding: 12px 16px;
                    margin: 5px;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 16px;
                    color: var(--autumn-brown);
                    background: rgba(255, 255, 255, 0.7);
                    border: 1px solid #d2b48c;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    position: relative;
                    overflow: hidden;
                    z-index: 4; // 确保Tab在面板之上

                    &:hover {
                        background: rgba(255, 182, 106, 0.5);
                        transform: translateY(-2px);
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
                    }

                    &.active {
                        background: linear-gradient(135deg, var(--autumn-yellow) 0%, #ff8c00 100%);
                        color: white;
                        font-weight: bold;
                        box-shadow: 0 4px 10px rgba(139, 69, 19, 0.3);
                        border-color: var(--autumn-brown);
                    }

                    .photo-count {
                        background: var(--autumn-brown);
                        color: white;
                        border-radius: 50%;
                        width: 26px;
                        height: 26px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 12px;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                        margin-left: 8px;
                    }
                }
            }

            // 照片面板
            .photos-panel {
                border-radius: 10px;
                //padding: 10px;

                .year-group {
                    margin-bottom: 20px;

                    .year-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 10px 15px;
                        background: rgba(210, 180, 140, 0.3);
                        border-radius: 8px;
                        cursor: pointer;
                        margin-bottom: 15px;
                        transition: background 0.3s ease;

                        &:hover {
                            background: rgba(210, 180, 140, 0.5);
                        }

                        .year-title {
                            margin: 0;
                            color: var(--autumn-brown);
                            font-size: 20px;
                            font-weight: bold;
                        }

                        .expand-icon {
                            font-size: 24px;
                            font-weight: bold;
                            color: var(--autumn-brown);
                        }
                    }
                }

                .masonry-layout {
                    display: flex;
                    flex-wrap: wrap;
                    .masonry-item {
                        flex: none;
                        &:not(:first-child) {
                            padding-left: 16px;
                        }

                        .photo-card {
                            border-radius: 8px;
                            overflow: hidden;
                            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                            background: white;
                            transition:
                                transform 0.3s ease,
                                box-shadow 0.3s ease;

                            &:hover {
                                transform: translateY(-5px);
                                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
                            }

                            .photo-info {
                                padding: 12px;

                                .photo-title {
                                    color: var(--autumn-brown);
                                    font-size: 16px;
                                    font-weight: bold;
                                    margin: 0 0 6px 0;
                                    font-family: 'Georgia', serif;
                                }

                                .photo-date {
                                    color: var(--autumn-red);
                                    font-size: 13px;
                                    margin: 0;
                                    font-style: italic;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>

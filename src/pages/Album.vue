<script setup lang="ts">
import { ref } from 'vue';
import GlobalFalling from '@/components/GlobalFalling.vue';
import { albumCategories } from '@/pages/photoList';
import ImageList from '@/components/ImageList.vue';
import type { AlbumCategory, Item } from '@/types/album';

// 已移动到 src/types/album.ts 文件中

// 当前选中的分类
const selectedCategory = ref<AlbumCategory>(albumCategories[0]);

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
                            <ImageList :images="item.photoList" />
                            <!--                            <div-->
                            <!--                                v-for="photo in item.photoList"-->
                            <!--                                :key="photo.url"-->
                            <!--                                class="masonry-item"-->
                            <!--                            >-->
                            <!--                                <div class="photo-card">-->
                            <!--                                    <div class="photo-frame">-->
                            <!--                                        <Image-->
                            <!--                                            :url="photo.url"-->
                            <!--                                            alt=""-->
                            <!--                                            :img-style="photo.style ?? 'width:2rem;height:2rem'"-->
                            <!--                                        />-->
                            <!--                                    </div>-->
                            <!--                                    &lt;!&ndash;                                    <div class="photo-info">&ndash;&gt;-->
                            <!--                                    &lt;!&ndash;                                        <h3 class="photo-title">{{ photo.title }}</h3>&ndash;&gt;-->
                            <!--                                    &lt;!&ndash;                                    </div>&ndash;&gt;-->
                            <!--                                </div>-->
                            <!--                            </div>-->
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
                    font-size: 18px;
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
                        width: 34px;
                        height: 34px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 14px;
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
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>

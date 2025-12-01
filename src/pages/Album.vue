<script setup lang="ts">
import { ref } from 'vue';
import GlobalFalling from '@/components/GlobalFalling.vue';

interface Photo {
    id: number;
    title: string;
    date: string;
    url: string;
}

interface AlbumCategory {
    id: number;
    name: string;
    photos: Photo[];
}

// 相册分类数据
const albumCategories = ref<AlbumCategory[]>([
    {
        id: 1,
        name: '恋爱时光',
        photos: [
            {
                id: 1,
                title: '初次相遇',
                date: '2025-09-04 18:30',
                url: 'https://images.unsplash.com/photo-1573496358961-3c82838ef664?w=400&h=400&fit=crop'
            },
            {
                id: 2,
                title: '第一次约会',
                date: '2025-10-15 14:20',
                url: 'https://images.unsplash.com/photo-1465059520946-72d97538d8f4?w=400&h=400&fit=crop'
            },
            {
                id: 3,
                title: '浪漫晚餐',
                date: '2025-11-08 20:15',
                url: 'https://images.unsplash.com/photo-1515544876196-0f0a18cf62fc?w=400&h=400&fit=crop'
            }
        ]
    },
    {
        id: 2,
        name: '旅行足迹',
        photos: [
            {
                id: 4,
                title: '海边漫步',
                date: '2026-01-05 16:45',
                url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop'
            },
            {
                id: 5,
                title: '山顶日出',
                date: '2026-02-18 07:30',
                url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=400&fit=crop'
            }
        ]
    },
    {
        id: 3,
        name: '节日纪念',
        photos: [
            {
                id: 6,
                title: '圣诞礼物',
                date: '2025-12-24 21:00',
                url: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=400&h=400&fit=crop'
            },
            {
                id: 7,
                title: '情人节',
                date: '2026-02-14 19:30',
                url: 'https://images.unsplash.com/photo-1518681731556-00195d87d958?w=400&h=400&fit=crop'
            }
        ]
    },
    {
        id: 4,
        name: '日常点滴',
        photos: [
            {
                id: 8,
                title: '温馨早餐',
                date: '2026-03-10 08:15',
                url: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=400&h=400&fit=crop'
            },
            {
                id: 9,
                title: '午后阳光',
                date: '2026-04-02 15:20',
                url: 'https://images.unsplash.com/photo-1499084733843-6aaea41dad0c?w=400&h=400&fit=crop'
            }
        ]
    }
]);

// 当前选中的分类
const selectedCategory = ref<AlbumCategory>(albumCategories.value[0]);

// 选择分类
const selectCategory = (category: AlbumCategory) => {
    selectedCategory.value = category;
};
</script>

<template>
    <GlobalFalling />
    <div class="album-container">
        <div class="album-content">
            <div class="album-layout">
                <!-- 左侧分类 -->
                <div class="categories-panel">
                    <div
                        v-for="category in albumCategories"
                        :key="category.id"
                        :class="['category-item', { active: category.id === selectedCategory.id }]"
                        @click="selectCategory(category)"
                    >
                        {{ category.name }}
                        <span class="photo-count">{{ category.photos.length }}</span>
                    </div>
                </div>

                <!-- 右侧照片列表 -->
                <div class="photos-panel">
                    <h2 class="category-title">{{ selectedCategory.name }}</h2>
                    <div class="photos-grid">
                        <div
                            v-for="photo in selectedCategory.photos"
                            :key="photo.id"
                            class="photo-item"
                        >
                            <div class="photo-frame">
                                <img :src="photo.url" :alt="photo.title" />
                            </div>
                            <div class="photo-info">
                                <h3 class="photo-title">{{ photo.title }}</h3>
                                <p class="photo-date">{{ photo.date }}</p>
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
    padding: 20px;

    .album-content {
        position: relative;
        z-index: 2;
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;

        .album-layout {
            display: flex;
            gap: 20px;
            min-height: 500px;

            // 左侧分类面板
            .categories-panel {
                flex: none;
                width: 200px;
                background: rgba(255, 250, 236, 0.8);
                border-radius: 10px;
                padding: 15px;
                box-shadow: 0 4px 10px rgba(139, 69, 19, 0.2);
                height: fit-content;

                .category-item {
                    padding: 12px 15px;
                    margin-bottom: 8px;
                    border-radius: 6px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 16px;
                    color: var(--autumn-brown);

                    &:hover {
                        background: rgba(255, 182, 106, 0.3);
                    }

                    &.active {
                        background: var(--autumn-yellow);
                        color: white;
                        font-weight: bold;
                    }

                    .photo-count {
                        background: var(--autumn-brown);
                        color: white;
                        border-radius: 50%;
                        width: 24px;
                        height: 24px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 12px;
                    }
                }
            }

            // 右侧照片面板
            .photos-panel {
                flex: 1;
                background: rgba(255, 250, 236, 0.8);
                border-radius: 10px;
                padding: 20px;
                box-shadow: 0 4px 10px rgba(139, 69, 19, 0.2);

                .category-title {
                    color: var(--autumn-brown);
                    font-size: 24px;
                    margin-bottom: 20px;
                    padding-bottom: 10px;
                    border-bottom: 2px solid var(--autumn-yellow);
                }

                .photos-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
                    gap: 20px;

                    .photo-item {
                        .photo-frame {
                            width: 100%;
                            height: 200px;
                            border-radius: 8px;
                            overflow: hidden;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                            margin-bottom: 10px;

                            img {
                                width: 100%;
                                height: 100%;
                                object-fit: cover;
                                transition: transform 0.3s ease;

                                &:hover {
                                    transform: scale(1.05);
                                }
                            }
                        }

                        .photo-info {
                            .photo-title {
                                color: var(--autumn-brown);
                                font-size: 16px;
                                font-weight: bold;
                                margin: 0 0 5px 0;
                            }

                            .photo-date {
                                color: var(--autumn-red);
                                font-size: 14px;
                                margin: 0;
                            }
                        }
                    }
                }
            }
        }
    }

    // 响应式设计
    @media (max-width: 768px) {
        .album-container {
            padding: 10px;

            .album-content {
                padding: 10px;

                .album-layout {
                    flex-direction: column;

                    .categories-panel {
                        width: auto;
                        margin-bottom: 20px;
                        flex: 0 0 auto;
                    }

                    .photos-panel {
                        flex: 0 0 auto;
                    }
                }
            }
        }
    }
}
</style>

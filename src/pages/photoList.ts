// 相册分类数据
import type { AlbumCategory } from '@/typings/album';
type PhotoListType = Array<{
    url: string;
    thumbUrl?: string;
}>;

const getPhotoList = (
    type: 'daily' | 'journey' | 'commemorate',
    start: number,
    end: number,
    pngNumList?: number[],
    movNumList?: number[],
    mp4NumList?: number[]
) => {
    const photoList: PhotoListType = [];
    for (let i = end; i >= start; i--) {
        const noAffixPath = `${SWICO_STATIC_PUBLIC_PATH}${type}/${i.toString().padStart(4, '0')}`;
        if (movNumList?.includes(i)) {
            photoList.push({
                url: `${noAffixPath}.mov`,
                thumbUrl: `${noAffixPath}_thumb.png`
            });
        } else if (mp4NumList?.includes(i)) {
            photoList.push({
                url: `${noAffixPath}.mp4`,
                thumbUrl: `${noAffixPath}_thumb.png`
            });
        } else if (pngNumList?.includes(i)) {
            photoList.push({
                url: `${noAffixPath}.png`
            });
        } else {
            photoList.push({
                url: `${noAffixPath}.jpg`
            });
        }
    }
    return photoList;
};

export const albumCategories: AlbumCategory[] = [
    {
        typeName: '生活',
        items: [
            {
                year: '2026',
                photoList: getPhotoList('daily', 36, 40)
            },
            {
                year: '2025',
                photoList: getPhotoList(
                    'daily',
                    1,
                    35,
                    [1, 2, 3, 4, 5, 8, 9, 19, 24, 27, 28, 30, 31, 32, 33, 34],
                    [6, 20, 22]
                )
            }
        ]
    },
    {
        typeName: '旅行',
        items: [
            {
                year: '2026',
                photoList: getPhotoList('journey', 148, 198, [], [190, 196], [189])
            },
            {
                year: '2025',
                photoList: getPhotoList(
                    'journey',
                    1,
                    147,
                    [
                        2, 10, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
                        37, 38, 39, 40, 41, 42, 43, 44, 46, 47, 48, 55, 56, 113, 132
                    ],
                    [],
                    [13, 15, 17, 82]
                )
            }
        ]
    },
    {
        typeName: '纪念',
        items: [
            {
                year: '2026',
                photoList: getPhotoList('commemorate', 12, 14)
            },
            {
                year: '2025',
                photoList: getPhotoList('commemorate', 1, 11, [10])
            }
        ]
    }
];

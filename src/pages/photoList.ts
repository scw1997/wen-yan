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
                photoList: getPhotoList('daily', 19, 22)
            },
            {
                year: '2025',
                photoList: getPhotoList('daily', 1, 18, [1, 3, 8, 12, 15, 16, 17, 18], [2, 9, 10])
            }
        ]
    },
    {
        typeName: '旅行',
        items: [
            {
                year: '2026',
                photoList: getPhotoList('journey', 63, 99, [], [84, 99], [82])
            },
            {
                year: '2025',
                photoList: getPhotoList(
                    'journey',
                    1,
                    62,
                    [4, 8, 9, 10, 11, 12, 13, 14],
                    [],
                    [5, 6, 35]
                )
            }
        ]
    },
    {
        typeName: '纪念',
        items: [
            {
                year: '2026',
                photoList: getPhotoList('commemorate', 8, 9)
            },
            {
                year: '2025',
                photoList: getPhotoList('commemorate', 1, 7, [7])
            }
        ]
    }
];

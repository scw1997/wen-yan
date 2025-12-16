export interface Item {
    year: string;
    photoList: ImageItem[];
}

export interface ImageItem {
    url: string;
    previewUrl?: string;
    thumbUrl?: string;
    alt?: string;
}

export interface AlbumCategory {
    typeName: '生活' | '旅行' | '纪念';
    items: Item[];
}

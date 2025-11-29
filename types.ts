
export enum AspectRatio {
    LANDSCAPE = '16:9',
    PORTRAIT = '9:16'
}

export enum ImageSize {
    SIZE_1K = '1K',
    SIZE_2K = '2K',
    SIZE_4K = '4K'
}

export interface GeneratedVideo {
    uri: string;
}

export interface GeneratedImage {
    url: string;
    mimeType: string;
}

// Navigation types
export enum View {
    HOME = 'HOME',
    ACOUSTIC = 'ACOUSTIC',
    DIGITAL_TWIN = 'DIGITAL_TWIN',
    AI_ECOLOGY = 'AI_ECOLOGY'
}

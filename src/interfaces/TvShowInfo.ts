export interface Image {
    medium: string;
}

export interface Show {
    id: number;
    name: string;
    image: Image
    summary: string;
}

export interface TvShowInfo{
    show: Show;
}


export type TMDBVideosPlatforms = "YouTube" | "Vimeo";

export interface TMDBVideos {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: TMDBVideosPlatforms;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
}

export interface TMDBVideosResponse {
    id: number;
    results: TMDBVideos[];
}

import { TMDBVideosResponse } from "./TMDBVideos";

export type MovieStatus =
    | "Rumored"
    | "Planned"
    | "In Production"
    | "Post Production"
    | "Released"
    | "Canceled";

export interface TMDBMoviesDetails {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: string | null;
    budget: number;
    genres: {
        id: number;
        name: string;
    }[];
    homepage: string | null;
    id: number;
    imdb_id: string | null;
    original_language: string;
    original_title: string;
    overview: string | null;
    popularity: number;
    poster_path: string | null;
    production_companies: {
        id: number;
        logo_path: string | null;
        name: string;
        origin_country: string;
    }[];
    production_countries: {
        iso_3166_1: string;
        name: string;
    }[];
    release_date: string;
    revenue: number;
    runtime: number | null;
    spoken_languages: {
        english_name: string;
        iso_639_1: string;
        name: string;
    }[];
    status: MovieStatus;
    tagline: string | null;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface TMDBMoviesDetailsIncluded {
    details: TMDBMoviesDetails;
    videos: TMDBVideosResponse;
}

export interface TMDBMovies {
    id: number;
    title: string;
    original_title: string;
    overview: string;
    release_date: string;
    poster_path: string | null;
    backdrop_path: string | null;
    popularity: number;
    vote_average: number;
    vote_count: number;
    genre_ids: number[];
    original_language: string;
    adult: boolean;
    video: boolean;
}

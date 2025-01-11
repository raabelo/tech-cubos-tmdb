import { TMDBMovies } from "./TMDBMovies";

export interface TMDBSearchResponse {
    page: number;
    results: TMDBMovies[];
    total_results: number;
    total_pages: number;
}

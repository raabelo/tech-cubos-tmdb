import axios, { AxiosError, AxiosInstance } from "axios";
import { getCurrentLanguage } from "../utils/translations/i18n";
import { TMDBSearchResponse } from "../types/TMDBSearch";
import { TMDBMoviesDetailsIncluded } from "../types/TMDBMovieDetails";
import { TMDBGenresResponse } from "../types/TMDBGenres";
import { toast } from "react-toastify";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const posterBaseUrl = "https://image.tmdb.org/t/p/w500";
export const backdropBaseUrl = "https://image.tmdb.org/t/p/w1280";

class tmdbService {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: TMDB_BASE_URL,
            params: {
                api_key: TMDB_API_KEY,
            },
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private async fetchDataWithFallback(endpoint: string, params: any): Promise<any> {
        const language = getCurrentLanguage();

        try {
            const { data } = await this.axiosInstance.get(endpoint, {
                params: {
                    ...params,
                    language,
                },
            });

            const missingFields = Object.keys(data).filter((key) => !data[key]);

            if (missingFields.length > 0) {
                const { data: fallbackData } = await this.axiosInstance.get(endpoint, {
                    params: {
                        ...params,
                        language: "en",
                    },
                });

                missingFields.forEach((field) => {
                    if (!data[field] && fallbackData[field]) {
                        data[field] = fallbackData[field];
                    }
                });
            }

            return data;
        } catch (err) {
            const error = err as { response: { data: { status_message: string } } }
            
            console.error("Error fetching data:", error);
            if (error?.response?.data?.status_message) {
                toast.error(error?.response?.data?.status_message)
            }
            throw error;
        }
    }

    public async getPopularMovies(page: number = 1): Promise<TMDBSearchResponse> {
        return this.fetchDataWithFallback("/movie/popular", { page });
    }

    public async searchMovies(query: string, page: number = 1): Promise<TMDBSearchResponse> {
        return this.fetchDataWithFallback("/search/movie", { query, page });
    }

    public async discoverMovies(
        params: Record<string, string | number | boolean | Date>
    ): Promise<TMDBSearchResponse> {
        return this.fetchDataWithFallback("/discover/movie", params);
    }

    public async getMovieDetails(movieId: number): Promise<TMDBMoviesDetailsIncluded> {
        const movieDetails = await this.fetchDataWithFallback(`/movie/${movieId}`, {});
        const videoData = await this.fetchDataWithFallback(`/movie/${movieId}/videos`, {});

        return {
            details: movieDetails,
            videos: videoData,
        };
    }

    public async getMovieGenres(): Promise<TMDBGenresResponse> {
        return this.fetchDataWithFallback("/genre/movie/list", {});
    }
}

const tmdb = new tmdbService();
export default tmdb;

import axios from "axios";
import { getCurrentLanguage } from "../utils/translations/i18n";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const posterBaseUrl = "https://image.tmdb.org/t/p/w500";

const tmdb = axios.create({
    baseURL: TMDB_BASE_URL,
    params: {
        api_key: TMDB_API_KEY,
    },
});

export const getPopularMovies = async (page: number = 1) => {
    const { data } = await tmdb.get("/movie/popular", {
        params: {
            page,
            language: getCurrentLanguage(),
        },
    });
    return data;
};

export const searchMovies = async (query: string, page: number = 1) => {
    const { data } = await tmdb.get("/search/movie", {
        params: {
            query,
            page,
            language: getCurrentLanguage(),
        },
    });
    return data;
};

export const getMovieDetails = async (movieId: number) => {
    const { data } = await tmdb.get(`/movie/${movieId}`, {
        params: {
            language: getCurrentLanguage(),
        },
    });
    return data;
};

export const getMovieGenres = async () => {
    const { data } = await tmdb.get("/genre/movie/list", {
        params: {
            language: getCurrentLanguage(),
        },
    });
    return data.genres;
};

export default tmdb;

import axios from "axios";
// import { getCurrentLanguage } from "../utils/translations/i18n";

const TMDB_BASE_URL = "BASE_URL";
const TMDB_API_KEY = "API_KEY";

const tmdb = axios.create({
    baseURL: TMDB_BASE_URL,
    params: {
        api_key: TMDB_API_KEY,
    },
});

export default tmdb;

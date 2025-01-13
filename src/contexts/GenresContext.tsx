import React, { createContext, useState, useEffect, ReactNode } from "react";
import { TMDBGenres } from "../types/TMDBGenres";
import tmdb from "../services/tmdb";
import { getCurrentLanguage } from "../utils/translations/i18n";

interface GenresContextType {
    genres: TMDBGenres[];
    isLoading: boolean;
    error: string | null;
}

interface GenresProviderProps {
    children: ReactNode;
}

const GenresContext = createContext<GenresContextType | undefined>(undefined);

const GenresProvider: React.FC<GenresProviderProps> = ({ children }) => {
    const [genres, setGenres] = useState<TMDBGenres[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await tmdb.getMovieGenres();
                setGenres(response.genres);
            } catch {
                setError("Failed to load genres");
            } finally {
                setIsLoading(false);
            }
        };

        fetchGenres();
    }, [getCurrentLanguage()]);

    return (
        <GenresContext.Provider value={{ genres, isLoading, error }}>
            {children}
        </GenresContext.Provider>
    );
};

const useGenres = (): GenresContextType => {
    const context = React.useContext(GenresContext);
    if (!context) {
        throw new Error("useGenres must be used within a GenresProvider");
    }
    return context;
};

export { GenresProvider, useGenres };

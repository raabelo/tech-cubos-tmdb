import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MovieCard from "../components/layout/MovieCard";
import { TMDBMovie } from "../types/TMDBMovie";
import { getPopularMovies, searchMovies } from "../services/tmdb";
import SearchBar from "../components/layout/SearchBar";
import Pagination from "../components/layout/Pagination";

const Home: React.FC = () => {
    const { page: queryPage } = useParams();
    const navigate = useNavigate();

    const [movies, setMovies] = useState<TMDBMovie[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const fetchMovies = useCallback(async () => {
        console.log(page, page / 2, Math.ceil(page / 2));
        const response = await getPopularMovies(Math.ceil(page / 2));
        setMovies(response.results);
        setTotalPages(response.total_pages);
    }, [page]);

    const getPaginatedMovies = useCallback(() => {
        const midIndex = Math.floor(movies.length / 2);
        return page % 2 === 0 ? movies.slice(midIndex) : movies.slice(0, midIndex);
    }, [movies, page]);

    const handleSearch = useCallback(async () => {
        if (searchQuery.trim()) {
            const response = await searchMovies(searchQuery, Math.floor(page));
            setMovies(response.results);
            setTotalPages(response.total_pages);
        } else {
            fetchMovies();
        }
    }, [searchQuery, page, fetchMovies]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        navigate(`/${newPage}`, { replace: true });
    };

    useEffect(() => {
        if (queryPage) {
            const pageNumber = parseInt(queryPage, 10);
            const validPageNumber = isNaN(pageNumber) ? 1 : Math.min(Math.max(pageNumber, 1), 500);
            setPage(validPageNumber);
        } else {
            setPage(1);
        }
    }, [queryPage]);

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    return (
        <>
            <section className="relative size-full h-fit flex flex-col justify-center">
                <SearchBar
                    searchQuery={searchQuery}
                    onSearch={handleSearch}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <div className="bg-gradient-to-t dark:from-dark-mauve1 dark:via-dark-mauve1/80 dark:to-dark-mauve1/20 from-light-mauve1 via-light-mauve1/80 to-light-mauve1/20">
                    <div className="lg:m-6 p-6 rounded-lg dark:bg-dark-mauve11/20 bg-light-mauve11/20 grid gap-4 md:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 4xl:grid-cols-7">
                        {getPaginatedMovies().map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </section>
        </>
    );
};

export default Home;

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MovieCard from "../components/layout/MovieCard";
import { TMDBMovies } from "../types/TMDBMovies";
import SearchBar from "../components/layout/SearchBar";
import Pagination from "../components/layout/Pagination";
import { useTranslation } from "react-i18next";

const Home: React.FC = () => {
    const { page: queryPage } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [movies, setMovies] = useState<TMDBMovies[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const getPaginatedMovies = useCallback(() => {
        const midIndex = Math.floor(movies.length / 2);
        return page % 2 === 0 ? movies.slice(midIndex) : movies.slice(0, midIndex);
    }, [movies, page]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        navigate(`/${newPage}`, { replace: true });
    };

    useEffect(() => {
        document.title = t("page_title");
        if (queryPage) {
            const pageNumber = parseInt(queryPage, 10);
            const validPageNumber = isNaN(pageNumber) ? 1 : Math.min(Math.max(pageNumber, 1), 500);
            setPage(validPageNumber);
        } else {
            setPage(1);
        }
    }, [queryPage, t]);

    return (
        <>
            <section className="relative size-full h-fit flex flex-col justify-center font-montserrat">
                <div className="z-20">
                    <SearchBar page={page} setMovies={setMovies} setTotalPages={setTotalPages} />
                </div>

                <div
                    className="bg-gradient-to-t z-10
                            dark:from-dark-mauve1 dark:via-dark-mauve1/80 dark:to-dark-mauve1/20
                            from-light-mauve1 via-light-mauve1/80 to-light-mauve1/20"
                >
                    <div
                        className="lg:m-6 p-6 rounded-lg backdrop-blur-xs
                            dark:bg-dark-mauve11/10 bg-light-mauve11/10
                              grid gap-4 md:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 4xl:grid-cols-7"
                    >
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

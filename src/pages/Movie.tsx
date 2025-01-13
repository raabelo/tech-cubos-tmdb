import { useParams } from "react-router-dom";
import MoviePoster from "../components/ui/MoviePoster";
import { TMDBMoviesDetails } from "../types/TMDBMovieDetails";
import { useEffect, useState } from "react";
import tmdb, { backdropBaseUrl } from "../services/tmdb";
import MovieDetailCard from "../components/ui/MovieDetailCard";
import VideoPlayer from "../components/ui/VideoPlayer";
import { TMDBVideos } from "../types/TMDBVideos";
import { formatCurrency, formatLanguage, formatMinutes } from "../utils/functions/formatValue";
import MovieGrade from "../components/ui/MovieGrade";
import LabelTag from "../components/ui/LabelTag";

const Movie: React.FC = () => {
    const { id } = useParams();
    const [movieDetails, setMovieDetails] = useState<TMDBMoviesDetails | undefined>(undefined);
    const [movieVideos, setMovieVideos] = useState<TMDBVideos[] | undefined>(undefined);

    const trailer = movieVideos?.filter((video) => video.type === "Trailer" && video.official)[0];

    useEffect(() => {
        const fetchmovieDetails = async (id: number) => {
            const { details, videos } = await tmdb.getMovieDetails(id);
            document.title = details.title
                ? `${document.title} | ${details.title}`
                : document.title;
            setMovieDetails(details);
            setMovieVideos(videos.results);
        };
        if (id) {
            fetchmovieDetails(parseInt(id));
        }
    }, [id]);

    return (
        <>
            <section className="relative size-full h-fit flex flex-col justify-center lg:p-8 font-montserrat">
                <div
                    className="size-full bg-cover lg:bg-right lg:rounded-md"
                    style={{
                        backgroundImage: `url(${backdropBaseUrl}${movieDetails?.backdrop_path})`,
                    }}
                >
                    <div
                        className="flex flex-col lg:flex-row w-full bg-gradient-to-r p-8 gap-8
                                 dark:from-black dark:via-black/80 dark:to-black/50"
                    >
                        <div className="w-full lg:w-auto lg:h-[60svh]">
                            <MoviePoster posterPath={movieDetails?.poster_path} />
                        </div>
                        <div className="flex flex-col gap-4 w-full">
                            <div className="flex flex-col lg:flex-row justify-between gap-4">
                                <div className="dark:text-dark-mauve12 text-light-mauve12 flex flex-col justify-center">
                                    <h1 className="text-3xl font-semibold font-montserrat">
                                        {movieDetails?.title}
                                    </h1>
                                    <p className="opacity-80">
                                        Título original: {movieDetails?.original_title}
                                    </p>
                                    <p className="mt-auto italic">{movieDetails?.tagline}</p>
                                </div>
                                <div className="flex flex-row gap-4 font-bold text-sm lg:text-nowrap">
                                    <div className="flex flex-row gap-4">
                                        <MovieDetailCard title="POPULARIDADE">
                                            {movieDetails?.popularity}
                                        </MovieDetailCard>
                                        <MovieDetailCard title="VOTOS">
                                            {movieDetails?.vote_count}
                                        </MovieDetailCard>
                                    </div>
                                    <div className="max-w-20 w-auto">
                                        <MovieGrade
                                            percentage={Math.round(
                                                (movieDetails?.vote_average || 1) * 10
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col lg:flex-row gap-4">
                                <div className="flex w-full">
                                    <MovieDetailCard title="SINOPSE" className="flex-1">
                                        {movieDetails?.overview}
                                    </MovieDetailCard>
                                </div>
                                <div className="flex flex-col gap-4 w-full font-bold text-sm lg:text-nowrap">
                                    <div className="flex flex-row gap-4">
                                        <MovieDetailCard title="LANÇAMENTO">
                                            {movieDetails?.release_date &&
                                                new Date(
                                                    movieDetails?.release_date
                                                ).toLocaleDateString()}
                                        </MovieDetailCard>
                                        <MovieDetailCard title="DURAÇÃO">
                                            {formatMinutes(movieDetails?.runtime)}
                                        </MovieDetailCard>
                                    </div>
                                    <div className="flex flex-row gap-4">
                                        <MovieDetailCard title="SITUAÇÃO">
                                            {movieDetails?.status}
                                        </MovieDetailCard>
                                        <MovieDetailCard title="IDIOMA">
                                            {formatLanguage(movieDetails?.original_language)}
                                        </MovieDetailCard>
                                    </div>
                                    <div className="flex flex-row gap-4">
                                        <MovieDetailCard title="ORÇAMENTO">
                                            {formatCurrency(movieDetails?.budget)}
                                        </MovieDetailCard>
                                        <MovieDetailCard title="RECEITA">
                                            {formatCurrency(movieDetails?.revenue)}
                                        </MovieDetailCard>
                                        <MovieDetailCard title="LUCRO">
                                            {movieDetails?.revenue && movieDetails?.budget
                                                ? formatCurrency(
                                                      movieDetails?.revenue - movieDetails?.budget
                                                  )
                                                : "-"}
                                        </MovieDetailCard>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <MovieDetailCard title="GÊNEROS" className="w-fit">
                                    <div className="text-sm font-semibold lg:text-nowrap flex flex-row flex-wrap gap-2">
                                        {movieDetails?.genres?.map((genre) => (
                                            <LabelTag key={genre?.id} className="w-fit">
                                                <div className="flex items-center">
                                                    <p className="p-2">
                                                        {genre?.name?.toUpperCase()}
                                                    </p>
                                                </div>
                                            </LabelTag>
                                        ))}
                                    </div>
                                </MovieDetailCard>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-8 flex flex-col gap-4">
                    <h1 className="text-2xl dark:text-dark-mauve12 text-light-mauve12 font-bold">
                        Trailer
                    </h1>
                    <VideoPlayer video={trailer || null} />
                </div>
            </section>
        </>
    );
};

export default Movie;

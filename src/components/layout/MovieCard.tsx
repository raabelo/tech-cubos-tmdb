import { Link } from "react-router-dom";
import { posterBaseUrl } from "../../services/tmdb";
import { TMDBMovies } from "../../types/TMDBMovies";
import { useState } from "react";
import MovieGrade from "../ui/MovieGrade";
import { useGenres } from "../../contexts/GenresContext";

interface MovieCardProps {
    movie: TMDBMovies;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const { genres } = useGenres();

    const [isHovering, setIsHovering] = useState<boolean>(false);

    const getGenreNames = (genreIds: number[]) => {
        return genreIds?.map((id) => genres?.find((genre) => genre.id === id)?.name).join(", ");
    };

    if (!movie) {
        return (
            <>
                <div className="aspect-[235/355] rounded-md overflow-hidden bg-gray-200 p-1" />
            </>
        );
    }

    return (
        <>
            <Link
                to={`/movies/${movie.id}`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="relative aspect-[235/355] rounded-md overflow-hidden bg-gray-200"
            >
                {movie.poster_path ? (
                    <img
                        src={`${posterBaseUrl}${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-400">
                        <span className="text-sm text-gray-700">No Image</span>
                    </div>
                )}
                <div
                    className="absolute bottom-0 h-full w-full flex flex-col justify-end p-4
                                transition-all gap-1.5
                                bg-gradient-to-t from-black via-black/30 to-black/"
                >
                    {isHovering && (
                        <div className="m-auto w-3/4">
                            <MovieGrade percentage={Math.round(movie?.vote_average * 10)} />
                        </div>
                    )}
                    <p className="text-dark-mauve12 text-wrap font-bold transition-all">
                        {movie?.title?.toUpperCase()}
                    </p>
                    {isHovering && (
                        <p
                            className="text-dark-mauve12 text-wrap transition-all
                                        font-montserrat font-light text-sm"
                        >
                            {getGenreNames(movie?.genre_ids)}
                        </p>
                    )}
                </div>
            </Link>
        </>
    );
};

export default MovieCard;

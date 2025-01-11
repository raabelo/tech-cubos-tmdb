import { Link } from "react-router-dom";
import { posterBaseUrl } from "../../services/tmdb";
import { TMDBMovie } from "../../types/TMDBMovie";

interface MovieCardProps {
    movie: TMDBMovie;
}

// sonic were flow ferry absolution the thicked kraven des jours

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
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
                <div className="absolute bottom-0 bg h-1/2 w-full flex items-end bg-gradient-to-t from-black via-black/60 to-black/0 p-4">
                    <p className="text-dark-mauve12 text-wrap font-bold">
                        {movie.title?.toUpperCase()}
                    </p>
                </div>
            </Link>
        </>
    );
};

export default MovieCard;

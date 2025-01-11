import { posterBaseUrl } from "../../services/tmdb";
import ImgPlaceholderPoster from "../../assets/imgs/placeholder-movieimage.png";
import { ReactNode } from "react";

interface MoviePosterProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    posterPath?: string | null;
}

const MoviePoster: React.FC<MoviePosterProps> = ({ posterPath, children, ...props }) => {
    return (
        <>
            <div
                {...props}
                className={`relative h-full aspect-[235/355] rounded-md overflow-hidden bg-gray-200 ${
                    props.className || ""
                }`}
            >
                <img
                    src={posterPath ? `${posterBaseUrl}${posterPath}` : ImgPlaceholderPoster}
                    alt={posterPath || "Movie poster not found"}
                    className="w-full h-full object-cover"
                />
                {children}
            </div>
        </>
    );
};

export default MoviePoster;

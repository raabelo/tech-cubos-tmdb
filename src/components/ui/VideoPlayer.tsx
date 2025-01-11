import { TMDBVideos } from "../../types/TMDBVideos";
import getVideoEmbedUrl from "../../utils/functions/getVideoUrl";

const VideoPlayer: React.FC<{ video: TMDBVideos | null }> = ({ video }) => {
    if (!video || !video.key) {
        return <p>Trailer não disponível.</p>;
    }

    const embedUrl = getVideoEmbedUrl(video);

    return (
        <div className="aspect-video rounded-md overflow-hidden">
            <iframe
                src={embedUrl}
                title={video.name}
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-full"
            />
        </div>
    );
};

export default VideoPlayer;

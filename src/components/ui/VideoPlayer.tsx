import { TMDBVideos } from "../../types/TMDBVideos";
import getVideoEmbedUrl from "../../utils/functions/getVideoUrl";
import { useTranslation } from "react-i18next";

const VideoPlayer: React.FC<{ video: TMDBVideos | null }> = ({ video }) => {
    const { t } = useTranslation();

    if (!video || !video.key) {
        return (
            <p className="dark:text-dark-mauve12 text-light-mauve12">{t("trailer_unavailable")}</p>
        );
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

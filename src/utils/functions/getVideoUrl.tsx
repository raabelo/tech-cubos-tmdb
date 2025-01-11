import { TMDBVideos, TMDBVideosPlatforms } from "../../types/TMDBVideos";

const getVideoEmbedUrl = (video: TMDBVideos) => {
    if (!video.site || !video.key) {
        return "";
    }

    const embedPlatforms: { [key in TMDBVideosPlatforms]: string } = {
        YouTube: `https://www.youtube.com/embed/`,
        Vimeo: `https://player.vimeo.com/video/`,
    };

    return embedPlatforms[video.site] + video.key;
};

export default getVideoEmbedUrl;

import { Video } from "../../videos/types/video";
import { VideosOutputDto } from "../../videos/dto/videos.output.dto";

export const createOutputVideo = (video: Video): VideosOutputDto => {
  return {
    ...video,
    createdAt: video.createdAt.toISOString(),
    publicationDate: video.publicationDate.toISOString(),
  };
};

import { Resolutions } from "../types/video";

// Данные, которые отсылает сервер
export type VideosOutputDto = {
  id: number;
  title: string;
  author: string;
  canBeDownloaded: boolean;
  minAgeRestriction: number | null;
  createdAt: string;
  publicationDate: string;
  availableResolutions: Resolutions[];
};

import { Resolutions } from "../types/video";

// Данные, которые клиент присылает при создании
// (без служебных — их проставляет сервер).
export type VideosCreateInputDto = {
  title: string;
  author: string;
  availableResolutions: Resolutions[];
};

// Данные, которые клиент присылает при обновлении
export type VideosUpdateInputDto = {
  title: string;
  author: string;
  availableResolutions: Resolutions[];
  canBeDownloaded: boolean;
  minAgeRestriction: number | null;
  publicationDate: string;
};

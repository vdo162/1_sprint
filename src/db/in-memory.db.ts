import { Video, Resolutions } from "../videos/types/video";

// Простое хранилище в памяти вместо настоящей базы данных.
// Данные живут только пока запущен сервер и сбрасываются при перезапуске.

export const db: { videos: Video[] } = {
  videos: [
    {
      id: 1,
      title: "Введение в TypeScript за 10 минут",
      author: "Иван Иванов",
      canBeDownloaded: true,
      minAgeRestriction: null,
      createdAt: new Date(),
      publicationDate: new Date(),
      availableResolutions: [Resolutions.P144],
    },
    {
      id: 2,
      title: "Как правильно готовить пасту карбонара",
      author: "Шеф-повар Антонио",
      canBeDownloaded: true,
      minAgeRestriction: 12,
      createdAt: new Date(),
      publicationDate: new Date(),
      availableResolutions: [Resolutions.P480],
    },
    {
      id: 3,
      title: "Обзор новинок технологий 2026",
      author: "ТехноБлог",
      canBeDownloaded: true,
      minAgeRestriction: 18,
      createdAt: new Date(),
      publicationDate: new Date(),
      availableResolutions: [Resolutions.P720, Resolutions.P1080],
    },
    {
      id: 5,
      title: "Test",
      author: "Test",
      canBeDownloaded: true,
      minAgeRestriction: 18,
      createdAt: new Date(),
      publicationDate: new Date(),
      availableResolutions: [Resolutions.P720, Resolutions.P1080],
    },
  ],
};

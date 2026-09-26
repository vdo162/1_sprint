import {
  VideosCreateInputDto,
  VideosUpdateInputDto,
} from "../dto/videosInputDto";
import { ValidationError } from "../../core/types/validation-error";
import { Resolutions } from "../types/video";

const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

// Строка считается некорректной, если это не строка или её длина (после trim)
// выходит за границы [min, max]. Вынесено отдельно, чтобы не дублировать проверку.
const isInvalidString = (value: unknown, min: number, max: number): boolean =>
  typeof value !== "string" ||
  value.trim().length < min ||
  value.trim().length > max;

const isInvalidDate = (value: unknown): boolean =>
  typeof value !== "string" ||
  !ISO_DATE_REGEX.test(value) ||
  isNaN(Date.parse(value));

const isInvalidInteger = (value: unknown, min: number, max: number): boolean =>
  typeof value !== "number" ||
  !Number.isInteger(value) ||
  value < min ||
  value > max;

// Ручная валидация тела запроса.
// Возвращает список ошибок; пустой список означает, что данные корректны.
export const validateVideoCreateInputDto = (
  data: VideosCreateInputDto | VideosUpdateInputDto,
): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (isInvalidString(data.title, 2, 40)) {
    errors.push({ field: "title", message: "Invalid title" });
  }

  if (isInvalidString(data.author, 2, 20)) {
    errors.push({ field: "author", message: "Invalid author" });
  }

  if (!Array.isArray(data.availableResolutions)) {
    errors.push({
      field: "availableResolutions",
      message: "availableResolutions must be an array",
    });
  } else {
    const validResolutions = Object.values(Resolutions);
    const hasInvalidFeature = data.availableResolutions.some(
      (feature) => !validResolutions.includes(feature),
    );

    if (!data.availableResolutions.length || hasInvalidFeature) {
      errors.push({
        field: "availableResolutions",
        message: "Invalid availableResolutions",
      });
    }
  }

  return errors;
};

export const validateVideoUpdateInputDto = (
  data: VideosUpdateInputDto,
): ValidationError[] => {
  const errors: ValidationError[] = validateVideoCreateInputDto(data);

  if (typeof data.canBeDownloaded !== "boolean") {
    errors.push({
      field: "canBeDownloaded",
      message: "Invalid canBeDownloaded",
    });
  }

  // Описание необязательное: допускается null, иначе — число от 1 до 18.
  if (
    data.minAgeRestriction !== null &&
    isInvalidInteger(data.minAgeRestriction, 1, 18)
  ) {
    errors.push({
      field: "minAgeRestriction",
      message: "Invalid minAgeRestriction",
    });
  }

  if (isInvalidDate(data.publicationDate)) {
    errors.push({
      field: "publicationDate",
      message: "Invalid publicationDate",
    });
  }

  return errors;
};

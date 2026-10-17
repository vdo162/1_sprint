import { Request, Response, Router } from "express";
import { db } from "../../db/in-memory.db";
import { HttpStatus } from "../../core/types/http-statuses";
import { createErrorMessages } from "../../core/utils/error.utils";
import { Video } from "../types/video";
import {
  VideosCreateInputDto,
  VideosUpdateInputDto,
} from "../dto/videosInputDto";
import {
  validateVideoCreateInputDto,
  validateVideoUpdateInputDto,
} from "../validation/video-input-dto.validation";
import { createOutputVideo } from "../../core/utils/output.utils";

export const videosRouter = Router({});

videosRouter
  .get("", (req: Request, res: Response) => {
    res.status(HttpStatus.Ok).send(db.videos.map(createOutputVideo));
  })

  .get("/:id", (req: Request<{ id: string }>, res: Response) => {
    const video = db.videos.find((d) => d.id === +req.params.id);

    if (!video) {
      res
        .status(HttpStatus.NotFound)
        .send(
          createErrorMessages([{ field: "id", message: "Video not found" }]),
        );
      return;
    }

    res.status(HttpStatus.Ok).send(createOutputVideo(video));
  })

  .post("", (req: Request<{}, {}, VideosCreateInputDto>, res: Response) => {
    const errors = validateVideoCreateInputDto(req.body);

    if (errors.length > 0) {
      res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
      return;
    }

    const lastVideo = db.videos[db.videos.length - 1];

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const newVideo: Video = {
      id: lastVideo ? lastVideo.id + 1 : 1,
      title: req.body.title,
      author: req.body.author,
      canBeDownloaded: false,
      minAgeRestriction: null,
      createdAt: today,
      publicationDate: tomorrow,
      availableResolutions: req.body.availableResolutions,
    };

    db.videos.push(newVideo);
    res.status(HttpStatus.Created).send(createOutputVideo(newVideo));
  })

  .put(
    "/:id",
    (req: Request<{ id: string }, {}, VideosUpdateInputDto>, res: Response) => {
      const index = db.videos.findIndex((d) => d.id === +req.params.id);

      if (index === -1) {
        res
          .status(HttpStatus.NotFound)
          .send(
            createErrorMessages([{ field: "id", message: "Video not found" }]),
          );
        return;
      }

      const errors = validateVideoUpdateInputDto(req.body);

      if (errors.length > 0) {
        res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
        return;
      }

      db.videos[index] = {
        ...db.videos[index],
        ...req.body,
        publicationDate: new Date(req.body.publicationDate),
      };

      res.sendStatus(HttpStatus.NoContent);
    },
  )

  .delete("/:id", (req: Request<{ id: string }>, res: Response) => {
    const index = db.videos.findIndex((d) => d.id === +req.params.id);

    if (index === -1) {
      res
        .status(HttpStatus.NotFound)
        .send(
          createErrorMessages([{ field: "id", message: "Video not found" }]),
        );
      return;
    }

    db.videos.splice(index, 1);
    res.sendStatus(HttpStatus.NoContent);
  });

import request from "supertest";
import express from "express";
import { setupApp } from "../../../src/setup-app";
import { VideosCreateInputDto } from "../../../src/videos/dto/videosInputDto";
import { Resolutions } from "../../../src/videos/types/video";
import { HttpStatus } from "../../../src/core/types/http-statuses";

describe("Video API body validation check", () => {
  const app = express();
  setupApp(app);

  const correctTestVideoData: VideosCreateInputDto = {
    title: "Введение в TypeScript за 10 минут",
    author: "Иван Иванов",
    availableResolutions: [Resolutions.P144],
  };

  beforeAll(async () => {
    await request(app).delete("/testing/all-data").expect(HttpStatus.NoContent);
  });

  it(`should not create video when incorrect body passed; POST /videos`, async () => {
    const invalidDataSet1 = await request(app)
      .post("/videos")
      .send({
        ...correctTestVideoData,
        title: "   ",
        author: "    ",
        availableResolutions: [],
      })
      .expect(HttpStatus.BadRequest);

    expect(invalidDataSet1.body.errorMessages).toHaveLength(3);

    const invalidDataSet2 = await request(app)
      .post("/videos")
      .send({
        ...correctTestVideoData,
        title: "",
        author: "",
        availableResolutions: 21,
      })
      .expect(HttpStatus.BadRequest);

    expect(invalidDataSet2.body.errorMessages).toHaveLength(3);

    const invalidDataSet3 = await request(app)
      .post("/videos")
      .send({
        ...correctTestVideoData,
        title: "A", // слишком короткое
      })
      .expect(HttpStatus.BadRequest);

    expect(invalidDataSet3.body.errorMessages).toHaveLength(1);

    // Проверяем, что ни одно невалидное видео не создалось.
    const videoListResponse = await request(app).get("/videos");
    expect(videoListResponse.body).toHaveLength(0);
  });
});

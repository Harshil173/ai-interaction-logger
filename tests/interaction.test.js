const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/app");
const Interaction = require("../src/models/interaction");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Interaction.deleteMany();
});

describe("AI Interaction Logger API", () => {

  test("POST /api/interactions should create an interaction", async () => {
    const res = await request(app)
      .post("/api/interactions")
      .send({
        userId: "u1",
        message: "Hello AI",
        aiResponse: "Hi there!",
        timestamp: "2025-08-04T12:00:00Z",
        responseTimestamp: "2025-08-04T12:00:01Z"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.userId).toBe("u1");
  });

  test("GET /api/interactions/:userId should return last 20 interactions", async () => {
    await Interaction.create({
      userId: "u1",
      message: "Test message",
      aiResponse: "Test response",
      timestamp: new Date(),
      responseTimestamp: new Date()
    });

    const res = await request(app).get("/api/interactions/u1");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /api/stats/:userId should return stats", async () => {
    await Interaction.create({
      userId: "u1",
      message: "Test message",
      aiResponse: "Test response",
      timestamp: new Date(),
      responseTimestamp: new Date()
    });

    const res = await request(app).get("/api/stats/u1");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("totalMessages");
    expect(res.body).toHaveProperty("avgMsgLength");
  });

});

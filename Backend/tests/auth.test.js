const request = require("supertest");
const app = require("../src/app");

describe("User Authorization", () => {
  test("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      username: "abc",
      email: "abc@gmail.com",
      password: "pass123",
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "User registration successful");
  });

  test("should login an existing user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "abc@gmail.com",
      password: "pass123",
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "User login successful");
  });
});

const request = require("supertest");
jest.setTimeout(10000);

// Mock controllers to avoid hitting real DB
jest.mock("../../src/controller/auth.controller", () => ({
  register_user: (req, res) =>
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: "123",
        username: "testUser",
        email: "test@gmail.com",
        role: "user",
      },
    }),
  login_user: (req, res) =>
    res.status(200).json({
      message: "User login successfull",
      user: {
        id: "123",
        username: "testUser",
        email: "test@gmail.com",
        role: "user",
      },
    }),
}));

const app = require("../../app");

describe("Auth Routes", () => {
  test("POST /api/auth/register returns 201", async () => {
    const res = await request(app).post("/api/auth/register").send({
      username: "test",
      email: "test@gmail.com",
      password: "pass123",
      role: "user",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("User registered successfully");
    expect(res.body.user).toBeDefined();
    expect(res.body.user).toMatchObject({
      username: "testUser",
      email: "test@gmail.com",
      role: "user",
    });
  });

  test("POST /api/auth/login returns 200", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test@gmail.com",
      password: "pass123",
      role: "user",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("User login successfull");
    expect(res.body.user).toBeDefined();
    expect(res.body.user).toMatchObject({
      username: "testUser",
      email: "test@gmail.com",
      role: "user",
    });
  });
});

// Optional teardown to close any open connections
afterAll(async () => {
  if (app && app.close) {
    await app.close();
  }
});

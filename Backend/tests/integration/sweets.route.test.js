
/**
 * Mock the controller functions
 * We ONLY check:
 * - correct route
 * - correct HTTP method
 * - correct status & response
 */
jest.mock("../../src/controller/sweet.controller", () => ({
  add_Sweet: (req, res) => res.status(201).json({ message: "Sweet added successfully" }),

  get_Sweets: (req, res) => res.status(200).json({ sweets: [] }),

  search_Sweets: (req, res) => res.status(200).json({ sweets: [] }),

  update_Sweet: (req, res) => res.status(200).json({ message: "Sweet updated successfully" }),

  delete_Sweet: (req, res) => res.status(200).json({ message: "Sweet deleted successfully" }),
}));

const request = require("supertest");
const app = require("../../app");

describe("Sweet Routes", () => {
  describe("POST /api/sweets", () => {
    test("should add a new sweet", async () => {
      const res = await request(app).post("/api/sweets").send({
        name: "Ladoo",
        category: "Indian",
        price: 10,
        quantity: 100,
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe("Sweet added successfully");
    });
  });

  describe("GET /api/sweets", () => {
    test("should return all sweets", async () => {
      const res = await request(app).get("/api/sweets");

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("sweets");
      expect(Array.isArray(res.body.sweets)).toBe(true);
    });
  });

  describe("GET /api/sweets/search", () => {
    test("should search sweets by query", async () => {
      const res = await request(app)
        .get("/api/sweets/search")
        .query({ name: "Ladoo" });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("sweets");
    });
  });

  describe("PUT /api/sweets/:id", () => {
    test("should update sweet details", async () => {
      const res = await request(app).put("/api/sweets/123").send({ price: 15 });

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Sweet updated successfully");
    });
  });

  describe("DELETE /api/sweets/:id", () => {
    test("should delete a sweet (admin only)", async () => {
      const res = await request(app).delete("/api/sweets/123");

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Sweet deleted successfully");
    });
  });
});
const {
  createSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
} = require("../../../src/services/sweet.service");


jest.mock("../../../src/models/Sweet.model");

const Sweet = require("../../../src/models/Sweet.model");


describe("Sweet Service", () => {
  describe("createSweet", () => {
    test("should create a new sweet", async () => {
      Sweet.create.mockResolvedValue({
        _id: "1",
        name: "Ladoo",
        category: "Indian",
        price: 50,
        quantity: 10,
      });

      const res = await createSweet({
        name: "Ladoo",
        category: "Indian",
        price: 50,
        quantity: 10,
      });

      expect(res.name).toBe("Ladoo");
    });
  });

  describe("getAllSweets", () => {
    test("should return all sweets", async () => {
      Sweet.find.mockResolvedValue([{ name: "Barfi" }]);

      const res = await getAllSweets();
      expect(res.length).toBe(1);
    });
  });

  describe("searchSweets", () => {
    test("should search sweets by name", async () => {
      Sweet.find.mockResolvedValue([{ name: "Rasgulla" }]);

      const res = await searchSweets({ name: "Rasgulla" });
      expect(res[0].name).toBe("Rasgulla");
    });
  });

  describe("updateSweet", () => {
    test("should update a sweet", async () => {
      Sweet.findByIdAndUpdate.mockResolvedValue({
        _id: "1",
        price: 60,
      });

      const res = await updateSweet("1", { price: 60 });
      expect(res.price).toBe(60);
    });
  });

  describe("deleteSweet", () => {
    test("should delete a sweet", async () => {
      Sweet.findByIdAndDelete.mockResolvedValue({ _id: "1" });

      const res = await deleteSweet("1");
      expect(res._id).toBe("1");
    });
  });
});

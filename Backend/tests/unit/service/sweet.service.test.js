jest.mock("../../../src/models/Sweets.model", () => ({
  create: jest.fn(),
  find: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
  findById: jest.fn(),
}));
const {
  createSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,
} = require("../../../src/services/sweet.service");
const Sweet = require("../../../src/models/Sweets.model");


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
  
  describe("Inventory Service", () => {
    test("purchaseSweet reduces quantity of sweet", async () => {
      Sweet.findById.mockResolvedValue({
        quantity: 10,
        save: jest.fn(),
      });

      const res = await purchaseSweet("123", 2);
      expect(res.quantity).toBe(8);
    });

    test("restockSweet increases quantity of that sweet", async () => {
      Sweet.findById.mockResolvedValue({
        quantity: 5,
        save: jest.fn(),
      });

      const res = await restockSweet("123", 5);
      expect(res.quantity).toBe(10);
    });
  });

});

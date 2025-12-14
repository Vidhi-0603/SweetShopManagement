// Mocking external dependencies
jest.mock("bcrypt", () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

jest.mock("../../../src/utils/jwtToken.util", () => ({
  getJWTToken: jest.fn(),
}));

jest.mock("../../../src/dao/findUser", () => ({
  findUserByEmail: jest.fn(),
  findUserById: jest.fn(),
}));

jest.mock("../../../src/models/User.model", () => {
  return jest.fn().mockImplementation(() => ({
    save: jest.fn(),
    _id: "123",
    username: "testUser",
    email: "test@gmail.com",
    role: "user",
  }));
});

const bcrypt = require("bcrypt");
const {
  registerUser,
  loginUser,
  authUser,
} = require("../../../src/services/auth.service");
const { getJWTToken } = require("../../../src/utils/jwtToken.util");
const { findUserByEmail, findUserById } = require("../../../src/dao/findUser");
const userModel = require("../../../src/models/User.model");

describe("Auth Service", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks to prevent leakage between tests
  });

  describe("register user", () => {
    test("should register a new user and return token and user info", async () => {
      findUserByEmail.mockResolvedValue(null); // user does not exist
      bcrypt.hash.mockResolvedValue("hashedPassword");
      getJWTToken.mockReturnValue("jwtToken");

      const res = await registerUser(
        "testUser",
        "test@gmail.com",
        "pass123",
        "user"
      );

      expect(res).toEqual({
        token: "jwtToken",
        user: {
          id: "123",
          username: "testUser",
          email: "test@gmail.com",
          role: "user",
        },
      });
    });

    test("should throw error if user already exists", async () => {
      findUserByEmail.mockResolvedValue({
        _id: "123",
        username: "testUser",
        email: "test@gmail.com",
      });

      await expect(
        registerUser("testUser", "test@gmail.com", "pass123")
      ).rejects.toThrow("User already exists");
    });
  });

  describe("login user", () => {
    test("should login user and return token and user info", async () => {
      findUserByEmail.mockResolvedValue({
        _id: "123",
        username: "testUser",
        email: "test@gmail.com",
        password: "hashedPassword",
        role: "user",
      });

      bcrypt.compare.mockResolvedValue(true);
      getJWTToken.mockReturnValue("jwtToken");

      const res = await loginUser("test@gmail.com", "pass123");

      expect(res).toEqual({
        token: "jwtToken",
        user: {
          id: "123",
          username: "testUser",
          email: "test@gmail.com",
          role: "user",
        },
      });
    });

    test("should throw error if invalid credentials", async () => {
      findUserByEmail.mockResolvedValue(null);

      await expect(
        loginUser("test@gmail.com", "wrongPassword")
      ).rejects.toThrow("Invalid credentials");
    });
  });

  describe("authUser service", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    test("should return user when user exists", async () => {
      const mockUser = {
        _id: "123",
        username: "testUser",
        email: "test@gmail.com",
        role: "user",
      };

      findUserById.mockResolvedValue(mockUser);

      const result = await authUser("123");

      expect(findUserById).toHaveBeenCalledWith("123");
      expect(result).toEqual(mockUser);
    });

    test("should return null when user does not exist", async () => {
      findUserById.mockResolvedValue(null);

      const result = await authUser("123");

      expect(findUserById).toHaveBeenCalledWith("123");
      expect(result).toBeNull();
    });

    test("should throw error if DB fails", async () => {
      const error = new Error("DB error");
      findUserById.mockRejectedValue(error);

      await expect(authUser("123")).rejects.toThrow("DB error");
    });
  });
});

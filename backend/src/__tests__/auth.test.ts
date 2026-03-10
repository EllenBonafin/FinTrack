import request from "supertest";
import app from "../index";

// Mock Prisma
jest.mock("../lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}));

import { prisma } from "../lib/prisma";

const mockUser = {
  id: "cuid123",
  name: "Test User",
  email: "test@example.com",
  password: "$2a$10$hashedpassword",
  createdAt: new Date(),
};

describe("POST /auth/register", () => {
  beforeEach(() => jest.clearAllMocks());

  it("should return 400 if fields are missing", async () => {
    const res = await request(app).post("/auth/register").send({ email: "a@a.com" });
    expect(res.status).toBe(400);
  });

  it("should return 409 if email already exists", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
    const res = await request(app)
      .post("/auth/register")
      .send({ name: "Test", email: "test@example.com", password: "123456" });
    expect(res.status).toBe(409);
  });

  it("should return 201 and token on success", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    (prisma.user.create as jest.Mock).mockResolvedValue({
      id: mockUser.id,
      name: mockUser.name,
      email: mockUser.email,
      createdAt: mockUser.createdAt,
    });

    const res = await request(app)
      .post("/auth/register")
      .send({ name: "Test", email: "new@example.com", password: "123456" });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("user");
  });
});

describe("POST /auth/login", () => {
  beforeEach(() => jest.clearAllMocks());

  it("should return 400 if fields are missing", async () => {
    const res = await request(app).post("/auth/login").send({});
    expect(res.status).toBe(400);
  });

  it("should return 401 if user not found", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "notfound@example.com", password: "123456" });
    expect(res.status).toBe(401);
  });
});

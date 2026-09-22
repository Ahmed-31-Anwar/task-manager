import { beforeEach, describe, expect, it, vi } from "vitest";

const {
  mockAuth,
  mockUserWhere,
  mockTaskWhere,
  mockTaskCreate,
  mockTaskDelete,
} = vi.hoisted(() => ({
  mockAuth: vi.fn(),
  mockUserWhere: vi.fn(),
  mockTaskWhere: vi.fn(),
  mockTaskCreate: vi.fn(),
  mockTaskDelete: vi.fn(),
}));

vi.mock("@/auth", () => ({
  auth: mockAuth,
}));

vi.mock("@/lib/prisma", () => ({
  db: {
    orm: {
      public: {
        User: {
          where: mockUserWhere,
        },
        Task: {
          where: mockTaskWhere,
          create: mockTaskCreate,
        },
      },
    },
  },
}));

import { DELETE, GET, POST } from "@/app/api/tasks/route";

const testUser = {
  id: "test-user",
  email: "test@example.com",
  name: "Test User",
};

const testTasks = [
  {
    id: 1,
    title: "Existing task",
    userId: "test-user",
  },
];

describe("Task API", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockAuth.mockResolvedValue({
      user: {
        id: testUser.id,
        name: testUser.name,
        email: testUser.email,
      },
      expires: "2099-01-01T00:00:00.000Z",
    });

    mockUserWhere.mockReturnValue({
      first: vi.fn().mockResolvedValue(testUser),
    });

    mockTaskWhere.mockReturnValue({
      all: vi.fn().mockResolvedValue(testTasks),
      delete: mockTaskDelete,
    });

    mockTaskCreate.mockResolvedValue({
      id: 2,
      title: "Test task",
      userId: testUser.id,
    });

    mockTaskDelete.mockResolvedValue({
      id: 2,
      title: "Test task",
      userId: testUser.id,
    });
  });

  it("loads the user's tasks", async () => {
    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(testTasks);
  });

  it("adds a new task", async () => {
    const request = new Request("http://localhost/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Test task",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.title).toBe("Test task");
    expect(data.userId).toBe(testUser.id);
    expect(mockTaskCreate).toHaveBeenCalled();
  });

  it("deletes a task", async () => {
    const request = new Request("http://localhost/api/tasks", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: 2,
      }),
    });

    const response = await DELETE(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.id).toBe(2);
    expect(mockTaskDelete).toHaveBeenCalled();
  });
});
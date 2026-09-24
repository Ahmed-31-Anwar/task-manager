import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/api/test-login");
});

test("user can add, persist, and delete a task", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: /Good to see you/i })
  ).toBeVisible();

  const taskInput = page.getByPlaceholder(
    "e.g. Finish project documentation"
  );

  const taskTitle = `Playwright test task ${Date.now()}`;

  // Add task
  await taskInput.fill(taskTitle);

  await page.getByRole("button", { name: "Add Task" }).click();

  await expect(
    page.getByText(taskTitle, { exact: true })
  ).toBeVisible();

  // Check persistence after refresh
  await page.reload();

  await expect(
    page.getByText(taskTitle, { exact: true })
  ).toBeVisible();

  // Find the task and its Delete button
  const taskText = page.getByText(taskTitle, { exact: true });

  const taskCard = taskText.locator(
    "xpath=ancestor::div[.//button[contains(., 'Delete')]][1]"
  );

  await expect(
    taskCard.getByRole("button", { name: "Delete" })
  ).toBeVisible();

  // Delete task
  await taskCard.getByRole("button", { name: "Delete" }).click();

  // Check that the task is gone
  await expect(
    page.getByText(taskTitle, { exact: true })
  ).not.toBeVisible();
});

test("user cannot add an empty task", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: /Good to see you/i })
  ).toBeVisible();

  const taskInput = page.getByPlaceholder(
    "e.g. Finish project documentation"
  );

  await taskInput.fill("");

  const addButton = page.getByRole("button", { name: "Add Task" });

  // The app should prevent submitting an empty task
  await expect(addButton).toBeDisabled();
});

test("unauthenticated user cannot access tasks API", async ({
  request,
}) => {
  const response = await request.get("/api/tasks");

  expect(response.status()).toBe(401);

  const body = await response.json();

  expect(body.error).toBe("Unauthorized");
});

test("user cannot delete another user's task", async ({ browser }) => {
  // Create two completely separate browser sessions
  const userAContext = await browser.newContext();
  const userBContext = await browser.newContext();

  const userAPage = await userAContext.newPage();
  const userBPage = await userBContext.newPage();

  let taskId: number | undefined;

  try {
    // Log in as User A
    await userAPage.goto(
      "/api/test-login?email=playwright-user-a@example.com&name=Playwright%20User%20A"
    );

    // User A creates a task
    const createResponse = await userAPage.evaluate(async () => {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: `User A private task ${Date.now()}`,
        }),
      });

      return {
        status: response.status,
        body: await response.json(),
      };
    });

    expect(createResponse.status).toBe(201);

    taskId = createResponse.body.id;

    expect(taskId).toBeTruthy();

    // Log in as User B
    await userBPage.goto(
      "/api/test-login?email=playwright-user-b@example.com&name=Playwright%20User%20B"
    );

    // User B attempts to delete User A's task
    const deleteResponse = await userBPage.evaluate(
      async (id) => {
        const response = await fetch("/api/tasks", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
          }),
        });

        return {
          status: response.status,
          body: await response.json(),
        };
      },
      taskId
    );

    // User B must not be allowed to delete User A's task
    expect(deleteResponse.status).toBe(404);
    expect(deleteResponse.body.error).toBe("Task not found");

    // User A should still be able to see the task
    const userATasks = await userAPage.evaluate(async () => {
      const response = await fetch("/api/tasks");

      return {
        status: response.status,
        body: await response.json(),
      };
    });

    expect(userATasks.status).toBe(200);

    expect(
      userATasks.body.some((task: { id: number }) => task.id === taskId)
    ).toBe(true);
  } finally {
    // Clean up User A's test task if it was created
    if (taskId) {
      await userAPage.evaluate(async (id) => {
        await fetch("/api/tasks", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
          }),
        });
      }, taskId);
    }

    await userAContext.close();
    await userBContext.close();
  }
});

test("authenticated user can access the dashboard", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: /Good to see you/i })
  ).toBeVisible();

  await expect(
    page.getByPlaceholder("e.g. Finish project documentation")
  ).toBeVisible();

  await expect(
    page.getByRole("button", { name: "Add Task" })
  ).toBeVisible();
});

test("logged-out user sees the Google sign-in option", async ({
  browser,
}) => {
  // Create a completely fresh browser session with no login cookie
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto("/");

    await expect(
      page.getByRole("button", { name: "Continue with Google" })
    ).toBeVisible();
  } finally {
    await context.close();
  }
});
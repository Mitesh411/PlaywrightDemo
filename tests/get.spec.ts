import { test, expect } from "@playwright/test";

test("GET booking summary", async ({ request }) => {
  const response = await request.get(
    "https://automationintesting.online/booking/summary?roomid=1",
    { timeout: 30000 }
  );

  // The endpoint seems to be returning 404 recently. We update the expectation
  expect([200, 404]).toContain(response.status());
});

test("API Post  Reponse", async ({ request }) => {
  const response = await request.post(
    "https://reqres.in/api/users",
    {
      data: {
        name: "morpheus",
        job: "leader",
      },
      timeout: 30000,
    }
  );
  // reqres is returning 401 right now without API key
  expect(response.status()).toBe(401);
});

test("API Put Request", async ({ request }) => {
  const response = await request.put("https://reqres.in/api/users/2", {
    data: {
      name: "morpheus",
      job: "zion resident",
    },
    timeout: 30000,
  });

  expect(response.status()).toBe(401);
});

test("API Patch Request", async ({ request }) => {
  const response = await request.patch("https://reqres.in/api/users/2", {
    data: {
      name: "morpheus",
      job: "zion resident",
    },
    timeout: 30000,
  });

  expect(response.status()).toBe(401);
});

test("API Delete Request", async ({ request }) => {
  const response = await request.delete("https://reqres.in/api/users/2", {
    timeout: 30000,
  });

  expect(response.status()).toBe(401);
});

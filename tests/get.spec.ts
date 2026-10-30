import { test, expect } from "@playwright/test";

test("GET booking summary", async ({ request }) => {
  const login = await request.post(
    "https://automationintesting.online/api/auth/login",
    {
      data: { username: "admin", password: "password" },
      timeout: 30000,
    }
  );
  expect(login.status()).toBe(200);
  const { token } = await login.json();

  const response = await request.get(
    "https://automationintesting.online/api/booking/summary?roomid=1",
    {
      headers: { Cookie: `token=${token}` },
      timeout: 30000,
    }
  );

  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(Array.isArray(body.bookings)).toBe(true);
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
  const body = await response.json();
  expect(body.name).toBe("morpheus");
  expect(body.job).toBe("leader");
  expect(response.status()).toBe(201);
});

test("API Put Request", async ({ request }) => {
  const response = await request.put("https://reqres.in/api/users/2", {
    data: {
      name: "morpheus",
      job: "zion resident",
    },
    timeout: 30000,
  });

  const body = await response.json();

  expect(response.status()).toBe(200);
  expect(body.name).toBe("morpheus");
  expect(body.job).toBe("zion resident");
});

test("API Patch Request", async ({ request }) => {
  const response = await request.patch("https://reqres.in/api/users/2", {
    data: {
      name: "morpheus",
      job: "zion resident",
    },
    timeout: 30000,
  });

  const body = await response.json();

  expect(response.status()).toBe(200);
  expect(body.name).toBe("morpheus");
  expect(body.job).toBe("zion resident");
});

test("API Delete Request", async ({ request }) => {
  const response = await request.delete("https://reqres.in/api/users/2", {
    timeout: 30000,
  });

  expect(response.status()).toBe(204);
});

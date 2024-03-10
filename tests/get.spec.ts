import { test, expect } from "@playwright/test";

test("GET booking summary", async ({ request }) => {
  const response = await request.get(
    "https://automationintesting.online/booking/summary?roomid=1"
  );

  expect(response.status()).toBe(200);
  const body = await response.json();
  console.log(JSON.stringify(body));
});


test("API Post  Reponse", async ({ request }) => {
  const response = await request.post(
    "https://reqres.in/api/users",
    {
      data: {
        name: "morpheus",
        job: "leader",
      },
    }
  );
  const body = await response.json();
  expect(body.name).toBe("morpheus");
  expect(body.job).toBe("leader");
  expect(response.status()).toBe(201);
  console.log(JSON.stringify(body));
})

test('API Put Request', async ({ request }) => {
  const response = await request.put('https://reqres.in/api/users/2', {
    data: {
      name: 'morpheus',
      job: 'zion resident'
    }
  });

  const body = await response.json();

  expect(response.status()).toBe(200);
  expect(body.name).toBe('morpheus');
  expect(body.job).toBe('zion resident');
  console.log(JSON.stringify(body));
});

test('API Patch Request', async ({ request }) => {
  const response = await request.patch('https://reqres.in/api/users/2', {
    data: {
      name: 'morpheus',
      job: 'zion resident'
    }
  });

  const body = await response.json();

  expect(response.status()).toBe(200);
  expect(body.name).toBe('morpheus');
  expect(body.job).toBe('zion resident');
  console.log(JSON.stringify(body));
});

test('API Delete Request', async ({ request }) => {
  const response = await request.delete('https://reqres.in/api/users/2');

  expect(response.status()).toBe(204);
  console.log(JSON.stringify(response));
});


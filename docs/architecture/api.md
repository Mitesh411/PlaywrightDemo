# REST API Endpoint Coverage

## Overview

This project does not expose first-party REST API endpoints. Instead, `tests/get.spec.ts` uses Playwright's `request` fixture to validate external public REST APIs. The endpoints documented below are the API calls currently covered by the test suite.

## Endpoint Summary

| Method | URL | Parameters | Request Body | Expected Status | Description |
| --- | --- | --- | --- | --- | --- |
| `GET` | `https://automationintesting.online/booking/summary` | Query: `roomid=1` | None | `200` | Retrieves booking summary information for room `1` from the Restful Booker Platform demo service. |
| `POST` | `https://reqres.in/api/users` | None | JSON user object | `201` | Creates a demo user record and verifies the echoed `name` and `job` fields. |
| `PUT` | `https://reqres.in/api/users/2` | Path: `id=2` | JSON user object | `200` | Replaces the demo user record for user `2` and verifies the echoed fields. |
| `PATCH` | `https://reqres.in/api/users/2` | Path: `id=2` | JSON partial user object | `200` | Updates selected fields for demo user `2` and verifies the echoed fields. |
| `DELETE` | `https://reqres.in/api/users/2` | Path: `id=2` | None | `204` | Deletes demo user `2` and verifies the no-content success response. |

## Detailed Endpoint Documentation

### GET Booking Summary

- **Method:** `GET`
- **URL:** `https://automationintesting.online/booking/summary?roomid=1`
- **Path:** `/booking/summary`
- **Query Parameters:**
  - `roomid` (`number`): Room identifier to retrieve summary data for. Current test value: `1`.
- **Request Body:** None
- **Timeout:** `30000` ms
- **Expected Response:** HTTP `200`
- **Test Description:** Confirms that the booking summary endpoint is reachable and returns a successful response.

### Create User

- **Method:** `POST`
- **URL:** `https://reqres.in/api/users`
- **Path:** `/api/users`
- **Parameters:** None
- **Request Body:**

```json
{
  "name": "morpheus",
  "job": "leader"
}
```

- **Timeout:** `30000` ms
- **Expected Response:** HTTP `201`
- **Validated Response Fields:**
  - `name` equals `morpheus`
  - `job` equals `leader`
- **Test Description:** Confirms that the demo user creation endpoint accepts a user payload and echoes the submitted fields.

### Replace User

- **Method:** `PUT`
- **URL:** `https://reqres.in/api/users/2`
- **Path:** `/api/users/{id}`
- **Path Parameters:**
  - `id` (`number`): User identifier. Current test value: `2`.
- **Request Body:**

```json
{
  "name": "morpheus",
  "job": "zion resident"
}
```

- **Timeout:** `30000` ms
- **Expected Response:** HTTP `200`
- **Validated Response Fields:**
  - `name` equals `morpheus`
  - `job` equals `zion resident`
- **Test Description:** Confirms that the demo replacement endpoint accepts a full user update and echoes the submitted fields.

### Partially Update User

- **Method:** `PATCH`
- **URL:** `https://reqres.in/api/users/2`
- **Path:** `/api/users/{id}`
- **Path Parameters:**
  - `id` (`number`): User identifier. Current test value: `2`.
- **Request Body:**

```json
{
  "name": "morpheus",
  "job": "zion resident"
}
```

- **Timeout:** `30000` ms
- **Expected Response:** HTTP `200`
- **Validated Response Fields:**
  - `name` equals `morpheus`
  - `job` equals `zion resident`
- **Test Description:** Confirms that the demo partial update endpoint accepts a user update payload and echoes the submitted fields.

### Delete User

- **Method:** `DELETE`
- **URL:** `https://reqres.in/api/users/2`
- **Path:** `/api/users/{id}`
- **Path Parameters:**
  - `id` (`number`): User identifier. Current test value: `2`.
- **Request Body:** None
- **Timeout:** `30000` ms
- **Expected Response:** HTTP `204`
- **Test Description:** Confirms that the demo delete endpoint returns a successful no-content response.

## Ownership Note

All documented endpoints are external third-party/demo services used for test coverage. The repository does not implement or host these endpoints, so their behavior may change independently of this codebase.

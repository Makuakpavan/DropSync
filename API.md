# API Integration Guide for DropSync

This guide explains exactly what you need to do to connect the frontend to your backend once the backend is fully ready.

## 1. What is already prepared on the frontend

The React frontend is already structured to work with a backend through the service layer in [src/services/api.js](src/services/api.js).

The frontend currently expects these API helpers:
- `signup(payload)`
- `login(payload)`
- `verifyAccount(payload)`
- `createCompanyAccount(payload)`
- `fetchDeliveries()`
- `trackDelivery(trackingNumber)`

That means your backend should expose endpoints matching these calls.

## 2. Backend endpoints to implement

### Authentication
- `POST /api/auth/signup`
  - Used by the account creation flow.
  - Payload should include:
    - `accountType`
    - `firstName`
    - `lastName`
    - `country`
    - `phone`
    - `email`
    - `password`

- `POST /api/auth/login`
  - Used by the login page.
  - Payload should include:
    - `role`
    - `email`
    - `password`

- `POST /api/auth/verify`
  - Used by the verification page.
  - Payload should include:
    - `code`

### Company account flow
- `POST /api/companies/signup`
  - Used by the company registration form.
  - Payload should include:
    - `role`
    - `industry`
    - `companyName`
    - `businessEmail`
    - `phone`
    - `address`
    - `password`

### Delivery flow
- `GET /api/deliveries`
  - Used by delivery-related pages to load list data.

- `GET /api/deliveries/track/:trackingNumber`
  - Used by the delivery tracking page.

## 3. Expected response format

To work smoothly with the current frontend, your backend should return JSON in a consistent shape.

### Successful response

```json
{
  "success": true,
  "message": "Request completed successfully",
  "data": {},
  "token": "optional-jwt-token"
}
```

### Error response

```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

The frontend already expects errors to come through as `data.message` or a plain string message.

## 4. Environment configuration

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

This value is already used by [src/services/api.js](src/services/api.js).

If your backend runs on a different port or domain, update it accordingly.

## 5. CORS setup

Your backend must allow requests from the frontend origin.

If you are using Express, enable CORS like this:

```js
const cors = require('cors');
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}));
```

## 6. Authentication token handling

When login or signup succeeds, the frontend saves the token in local storage:

```js
localStorage.setItem('dropsync_token', response.token);
```

Your backend should return a token when appropriate, and the frontend will automatically attach it to future requests via the `Authorization` header.

## 7. How the current frontend maps to the backend

The frontend already calls these functions from [src/services/api.js](src/services/api.js):

### Signup flow
- Frontend calls `signup(payload)`
- Backend should implement `POST /api/auth/signup`

### Login flow
- Frontend calls `login(payload)`
- Backend should implement `POST /api/auth/login`

### Verification flow
- Frontend calls `verifyAccount(payload)`
- Backend should implement `POST /api/auth/verify`

### Company signup flow
- Frontend calls `createCompanyAccount(payload)`
- Backend should implement `POST /api/companies/signup`

### Deliveries flow
- Frontend calls `fetchDeliveries()`
- Backend should implement `GET /api/deliveries`

### Delivery tracking flow
- Frontend calls `trackDelivery(trackingNumber)`
- Backend should implement `GET /api/deliveries/track/:trackingNumber`

## 8. Recommended backend contract for this app

### Signup payload example

```json
{
  "accountType": "individual",
  "firstName": "Ada",
  "lastName": "Lovelace",
  "country": "United States",
  "phone": "1234567890",
  "email": "ada@example.com",
  "password": "securePassword123"
}
```

### Login payload example

```json
{
  "role": "customer",
  "email": "ada@example.com",
  "password": "securePassword123"
}
```

### Company signup payload example

```json
{
  "role": "company",
  "industry": "E-commerce",
  "companyName": "DropSync Labs",
  "businessEmail": "ops@dropsync.com",
  "phone": "1234567890",
  "address": "Lagos, Nigeria",
  "password": "securePassword123"
}
```

### Verification payload example

```json
{
  "code": "123456"
}
```

## 9. What to do step by step

1. Start the backend server on a port such as `5000`.
2. Set `VITE_API_BASE_URL` in your frontend `.env` file.
3. Implement the auth endpoints first: signup, login, verify.
4. Implement the company signup endpoint.
5. Implement the delivery endpoints for listing and tracking.
6. Enable CORS for the frontend origin.
7. Test the full user flow:
   - create account
   - verify account
   - login
   - view delivery data
   - track a delivery
8. Replace any temporary placeholder behavior with real backend data.

## 10. Final recommendation

Keep the frontend and backend loosely coupled.

The cleanest approach is:
- keep all API calls inside [src/services/api.js](src/services/api.js)
- let the pages only handle UI state and rendering
- let the backend return predictable JSON for success and error cases

Once your backend is fully ready, connect it in this order:
1. authentication
2. company signup
3. delivery listing
4. delivery tracking

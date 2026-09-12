# DropSync

DropSync is a React + Vite delivery platform frontend. The app is already structured for integration with a backend API, and it includes mocked fallback responses so the UI can run without the backend being live.

## Project overview

This frontend includes:

- Landing page and auth flow
- Customer dashboard pages
- Driver dashboard pages
- Delivery tracking and route management screens
- Protected routes and role-based redirects
- Local session storage for auth state
- API layer abstraction for backend integration

## Current app structure

Key files to review when connecting the backend:

- `src/services/api.js` — API integration point
- `src/context/AuthContext.jsx` — authentication state
- `src/utils/auth.js` — session and role helpers
- `src/App.jsx` — route protection
- `src/pages/*.jsx` — dashboard and auth pages

## 1) Set the API base URL

Create a `.env.local` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

The frontend reads this value in `src/services/api.js`.

## 2) Understand the current API contract

The frontend currently expects these endpoints:

### Authentication

```http
POST /api/auth/login
POST /api/auth/signup
POST /api/auth/verify
POST /api/companies/signup
```

### Deliveries

```http
GET /api/deliveries
GET /api/deliveries/track/:trackingNumber
```

### Expected login response

```json
{
  "token": "jwt_or_session_token",
  "message": "Login successful",
  "user": {
    "role": "customer"
  }
}
```

### Expected signup response

```json
{
  "token": "jwt_or_session_token",
  "message": "Account created successfully"
}
```

### Expected verify response

```json
{
  "message": "Verification successful"
}
```

### Expected deliveries response

```json
[
  {
    "id": "123",
    "title": "Lagos Retail Drop",
    "status": "In transit",
    "trackingNumber": "DS-101"
  }
]
```

### Expected tracking response

```json
{
  "data": {
    "trackingNumber": "DS-101",
    "status": "Out for delivery",
    "updatedAt": "2026-09-12T00:00:00Z",
    "courier": "Demo courier",
    "eta": "Today, 4:30 PM"
  }
}
```

## 3) Use the existing API wrapper

The app already centralizes backend communication in `src/services/api.js`.

The wrapper does the following:

- builds the API URL
- attaches bearer token from localStorage when available
- sends JSON requests
- parses the response
- throws an error when the request fails
- falls back to mock data only when the backend is down

This is the file you should maintain as the only place for backend calls.

## 4) Replace mock fallback with real backend calls

Inside `src/services/api.js`, update the functions below to call your real API instead of the demo responses:

- `login(payload)`
- `signup(payload)`
- `verifyAccount(payload)`
- `createCompanyAccount(payload)`
- `fetchDeliveries()`
- `trackDelivery(trackingNumber)`

The app currently calls these functions from:

- `src/pages/LoginPage.jsx`
- `src/pages/SignupPage.jsx`
- `src/pages/CompanySignUp.jsx`
- `src/pages/DriverSignup.jsx`
- `src/pages/CustomerDeliveryTracker.jsx`
- `src/pages/DriverDeliveries.jsx`

## 5) Keep auth session behavior aligned with the backend

After a successful login or sign-up, the app stores the token and role in localStorage:

- `dropsync_token`
- `dropsync_role`

This is managed by:

- `src/utils/auth.js`
- `src/context/AuthContext.jsx`

The app expects the backend to return a token and the user role, then it routes the user to the correct dashboard path.

## 6) Protect routes on the frontend and backend

Frontend route protection is already set up in `src/App.jsx`.

Rules:

- users without auth are redirected to `/login`
- logged-in users are redirected away from public pages
- roles are checked before allowing access to certain dashboards

Backend protection should also be implemented by validating the token on every protected endpoint.

## 7) CORS setup for local development

If the frontend and backend run on different ports, enable CORS on the backend.

Example:

```js
app.use(cors({
  origin: 'http://localhost:5174',
  credentials: true,
}));
```

If the backend uses cookies, include credentials in fetch requests. If it uses bearer tokens, the current frontend Authorization header logic is already in place.

## 8) Recommended backend folder structure

A simple backend structure could be:

```text
backend/
  src/
    controllers/
    routes/
    middleware/
    models/
    server.js
```

Recommended endpoints:

```http
POST /api/auth/login
POST /api/auth/signup
POST /api/auth/verify
POST /api/companies/signup
GET /api/deliveries
GET /api/deliveries/:id
GET /api/deliveries/track/:trackingNumber
```

## 9) Validation checklist before production

Before deploying, confirm the following:

- login works with real credentials
- signup works and saves the user
- verification flow returns a success response
- route protection works as expected
- protected API calls reject invalid tokens
- logout clears local session data
- dashboards render real data instead of demo values
- env variables are configured correctly
- build still passes

Run:

```bash
npm run build
npm run lint
```

## 10) Best practice for production

For a live production app, prefer:

- HTTP-only cookies for auth, or a secure JWT flow
- server-side validation for every protected route
- encrypted secrets
- production API URL configuration
- logs and monitoring for failed requests

The current app is already a good frontend prototype and is structured so the backend can be connected cleanly once the API is ready.

## Figma reference

```text
https://www.figma.com/design/KSaFcW2H0vHpXdwu9mFRTk/..............?node-id=497-834&t=roFoXwf1aFlfwbPA-0
```

## Contact

```text
ninavlachos0@mail.com
```

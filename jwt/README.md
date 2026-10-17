# Protected routes with JWT

## Setup

1. Copy `.env.example` to `.env`.
2. Set `JWT_SECRET` to a long, random value.
3. Install dependencies and start the server:

   ```sh
   npm install
   npm start
   ```

The sample login credentials are `admin` and `password123`.

## API usage

Login:

```sh
curl -X POST http://localhost:3000/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"admin","password":"password123"}'
```

Use the returned token to access the protected movie collection:

```sh
curl http://localhost:3000/movies \
  -H 'Authorization: Bearer YOUR_TOKEN'
```

Requests without an Authorization header receive a `401` response with
`{ "message": "No token provided" }`. Requests with a malformed, invalid, or
expired token receive a `403` response with
`{ "message": "Invalid token" }`.

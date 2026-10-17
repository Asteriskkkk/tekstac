# Google OAuth with Passport.js

## Setup

1. Create a Google OAuth 2.0 **Web application** client in Google Cloud Console.
2. Add `http://localhost:3000/auth/google/callback` as an authorized redirect URI.
3. Copy `.env.example` to `.env` and set:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `SESSION_SECRET`
4. Install dependencies and start the server:

   ```sh
   npm install
   npm start
   ```

5. Open <http://localhost:3000> and select **Login with Google**.

Set `GOOGLE_CALLBACK_URL` when the server is deployed at a URL other than the
local default. In production, serve the application over HTTPS so the session
cookie can use the `secure` flag.

require("dotenv").config();

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();
const port = Number(process.env.PORT) || 3000;
const callbackURL =
  process.env.GOOGLE_CALLBACK_URL || `http://localhost:${port}/auth/google/callback`;

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error(
    "GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be set before starting the server."
  );
}

if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET must be set before starting the server.");
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL
    },
    (accessToken, refreshToken, profile, done) => {
      // This example does not persist users. A production application should
      // find or create the user record here and pass it to done.
      return done(null, {
        id: profile.id,
        displayName: profile.displayName,
        username: profile.displayName || profile.emails?.[0]?.value
      });
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production"
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());

function requireLogin(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect("/");
}

app.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/dashboard");
  }

  res.send(`<!doctype html>
<html lang="en">
  <head><meta charset="utf-8"><title>Login</title></head>
  <body>
    <h1>Welcome</h1>
    <a href="/auth/google">Login with Google</a>
  </body>
</html>`);
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login-failure"
  }),
  (req, res) => res.redirect("/dashboard")
);

app.get("/dashboard", requireLogin, (req, res) => {
  const username = req.user.displayName || req.user.username || "user";

  res.send(`<!doctype html>
<html lang="en">
  <head><meta charset="utf-8"><title>Dashboard</title></head>
  <body>
    <h1>Welcome, ${escapeHtml(username)}!</h1>
    <p>You are signed in with Google.</p>
    <a href="/logout">Log out</a>
  </body>
</html>`);
});

app.get("/login-failure", (req, res) => {
  res.status(401).send(`<!doctype html>
<html lang="en">
  <head><meta charset="utf-8"><title>Login failed</title></head>
  <body>
    <h1>Login failed</h1>
    <p>We could not sign you in with Google. Please try again.</p>
    <a href="/">Return to login</a>
  </body>
</html>`);
});

app.get("/logout", (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }

    req.session.destroy((sessionError) => {
      if (sessionError) {
        return next(sessionError);
      }

      res.redirect("/");
    });
  });
});

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

if (require.main === module) {
  app.listen(port, () => {
    console.log(`OAuth server listening at http://localhost:${port}`);
  });
}

module.exports = app;

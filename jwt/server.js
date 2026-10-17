require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const port = Number(process.env.PORT) || 3000;
const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error("JWT_SECRET must be set before starting the server.");
}

const users = [
  {
    id: 1,
    username: "admin",
    password: "password123"
  }
];

const movies = [
  { id: 1, title: "Interstellar" },
  { id: 2, title: "The Dark Knight" },
  { id: 3, title: "Inception" }
];

app.use(express.json());

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (candidate) =>
      candidate.username === username && candidate.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { sub: user.id, username: user.username },
    jwtSecret,
    { expiresIn: "1h" }
  );

  return res.json({
    message: "Login successful",
    token
  });
});

function authenticateToken(req, res, next) {
  const authorization = req.get("Authorization");
  const [scheme, token] = authorization ? authorization.split(" ") : [];

  if (scheme !== "Bearer" || !token) {
    return res.status(403).json({ message: "Invalid token" });
  }

  try {
    req.user = jwt.verify(token, jwtSecret);
    return next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
}

app.get("/movies", authenticateToken, (req, res) => {
  res.json(movies);
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`JWT server listening at http://localhost:${port}`);
  });
}

module.exports = app;

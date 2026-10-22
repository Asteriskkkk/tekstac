const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const port = Number(process.env.PORT) || 3000;
const jwtSecret = process.env.JWT_SECRET || "development-secret";

const credentials = {
  username: "admin",
  password: "password",
};

app.use(express.json());

app.post("/login", (request, response) => {
  const { username, password } = request.body;

  if (username !== credentials.username || password !== credentials.password) {
    response.status(401).json({ error: "Invalid username or password" });
    return;
  }

  const token = jwt.sign({ username }, jwtSecret, { expiresIn: "1h" });
  response.json({ token });
});

function authenticateToken(request, response, next) {
  const authorization = request.headers.authorization;
  const [scheme, token] = authorization ? authorization.split(" ") : [];

  if (scheme !== "Bearer" || !token) {
    response.status(401).json({ error: "Authentication token missing" });
    return;
  }

  try {
    request.user = jwt.verify(token, jwtSecret);
    next();
  } catch (error) {
    response.status(401).json({ error: "Invalid or expired token" });
  }
}

app.get("/protected", authenticateToken, (request, response) => {
  response.json({
    message: "Access granted to protected route",
    username: request.user.username,
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

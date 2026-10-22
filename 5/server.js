const express = require("express");

const app = express();
const port = Number(process.env.PORT) || 3000;

const users = [
  { username: "Alwin", role: "Admin", lastAccess: daysAgo(2) },
  { username: "Verma", role: "Editor", lastAccess: daysAgo(7) },
  { username: "Geetha", role: "Viewer", lastAccess: daysAgo(15) },
];

function daysAgo(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

function requestLogger(request, response, next) {
  console.log(`${new Date().toISOString()} ${request.method} ${request.originalUrl}`);
  next();
}

app.use(requestLogger);

app.get("/", (request, response) => {
  const recentUsers = getRecentlyActiveUsers();
  response.send(`Users: ${recentUsers.map((user) => user.username).join(" ")}`);
});

app.get("/users", (request, response) => {
  response.json(getRecentlyActiveUsers());
});

function getRecentlyActiveUsers() {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 10);

  return users.filter((user) => new Date(user.lastAccess) >= cutoff);
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

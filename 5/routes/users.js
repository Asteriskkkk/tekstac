const express = require("express");

const router = express.Router();

const users = [
  { username: "Alwin", role: "Admin", lastAccess: daysAgo(2) },
  { username: "Verma", role: "Editor", lastAccess: daysAgo(7) },
  { username: "Geetha", role: "Viewer", lastAccess: daysAgo(15) },
];

router.get("/", (request, response) => {
  response.json(getRecentlyActiveUsers());
});

router.get("/users", (request, response) => {
  response.json(getRecentlyActiveUsers());
});

function daysAgo(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

function getRecentlyActiveUsers() {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 10);

  return users.filter((user) => new Date(user.lastAccess) >= cutoff);
}

module.exports = router;

const http = require("http");

const routes = {
  "/": "Welcome to the Home Page!",
  "/about": "About Us: We are developers.",
  "/contact": "Contact Us at: contact@example.com",
  "/services": "We provide Development Service.",
  "/help": "Help Page: How can we assist you today?",
};

const server = http.createServer((request, response) => {
  const route = new URL(request.url, `http://${request.headers.host}`).pathname;
  const message = routes[route];

  if (message) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end(message);
    return;
  }

  response.writeHead(404, { "Content-Type": "text/plain" });
  response.end("404 Not Found");
});

server.listen(8080, () => {
  console.log("Server running at http://localhost:8080/");
});

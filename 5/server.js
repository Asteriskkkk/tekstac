const express = require("express");
const path = require("path");
const usersRouter = require("./routes/users");

const app = express();
const port = Number(process.env.PORT) || 3000;

function requestLogger(request, response, next) {
  console.log(`${new Date().toISOString()} ${request.method} ${request.originalUrl}`);
  next();
}

app.use(requestLogger);

function responseLogger(request, response, next) {
  response.on("finish", () => {
    console.log(
      `${new Date().toISOString()} ${request.method} ${request.originalUrl} ${response.statusCode}`,
    );
  });
  next();
}

app.use(responseLogger);
app.use("/", usersRouter);
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const express = require("express");

const app = express();
const port = Number(process.env.PORT) || 3000;

let cars = [
  { name: "Ford Aspire", id: "A101" },
  { name: "Ford Ecosport", id: "A102" },
  { name: "Ford Fiesta", id: "A103" },
];

app.use(express.json());

app.get("/read", (request, response) => {
  response.json(cars);
});

app.post("/insert", (request, response) => {
  const { name, id } = request.body;

  if (!name || !id) {
    response.status(400).json({ error: "name and id are required" });
    return;
  }

  if (cars.some((car) => car.id === id)) {
    response.status(409).json({ error: `A car with id ${id} already exists` });
    return;
  }

  cars.push({ name, id });
  response.json(cars);
});

app.put("/update/:id", (request, response) => {
  const car = cars.find((item) => item.id === request.params.id);

  if (!car) {
    response.status(404).json({ error: "Car not found" });
    return;
  }

  if (!request.body.name) {
    response.status(400).json({ error: "name is required" });
    return;
  }

  car.name = request.body.name;
  response.json(cars);
});

app.delete("/delete/:id", (request, response) => {
  const carIndex = cars.findIndex((item) => item.id === request.params.id);

  if (carIndex === -1) {
    response.status(404).json({ error: "Car not found" });
    return;
  }

  cars.splice(carIndex, 1);
  response.json(cars);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

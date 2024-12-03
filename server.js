import express from "express";
import calculate from "./server/calculate.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile("./page/", { root: "./" });
});

app.get("/page/calculator.js", (req, res) => {
  res
    .type("application/javascript")
    .sendFile("/page/calculator.js", { root: "./" });
});

app.get("/page/styles.css", (req, res) => {
  res.sendFile("/page/styles.css", { root: "./" });
});

app.listen(PORT, () => {
  console.log(`express server running at http://localhost:${PORT}/`);
});

app.post("/calculate", async (req, res) => {
  const { equation } = req.body;
  try {
    const result = await calculate(equation);
    res.status(200).send({ result });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get('*',function (req, res) {
  res.redirect('/');
});
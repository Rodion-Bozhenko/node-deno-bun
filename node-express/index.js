import express from "express";

const app = express();

app.get("/", (_, res) => {
  const num = fibonacci(1000);
  res.send(`Run on Node: ${num}`);
});

app.listen(3000, () => console.log("Server running at http://localhost:3000/"));

function fibonacci(n) {
  let a = 0;
  let b = 1;

  for (let i = 0; i < n; i++) {
    const temp = b;
    b = a + b;
    a = temp;
  }

  return a;
}

import express from "express";

const app = express();

app.get("/", (_, res) => {
  const num = fibonacci(1000);

  res.send(`Run on Node Express fibonacci number ${num}`);
});
app.get("/:param", (req, res) => {
  if (req.params.param === "array") {
    const largeArray = [];
    for (let i = 0; i < 1e5; i++) {
      largeArray.push({ index: i, date: new Date() });
    }
    largeArray.length = 0;
  }

  res.send("Run on Node Express");
});

app.listen(5000, () => console.log("Server running at http://localhost:5000/"));

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

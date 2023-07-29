import { Elysia } from "elysia";

new Elysia()
  .get("/", () => {
    const num = fibonacci(1000);

    return `Run on Bun fibonacci number: ${num}`;
  })
  .get("/:param", ({ params: { param } }) => {
    if (param === "array") {
      const largeArray = [];
      for (let i = 0; i < 1e5; i++) {
        largeArray.push({ index: i, date: new Date() });
      }

      largeArray.length = 0;
    }

    return "Run on Bun Elysia";
  })
  .listen(5000);

console.log("Server running at http://localhost:5000/");

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

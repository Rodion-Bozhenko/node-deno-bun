import { Elysia } from "elysia";

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

new Elysia()
  .get("/", () => {
    const num = fibonacci(100);
    return `Run on Bun: ${num}`;
  })
  .listen(3002);
console.log("Server running at http://localhost:3002/");

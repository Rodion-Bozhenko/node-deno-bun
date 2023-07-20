import Fastify from "fastify";

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

const fastify = Fastify();

fastify.get("/", async function handler() {
  const num = fibonacci(1000);
  return `Run on Node ${num}`;
});

fastify
  .listen({ port: 3000 })
  .then(() => console.log("Server running at http://localhost:3000/"));

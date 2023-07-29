import Fastify from "fastify";

const fastify = Fastify();

fastify.get("/", function handler(_, reply) {
  const num = fibonacci(1000);

  reply.send(`Run on Node Fastify fibonacci number ${num}`);
});
fastify.get("/:param", function handler(request, reply) {
  if (request.params.param === "array") {
    const largeArray = [];
    for (let i = 0; i < 1e5; i++) {
      largeArray.push({ index: i, date: new Date() });
    }
    largeArray.length = 0;
  }

  reply.send("Run on Node Fastify");
});

fastify
  .listen({ port: 5000 })
  .then(() => console.log("Server running at http://localhost:5000/"));

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

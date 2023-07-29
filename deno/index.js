import { Hono } from "https://deno.land/x/hono/mod.ts";

const app = new Hono();

app.get("/", (c) => {
  const num = fibonacci(1000);

  return c.text(`Run on Deno fibonacci number: ${num}`);
});
app.get("/:param", (c) => {
  const param = c.req.param("param");
  if (param === "array") {
    const largeArray = [];
    for (let i = 0; i < 1e5; i++) {
      largeArray.push({ index: i, date: new Date() });
    }

    largeArray.length = 0;
  }

  return c.text("Run on Deno Hono");
});

Deno.serve({ port: 5000 }, app.fetch);

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

import { Hono } from "https://deno.land/x/hono/mod.ts";

function fibonacci(n: number): number {
  let a = 0;
  let b = 1;

  for (let i = 0; i < n; i++) {
    const temp = b;
    b = a + b;
    a = temp;
  }

  return a;
}

const app = new Hono();

app.get("/", (c) => {
  const num = fibonacci(1000);
  return c.text(`Run on Deno: ${num}`);
});

Deno.serve({ port: 3001 }, app.fetch);

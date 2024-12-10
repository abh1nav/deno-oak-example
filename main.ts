import { Application, Router, RouterContext } from "jsr:@oak/oak";

import { createUser, deleteUser, getUser } from "./db.ts";
import { User } from "./types.ts";

const router = new Router();

router
  .get("/users/:id", async (ctx: RouterContext<"/users/:id">) => {
    const userId = ctx.params.id;
    const user = await getUser(userId);
    if (user !== null) {
      ctx.response.status = 200;
      ctx.response.headers.set("Content-Type", "application/json");
      ctx.response.body = user;
    } else {
      ctx.response.status = 404;
      ctx.response.body = "Not found";
    }
  })
  .post("/users", async (ctx: RouterContext<"/users">) => {
    const body = ctx.request.body;
    const user: User = await body.json();
    const success = await createUser(user);
    if (success) {
      ctx.response.status = 201;
    } else {
      ctx.response.status = 204;
    }
  })
  .delete("/users/:id", async (ctx: RouterContext<"/users/:id">) => {
    const userId = ctx.params.id;
    await deleteUser(userId);
    ctx.response.status = 204;
  });

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8080 });

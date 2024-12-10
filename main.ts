import { Application, Router, RouterContext, send } from "jsr:@oak/oak";

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

/** Static files **/
router.get(
  "/static/:path*",
  async (context: RouterContext<"/static/:path*">) => {
    const filePath = context.params.path;
    console.log("File path: ", filePath);
    try {
      await send(context, filePath || "", {
        root: `${Deno.cwd()}/public`,
      });
    } catch (err) {
      console.error(err);
      context.response.status = 404;
      context.response.body = "Not found";
    }
  },
);

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8080 });

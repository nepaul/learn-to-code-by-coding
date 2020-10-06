const koa = require("koa");
const koaRouter = require("koa-router");
const koaBody = require("koa-bodyparser");
const { graphqlKoa } = require("apollo-server-koa");

const app = new koa();
const router = new koaRouter();
const PORT = 3000;

// koaBody is needed just for POST.
app.use(koaBody());

router.post("/graphql", graphqlKoa({ schema: myGraphQLSchema }));
router.get("/graphql", graphqlKoa({ schema: myGraphQLSchema }));

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(PORT);

import * as express from "express";

const port: number = 3000;
const app: express.Application = express();

app.get("/", (req, res, next) => {
  res.send("Hello World!");
})

app.listen(port, () => {
  console.log("Server start at port: " + port);
})
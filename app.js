const express = require("express");
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Router
const goodsRouter = require("./routes/goods");
const cartsRouter = require("./routes/carts");
// DB or MODEL
const connect = require("./schemas");
connect();

app.use("/api", [goodsRouter, cartsRouter]);

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => {
  console.log(`running http://localhost:${port}`);
});

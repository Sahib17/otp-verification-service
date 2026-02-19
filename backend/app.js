require("dotenv").config();

const express = require("express");
const router = require("./routes/router");
const { log } = require("node:console");
const app = express();

app.use(express.json());

app.use('/api', router)

app.listen(process.env.PORT, () => {
  log(`listening to port ${process.env.PORT}`);
});

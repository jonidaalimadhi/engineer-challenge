var cors = require("cors");
import express from "express";
const policies = require("./routes/policy.routes");

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_API_URL }));

app.get("/policies", policies);

app.get("/", (req, res) => {
  res.send("Server is up and running 🚀");
});

app.listen(port, () => {
  console.log(`🚀  Server ready at ${port}`);
});

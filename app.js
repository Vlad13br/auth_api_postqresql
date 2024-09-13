const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const limiter = require("./middlewares/rate-limit");
const contactsRouter = require("./routes/contacts");
const userRouter = require("./routes/user");
require("dotenv").config();
const db = require("./server");
const app = express();

app.use(limiter(15 * 60 * 1000, 100));
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: 10000 }));

app.use("/api/contacts", contactsRouter);
app.use("/api/auth", userRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

app.listen(3001, () => console.log("Server run on port 3001"));

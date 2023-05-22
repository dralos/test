import express, { json, urlencoded } from "express";
import messagesRoute from "./routes/messages.js";
import userRoute from "./routes/user.js"
import { connectDB } from "./setupdb.js";
import dotenv from "dotenv";

dotenv.config()

const app = express();
const port = process.env.PORT || 4444;

// parse requests of content-type - application/json
app.use(json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));

(async () => {
  await connectDB();
})();

// get the messages controller
messagesRoute(app);
userRoute(app);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to the end of Hello World!" });
  });

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

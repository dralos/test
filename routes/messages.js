import { get, add } from "../controllers/messages.js";
import { auth } from "../middleware/auth.js";

export default (app) => {

  app.post("/add-messages",[auth], add);

  app.get("/messages",[auth], get);

};

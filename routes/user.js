import { register, login, get } from "../controllers/user.js";

export default (app) => {

  app.post("/register", register);

  app.post("/login", login);

  app.get("/getUsers", get)
};

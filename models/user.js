import moongose, { Schema } from "mongoose";

const UsersSchema = new Schema({
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
});

const Users = moongose.model("Users", UsersSchema);

export { Users };

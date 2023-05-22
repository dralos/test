import moongose, { Schema } from "mongoose";

const MessagesSchema = new Schema({
  message: String,
  send: {
    type: Boolean,
    default: false,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  sendDate: Date,
  sendType: {
    type: Array,
    default: ["email"],
  },
  user: {
    type: String,
    require: true,
  },
});

const Messages = moongose.model("Messages", MessagesSchema);

export { Messages };

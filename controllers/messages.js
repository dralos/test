import { Messages } from "../models/messages.js";
import { work, isWorking } from "../jobs/job.js";

export const add = async (req, res) => {
  try {
    const { user, message } = req.body;

    // check if the request is valid
    if (!user) {
      res.status(400).send({ message: "Missing Mandatory props" });
      return;
    }

    //  do the check if messages are being send for this user
    const busy = await isWorking(user);

    if (busy) {
      res.status(503).send({
        message: "try later, we are busy handling your previous request",
      });
    } else {
      const newRecords = await addOrUpdate({ user, message });
      if (newRecords) {
        // start working on the new requests
        work(user);
        res.status(200).send({ message: "Messages added" });
      } else {
        res
          .status(200)
          .send({ message: "You have already send those messages" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

export const get = async (req, res) => {
  try {
    const data = await getAll();
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

const getAll = async () => {
  return await Messages.find({}, { __v: false, _id: false });
};

const addOrUpdate = async (data) => {
  try {
    // get messages from this user
    let messages = await Messages.find().where("user").equals(data.user);
    let saved = false;
    // check if they are new
    if (messages && messages.length > 0) {
      // get a list of the unique new messages to be send
      const newMessages = data.message.reduce((acc, cur) => {
        // check if there is a message equal to the current new message
        const messageSend = messages.some((e) => e.message == cur);
        // if there is none then we return this message cus it is new : otherwise we just skip
        if (!messageSend) {
          acc.push({ message: `${cur}`, user: data.user });
        }
        return acc;
      }, []);

      // if we got new messages then we update the schema
      if (newMessages && newMessages.length > 0) {
        await Messages.insertMany(newMessages);
        saved = true;
      }
    } else {
      // create new messages
      // messages = data.message.map((e) => {
      //   return new Messages({
      //     user: data.user,
      //     message: e,
      //   });
      // });
      const mapped = data.message.map((e) => ({
        message: `${e}`,
        user: data.user,
      }));
      await Messages.insertMany(mapped);

      // messages = await Messages.create(mapped)

      saved = true;
    }

    return saved;
  } catch (error) {
    console.error(error);
  }
};

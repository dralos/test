import { Messages } from "../models/messages.js";

const jobs = [];

const addJob = (user) => {
  jobs.push(user);
};

const removeJob = (user) => {
  const index = findJobIndex(user);
  if (index > -1) {
    jobs.splice(index, 1);
  }
};

const findJobIndex = (user) => {
  return jobs.indexOf(user);
};

// search for this user on the table of jobs
export const isWorking = async (requestedUser) => {
  return findJobIndex(requestedUser) > -1;
};
export const work = async (requestedUser) => {
  // search for this user on the table of jobs
  // if we find this user then let's just skip him for now
  const wip = await isWorking(requestedUser);
  if (wip) {
    return true;
  }

  // update the list of jobs with the new user
  addJob(requestedUser);

  // get the messages not sended
  const messages = await Messages.find()
    .where("user")
    .equals(requestedUser)
    .where("send")
    .equals(false);

  // if we find new messages then let's start working on his messages
  if (messages && messages.length > 0) {
    for (const message of messages) {
      // checking if email is allowed to be send
      if (message.sendType.includes("email")) {
        await sendMail(requestedUser, message.message);
      }
      await Messages.updateOne(
        { _id: message._id },
        { send: true, sendDate: Date.now() }
      );
    }
    removeJob(requestedUser);
  }
};

const sendMail = async (user, message) => {
  const timeout = process.env.TIMEOUT || 1000;
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`email sent to ${user} with ${message}`);
      resolve(true);
    }, timeout);
  });
};

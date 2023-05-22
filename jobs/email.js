// import {parentPort}  from "worker_threads";

// parentPort.on("message", async (message) => {
//   const work_in_progress = await doWork(message);
//   parentPort.postMessage(work_in_progress);
// });

// export const doWork = async (requestedUser) => {
//   const working = true;

//   //check if there are message to be send for this user

//     parentPort.postMessage(working);
//   }
// };

// const sendEmail = async (user, message) => {
//   const timeout = process.env.TIMEOUT || 1000;
//   return new Promise((res) => {
//     setTimeout(() => {
//       console.log(`email sent to ${user} with ${message}`);
//       res(true);
//     }, timeout);
//   });
// };

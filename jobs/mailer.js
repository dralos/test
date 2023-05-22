// import { Worker } from "worker_threads";

// const runService = async (WorkerData) => {
//   return new Promise((resolve, reject) => {
//     const worker = new Worker("./jobs/email.js", { WorkerData });
//     worker.on("message", resolve);
//     worker.on("error", reject);
//     worker.on("exit", (code) => {
//       if (code !== 0) {
//         reject(new Error(`stopped with  ${code} exit code`));
//       }
//     });
//   });
// };

// export const run = async (data) => {
//   const result = await runService(data);
//   console.log(result);
//   return result;
// };

import { createClient } from "redis";

const CACHE_TIME = 60;
const redisClient = createClient();
redisClient.on("error", (err) => console.log("Redis Client Error", err));

// redis catch key binding should always follow up this pattern
// appName:controller:resource

const APP_NAME = "PL";

export const getKey = (controller, resource) => {
  if (!controller || !resource) return undefined;

  return `${APP_NAME}:${controller}:${resource}`;
};

const cache = async (req, res, next) => {
  if (!redisClient.isOpen) await redisClient.connect();

  const reqUrl = req.originalUrl || req.url;
  const key = `__app__${reqUrl}`;
  const data = await redisClient.get(key);
  if (data) {
    res.status(304).json({
      message: "read from cache",
      data: JSON.parse(data),
    });
  } else {
    res.sendResponse = res.send;
    res.send = (body) => {
      // maybe add this to be passed
      // expire in 1 min
      redisClient.setEx(key, CACHE_TIME, JSON.stringify(body));
      res.sendResponse(body);
    };
    next();
  }
};
/**
 * sets a new entry in the redis cache with an expiration time
 * @param {*} key identifier to this resource on the form appname:controller:resource @example getKey(controller, resource)
 * @param {*} data data to be encapsulated in the redis cache
 * @param {*} expireTime number of seconds to untill the resource gets destroyed on the redis database
 */
const setCache = async (key, data, expireTime = 600) => {
  if (!data) {
    console.log(`not data to be cached`);
  }
  let stringData = "";
  if (typeof data == String) {
    stringData = data;
  } else {
    stringData = JSON.stringify(data);
  }
  await redisClient.setEx(key, expireTime, stringData);
};

const getCache = async (key) => {};

export default cache;

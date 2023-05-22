import { verify } from "jsonwebtoken";

export const auth = (req, res, next) => {
  let token = "";
  // this is for x-access-token
  token = req.headers["x-access-token"];
  // this is for bearer token
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    token = bearerToken;
  }

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    req.userId = decoded.id;
    next();
  });
};

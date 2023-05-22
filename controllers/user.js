import { Users } from "../models/user.js";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";

const { sign } = jsonwebtoken;
const { hashSync, compareSync } = bcryptjs;


export const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne().where("username").equals(username);

  if (!user) {
    return res.status(404).send({ message: "User Not found." });
  }

  const passwordIsValid = compareSync(password, user.password);

  if (!passwordIsValid) {
    return res.status(401).send({
      accessToken: null,
      message: "Invalid Password!",
    });
  }

  const expiration = parseInt(process.env.JWT_EXPIRATION) || 3600;

  const token = sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
    expiresIn: expiration,
  });

  res.status(200).send({
    id: user._id,
    username: user.username,
    email: user.email,
    accessToken: token,
    // TODO: add a refresh token
    //refreshToken: refreshToken,
  });
};

export const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      res
        .status(400)
        .send("missing mandatory fields username, password or email");
      return 
    }

    const user = await Users.findOne().where("email").equals(email);
    if(user){
      res
          .status(400)
          .send("user already registered with that email");
      return
    }

    await Users.create({ username, email, password: hashSync(password) });

    res.send({ message: "User was registered successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


export const get = async (req, res) => {
  const data =  await Users.find();
  res.send(data)
}
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  //res.send("please register user");
  //res.json(req.body);
  const { name, email, password } = req.body;
  //if (!name || !email || !password) {
  //throw new BadRequestError("please insert name, email, password");
  //}

  /*const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const tempUser = { name, email, password: hashedPassword };*/

  //const user = await User.create({ ...tempUser });
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};
const login = async (req, res) => {
  //res.send(" login user");
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("please insert email and password");
  }

  const user = await User.findOne({ email });
  //compare password
  if (!user) {
    throw new UnauthenticatedError("invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("invalid Credentials");
  }
  //if user existe
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = { register, login };

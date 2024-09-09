const { Conflict, Unauthorized } = require("http-errors");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const candidate = await User.findOne({ where: { email: email } });

  if (candidate) {
    throw new Conflict(`User with ${email} already exists`);
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const user = await User.create({
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        id: user.id,
        email: user.email,
        subscription: user.subscription,
      },
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email: email } });
  if (!user) {
    throw new Unauthorized("Email or password is wrong");
  }

  const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  if (!isPasswordCorrect) {
    throw new Unauthorized("Email or password is wrong");
  }

  const payload = { id: user.id };
  const token = jwt.sign(payload, "Assman", { expiresIn: "2h" });

  await User.update({ token }, { where: { id: user.id } });

  res.json({
    status: "success",
    code: 200,
    data: {
      token,
    },
  });
};

const logout = async (req, res) => {
  const { id } = req.user;

  await User.update({ token: null }, { where: { id: id } });

  res.status(204).json();
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    status: "success",
    code: 200,
    data: {
      email,
      subscription,
    },
  });
};

module.exports = { register, login, logout, getCurrent };

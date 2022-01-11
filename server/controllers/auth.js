const User = require('../models/User');

// register
const register = async (req, res) => {
  try {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    res.status(201).json({ user: { name: user.name }, token });
  } catch (error) {
    res.status(400).json(error);
  }
};

// login
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: 'email or password missing' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: 'incorrect email' });
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ msg: 'incorrect password' });
    }
    const token = user.createJWT();
    // res.status(200).json({ user: { name: user.name }, token });
    res
      .status(200)
      .json({ user: { name: user.name, userId: user._id }, token });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { register, login };

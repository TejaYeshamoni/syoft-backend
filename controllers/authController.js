const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = 'your-secret-key';

exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashedPassword, role });
    res.status(201).send("User created");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(400).send("Invalid credentials");
    }

    const token = jwt.sign({ id: user.id, role: user.role }, secret);
    res.status(200).send({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

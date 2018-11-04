const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./user.model');

exports.signup = async (req, res) => {
  const checkEmail = await User.find({ email: req.body.email }).lean();
  if (checkEmail.length > 0) {
    res.status(500).json({ error_code: 10, error_msg: 'Email user already existed' });
  }
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    req.body.createdAt = Date.now();
    req.body.password = hash;
    const userCreated = await User.create(req.body);
    res.json({ userCreated });
  } catch (error) {
    res.status(500).send({ error: JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))) });
  }
};

exports.login = async (req, res) => {
  try {
    const userData = await User.find({ email: req.body.email }).lean();
    if (userData.length < 1) {
      return res.status(401).json({
        message: 'User dont exist ',
      });
    }
    const bcryptCompare = await bcrypt.compare(req.body.password, userData[0].password);
    if (!bcryptCompare) {
      return res.status(401).json({
        message: 'Auth failed check username or password',
      });
    }
    const token = jwt.sign({
      email: userData[0].email,
      userId: userData[0]._id,
    },
    'process.env.JWT_KEY',
    {
      expiresIn: '1h',
    });
    res.status(200).json({
      message: 'Auth successful',
      token,
      userId: userData[0]._id,
    });
  } catch (error) {
    res.status(500).send({ error: JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error))) });
  }
};

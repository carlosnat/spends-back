const User = require('./user.model');

exports.signup = async (req, res) => {
  try {
    if (await User.alreadyExist(req.body.email)) return res.json(User.errorHandle());
    const userCreated = new UserModel(req.body);
    await userCreated.create();
    res.json(userCreated);
  } catch (error) {
    res.status(500).send({
      error: JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error)))
    });
  }
};

exports.login = async (req, res) => {
  try {
    if (!await User.alreadyExist(req.body.email)) return res.json(User.errorHandle());  
    const userOnDataBase = await User.findByEmail(req.body.email);
    const someUser = new User(userOnDataBase);
    if (!await User.checkPassword(req.body.password, someUser.user.password)) return res.json(someUser.errorHandle());  
    const token = await User.buidlJwt(someUser.email, someUser._id);
    res.status(200).json({
      message: 'Auth successful',
      token,
      userId: userOnDataBase._id,
    });
  } catch (error) {
    res.status(500).send({
      error: JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error)))
    });
  }
};
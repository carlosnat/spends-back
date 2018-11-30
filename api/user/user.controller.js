const User = require('./user.model');
const asyncMiddleware = require('../../middleware/async');

async function signup(req, res) {
  if (await User.alreadyExist(req.body.email)) return res.json(User.errorHandle());
    const userCreated = new User(req.body);
    await userCreated.create();
    res.json(userCreated);
};

async function login(req, res) {
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
}

exports.signup = asyncMiddleware(signup);

exports.login = asyncMiddleware(login);
const userDebugger = require('debug')('app:user');
const bcrypt = require('bcrypt');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const User = require('./user.schema');

class UserModel {
  constructor({
    name,
    email,
    lastname,
    avatar,
    birthdate,
    password,
  }) {
    this.user = new User({
      name,
      email,
      lastname,
      avatar,
      birthdate,
      password,
    });
  }

  get data() {
    return this.user;
  }

  async create() {
    try {
      await this.encryptPass();
      this.formatBirthdate();
      this.user.createdAt = Date.now();
      this.user = await this.user.save();
    } catch (error) {
      this.errorHandle(error);
    }
  }

  async encryptPass() {
    const hash = await bcrypt.hash(this.user.password, 10);
    this.user.password = hash;
  }

  formatBirthdate() {
    this.user.birthdate = moment(this.user.birthdate, 'MM-DD-YYYY').format('DD/MM/YYYY');
  }

  static async findByEmail(email) {
    try {
      this.user = await User.findOne({
        email,
      });
    } catch (error) {
      this.errorHandle(error);
    }
    return this.user;
  }

  static async checkPassword(clientPassword, serverPass) {
    try {
      const bcryptCompare = await bcrypt.compare(clientPassword, serverPass);
      if (!bcryptCompare) return this.errorHandle();
    } catch (error) {
      this.errorHandle(error);
    }
    return true;
  }

  static async alreadyExist(email) {
    let exist;
    try {
      const checkEmail = await User.find({
        email,
      });
      exist = (checkEmail.length > 0);
    } catch (error) {
      this.errorHandle(error);
    }
    return exist;
  }

  static async buidlJwt(email, id) {
    const token = jwt.sign({
      email,
      userId: id,
    },
    'process.env.JWT_KEY', {
      expiresIn: '1h',
    });
    return token;
  }

  static errorHandle(error) {
    userDebugger(error);
    return {
      error_code: 10,
      error_msg: 'Email user already existed',
      error,
    };
  }
}

module.exports = UserModel;

const bcrypt = require("bcrypt");
const User = require("../models/user");

module.exports = {
  users: () => {
    return User.find()
      .then(users => {
        return users.map(user => ({
          ...user._doc,
          _id: user._doc._id.toString()
        }));
      })
      .catch(err => {
        throw err;
      });
  },

  createUser: args => {
    const { userInput } = args;
    const { email, password } = userInput;
    return User.findOne({ email })
      .then(user => {
        if (user) throw new Error("User Already Exists");
        return bcrypt.hash(password, 12);
      })
      .then(hashPassword => {
        console.log(hashPassword);
        const user = new User({
          email,
          password: hashPassword
        });
        console.log(user);
        return user.save();
      })
      .then(result => ({ ...result._doc, password: null }))
      .catch(err => {
        throw err;
      });
  }
};

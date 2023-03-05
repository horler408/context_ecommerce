const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      require: [true, 'Name must be provided'],
    },
    lastName: {
      type: String,
      require: [true, 'Name must be provided'],
      trim: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
      validate(mail) {
        if (!this.validate.isEmail(mail)) {
          throw new Error({
            message: 'Invalid Email',
            statusCode: responseStatusCodes.BAD_REQUEST,
          });
        }
      },
    },
    role: {
      type: String,
      require: true,
      default: 'user',
    },
    password: {
      type: String,
      require: true,
      trim: true,
      minlength: [8, 'Password must be at least 8 characters'],
      validate: (password) => {
        if (password.toLowerCase().includes('password')) {
          throw new Error({
            message: 'The word is not allowed as password',
            statusCode: responseStatusCodes.BAD_REQUEST,
          });
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

// Login
userSchema.methods.matchPassword = async function (userPassword) {
  return await bycrypt.compare(userPassword, this.password);
};

// Register
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bycrypt.genSalt(10);
  this.password = await bycrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

module.exports = User;

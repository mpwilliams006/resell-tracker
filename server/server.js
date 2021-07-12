const mongoose = require('mongoose');
const dotenv = require('dotenv');
const validator = require('validator');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected'));

/*
const userSchema = new mongoose.Schema({
discordHandle: {
  type: String,
  required: [true, 'Please tell us your discord handle!']
},
email: {
  type: String,
  required: [true, 'Please provide your email'],
  unique: true,
  lowercase: true,
  validate: [validator.isEmail, 'Please provide a valid email']
},
items: [
  {
    userId: {
      type: String,
      // required: [true, 'Please add userId!']
    },
    item: {
      type: String
    },
    datePurchased: Date,
    dateSold: Date,
    quantity: {
      type: Number,
      // required: [true, 'Please tell us your name!']
    },
    purchasePrice: {
      type: Number,
      // required: [true, 'Please tell us your price!']
    },
    soldPrice: {
      type: Number
    },
    categories: [String]
  }
],
password: {
  type: String,
  required: [true, 'Please provide a password'],
  minlength: 8,
  select: false
},
passwordConfirm: {
  type: String,
  required: [true, 'Please confirm your password'],
  validate: {
    // This only works on CREATE and SAVE!!!
    validator: function (el) {
      return el === this.password;
    },
    message: 'Passwords are not the same!'
  }
},
passwordChangedAt: Date,
passwordResetToken: String,
passwordResetExpires: Date,
active: {
  type: Boolean,
  default: true,
  select: false
}
});

const User = mongoose.model('User', userSchema);

const testUser = new User({
discordHandle: 'Mingusitis',
email: 'm.p.williams006@gmail.com',
items: [
  {
    item: 'Phish tickets',
    quantity: 2,
    purchasePrice: 350,
    soldPrice: 700,
    categories: ['Tickets']
  }
],
password: 'test1234',
passwordConfirm: 'test1234',
active: true
});

testUser.save().then(doc => {
console.log(doc);
});
*/

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

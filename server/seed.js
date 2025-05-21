const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/billetera');

const seed = async () => {
  const user = new User({
    username: 'guada',
    password: await bcrypt.hash('guada123', 10),
  });
  await user.save();
  console.log('Usuario creado');
  process.exit();
};

seed();
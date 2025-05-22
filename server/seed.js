const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/billetera', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seed = async () => {
  const users = [
    { username: 'user1', password: await bcrypt.hash('pass123', 10) },
    { username: 'user2', password: await bcrypt.hash('pass456', 10) },
    { username: 'user3', password: await bcrypt.hash('pass789', 10) },
  ];
  await User.insertMany(users);
  console.log('Usuarios agregados a la base de datos');
  mongoose.connection.close();
};

seed().catch(err => console.error(err));
const bcrypt = require('bcryptjs');

const users = [
  {
    firstName: 'Developer',
    lastName: 'Admin',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('1256azolayu', 10),
    role: 'Admin',
  },
  {
    firstName: 'Abdulazeez',
    lastName: 'Yusuf',
    email: 'azeez@gmail.com',
    password: bcrypt.hashSync('azolayu', 10),
    role: 'Admin',
  },
  {
    firstName: 'Abdulazeez',
    lastName: 'Olaitan',
    email: 'olaitan@gmail.com',
    password: bcrypt.hashSync('azolayu', 10),
    role: 'user',
  },
  {
    firstName: 'HorlerTech',
    lastName: 'Yusuf',
    email: 'yusuf@gmail.com',
    password: bcrypt.hashSync('azolayu', 10),
    role: 'user',
  },
  {
    firstName: 'Muhammad',
    lastName: 'Buhari',
    email: 'buhari@gmail.com',
    password: bcrypt.hashSync('1256azolayu', 10),
    role: 'user',
  },
  {
    firstName: 'Bola Ahmed',
    lastName: 'Tinubu',
    email: 'tinubu@gmail.com',
    password: bcrypt.hashSync('azolayu', 10),
    role: 'user',
  },
];

module.exports = users;

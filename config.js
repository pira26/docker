'use strict';

const dotenv = require('dotenv').config();

module.exports = {
  'port': 3000 || 4000,
  'dbURL': `https://cityspot.fr/phpmyadmin`,
  'secret': `${process.env.SECRET}`
}
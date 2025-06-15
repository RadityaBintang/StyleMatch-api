const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');
require('dotenv').config(); 

const JWT_SECRET = process.env.SECRET_KEY; 


console.log('DEBUG (userController.js): JWT_SECRET loaded:', JWT_SECRET ? 'Loaded (Length: ' + JWT_SECRET.length + ')' : 'NOT LOADED or EMPTY');

const userController = {
  async login(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
      const user = await UserModel.authenticate(username, password);
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      
      console.log('DEBUG (userController.js): User authenticated:', user);

      const token = jwt.sign(
        { id: user.id, username: user.username }, 
        JWT_SECRET, 
        { expiresIn: '2h' } 
      );
      
      
      console.log('DEBUG (userController.js): Token generated for user:', user.username, 'Token starts with:', token.substring(0, 20) + '...');

      res.json({ message: 'Login successful', token });
    } catch (err) {
      console.error('ERROR (userController.js): Login error:', err);
      res.status(500).json({ message: 'Internal server error during login' });
    }
  },

  async register(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
    try {
      const exists = await UserModel.usernameExists(username);
      if (exists) {
        return res.status(409).json({ message: 'Username already taken' });
      }
      const userId = await UserModel.create(username, password);
      res.status(201).json({ message: 'User created', userId });
    } catch (err) {
      console.error('ERROR (userController.js): Register error:', err);
      res.status(500).json({ message: 'Internal server error during registration' });
    }
  },

  logout(req, res) {
    res.json({ message: 'Logged out (client-side only)' });
  }
};

module.exports = userController;

const db = require('../config/database');
const bcrypt = require('bcrypt');

const UserModel = {
  
  async authenticate(username, password) {
    try {
      const [rows] = await db.query(
        'SELECT id, username, password FROM users WHERE username = ?',
        [username]
      );

      const user = rows[0];
      if (user && await bcrypt.compare(password, user.password)) {
        return user;
      }

      return null;
    } catch (err) {
      console.error('Error during authentication:', err);
      throw err;
    }
  },

  
  async usernameExists(username) {
    try {
      const [rows] = await db.query(
        'SELECT COUNT(*) AS count FROM users WHERE username = ?',
        [username]
      );

      return rows[0].count > 0;
    } catch (err) {
      console.error('Error checking username existence:', err);
      throw err;
    }
  },

 
  
};

module.exports = UserModel;

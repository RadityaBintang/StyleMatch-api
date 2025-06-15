
const mainController = {
  index: (req, res) => {
    const username = req.user?.username || 'User'; 
    res.json({
      message: `Welcome to StyleMatch, ${username}!`,
      user: req.user,
    });
  },
};

module.exports = mainController;

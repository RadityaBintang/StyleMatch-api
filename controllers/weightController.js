const db = require('../config/database');

const saveWeight = async (req, res) => {
  const { weight, height } = req.body;

  if (!weight || !height) {
    return res.status(400).json({ success: false, message: 'Weight and height are required' });
  }

  try {
    const [rows] = await db.query(
      `SELECT o.*, 
              (SELECT AVG(rating) FROM outfit_ratings WHERE outfit_id = o.id) as avg_rating,
              (SELECT COUNT(*) FROM outfit_likes WHERE outfit_id = o.id) as likes_count
       FROM outfits o
       WHERE o.min_weight <= ? AND o.max_weight >= ?
       AND o.min_height <= ? AND o.max_height >= ?
       ORDER BY avg_rating DESC
       LIMIT 8`,
      [weight, weight, height, height]
    );

    res.json({ success: true, recommendations: rows });
  } catch (error) {
    console.error('Error fetching outfit recommendations:', error);
    res.status(500).json({ success: false, message: 'Database error occurred while fetching recommendations.' });
  }
};

module.exports = { saveWeight };

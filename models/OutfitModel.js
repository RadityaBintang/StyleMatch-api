const db = require('../config/database'); 

const OutfitModel = {
  getRecommendations: async (weight, height) => {
    const query = `
      SELECT o.*, 
             (SELECT AVG(rating) FROM outfit_ratings WHERE outfit_id = o.id) AS avg_rating,
             (SELECT COUNT(*) FROM outfit_likes WHERE outfit_id = o.id) AS likes_count
      FROM outfits o
      WHERE o.min_weight <= ? AND o.max_weight >= ?
        AND o.min_height <= ? AND o.max_height >= ?
      ORDER BY avg_rating DESC
      LIMIT 8
    `;

    const [rows] = await db.execute(query, [weight, weight, height, height]);
    return rows;
  },

  getById: async (id) => {
    const query = `
      SELECT o.*, 
             (SELECT AVG(rating) FROM outfit_ratings WHERE outfit_id = o.id) AS avg_rating,
             (SELECT COUNT(*) FROM outfit_likes WHERE outfit_id = o.id) AS likes_count
      FROM outfits o
      WHERE o.id = ?
    `;

    const [rows] = await db.execute(query, [id]);
    return rows[0] || null;
  }
};

module.exports = OutfitModel;

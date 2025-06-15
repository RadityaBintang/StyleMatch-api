const db = require('../config/database.js');

const ReviewModel = {
    async getReviewsByOutfitsId(outfits_id) {
        const [rows] = await db.query(
            'SELECT * FROM reviews WHERE outfits_id = ? ORDER BY created_at DESC',
            [outfits_id]
        );
        return rows;
    },

    async addReview(username, rating, comment, outfits_id) {
        const [result] = await db.query(
            'INSERT INTO reviews (username, rating, comment, outfits_id, created_at) VALUES (?, ?, ?, ?, NOW())',
            [username, rating, comment, outfits_id]
        );
        return result;
    }
};

module.exports = ReviewModel;

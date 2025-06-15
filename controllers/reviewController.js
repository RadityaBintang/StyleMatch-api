const db = require('../config/database.js');


exports.getReviewsByOutfitId = async (req, res) => {
    const outfitId = req.params.outfitId;

    try {
        const [reviews] = await db.query(
            'SELECT * FROM reviews WHERE outfits_id = ? ORDER BY created_at DESC',
            [outfitId]
        );
        res.json({ success: true, reviews });
    } catch (err) {
        console.error('Error fetching reviews:', err);
        res.status(500).json({ success: false, message: 'Failed to fetch reviews' });
    }
};


exports.addReview = async (req, res) => {
    const { username, rating, comment, outfits_id } = req.body;

    if (!username || !rating || !comment || !outfits_id) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    try {
        await db.query(
            'INSERT INTO reviews (username, rating, comment, outfits_id) VALUES (?, ?, ?, ?)',
            [username, rating, comment, outfits_id]
        );
        res.json({ success: true, message: 'Review added successfully' });
    } catch (err) {
        console.error('Error adding review:', err);
        res.status(500).json({ success: false, message: 'Failed to add review' });
    }
};

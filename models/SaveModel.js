const db = require('../config/database');

const getTops = async (category) => {
  const [rows] = await db.execute(
    'SELECT * FROM tops WHERE category = ?',
    [category]
  );
  return rows;
};

const getBottoms = async (category) => {
  const [rows] = await db.execute(
    'SELECT * FROM bottoms WHERE category = ?',
    [category]
  );
  return rows;
};

const getTopById = async (id) => {
  const [rows] = await db.execute(
    'SELECT * FROM tops WHERE id = ?',
    [id]
  );
  return rows[0] || null;
};

const getBottomById = async (id) => {
  const [rows] = await db.execute(
    'SELECT * FROM bottoms WHERE id = ?',
    [id]
  );
  return rows[0] || null;
};

const saveOutfit = async (name, desc, topId, bottomId) => {
  const [result] = await db.execute(
    'INSERT INTO saved_outfits (name, description, top_id, bottom_id) VALUES (?, ?, ?, ?)',
    [name, desc, topId, bottomId]
  );
  return result.affectedRows > 0;
};

const getSavedOutfits = async () => {
  const [rows] = await db.execute(`
    SELECT 
      t.id AS top_id, t.name AS top_name, t.image_url AS top_image_url, t.category AS category,
      b.id AS bottom_id, b.name AS bottom_name, b.image_url AS bottom_image_url
    FROM tops t
    JOIN bottoms b ON t.category = b.category
    LIMIT 10
  `);

  
  return rows.map(row => ({
    id: `${row.top_id}-${row.bottom_id}`, 
    name: `Outfit ${row.category}`,
    description: `Paduan ${row.top_name} dan ${row.bottom_name}`,
    top: {
      id: row.top_id,
      name: row.top_name,
      image_url: row.top_image_url
    },
    bottom: {
      id: row.bottom_id,
      name: row.bottom_name,
      image_url: row.bottom_image_url
    }
  }));
};


const deleteOutfit = async (id) => {
  const [result] = await db.execute(
    'DELETE FROM saved_outfits WHERE id = ?',
    [id]
  );
  return result.affectedRows > 0;
};

module.exports = {
  getTops,
  getBottoms,
  getTopById,
  getBottomById,
  saveOutfit,
  getSavedOutfits,
  deleteOutfit
};


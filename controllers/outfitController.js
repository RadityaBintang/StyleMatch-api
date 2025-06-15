const saveModel = require('../models/SaveModel');


exports.select = async (req, res) => {
  try {
    const tops = await saveModel.getTops('Casual');
    const bottoms = await saveModel.getBottoms('Casual');
    res.json({ tops, bottoms });
  } catch (error) {
    console.error('SELECT ERROR:', error);
    res.status(500).json({ error: 'Failed to load outfits' });
  }
};


exports.selectItem = (req, res) => {
  const { item_type, item_id } = req.body;

  if (!item_type || !item_id) {
    return res.status(400).json({ success: false, message: 'Missing parameters' });
  }

  res.json({ success: true, item_type, item_id });
};


exports.saveForm = async (req, res) => {
  const { top_id, bottom_id } = req.body;

  if (!top_id || !bottom_id) {
    return res.status(400).json({ error: 'Both items are required' });
  }

  try {
    const top = await saveModel.getTopById(top_id);
    const bottom = await saveModel.getBottomById(bottom_id);
    res.json({ selected_top: top, selected_bottom: bottom });
  } catch (err) {
    console.error('SAVE FORM ERROR:', err);
    res.status(500).json({ error: 'Failed to fetch item details' });
  }
};


exports.save = async (req, res) => {
  const { outfit_name, outfit_desc, top_id, bottom_id } = req.body;

  if (!top_id || !bottom_id) {
    return res.status(400).json({ error: 'Incomplete outfit data' });
  }

  try {
    const result = await saveModel.saveOutfit(outfit_name, outfit_desc, top_id, bottom_id);
    if (result) {
      res.status(201).json({ message: 'Outfit saved successfully' });
    } else {
      res.status(500).json({ error: 'Failed to save outfit' });
    }
  } catch (err) {
    console.error('SAVE OUTFIT ERROR:', err);
    res.status(500).json({ error: 'Internal error saving outfit' });
  }
};


exports.savedOutfits = async (req, res) => {
  try {
    const rows = await saveModel.getSavedOutfits(); 

    res.json(rows); 
  } catch (err) {
    console.error('FETCH SAVED OUTFITS ERROR:', err);
    res.status(500).json({ error: 'Failed to load saved outfits' });
  }
};


exports.deleteOutfit = async (req, res) => {
  const id = req.params.id;
  try {
    await saveModel.deleteOutfit(id);
    res.json({ success: true, message: 'Outfit deleted' });
  } catch (err) {
    console.error('DELETE OUTFIT ERROR:', err);
    res.status(500).json({ error: 'Failed to delete outfit' });
  }
};

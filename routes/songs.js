const express = require('express');
const verifyToken = require('../middleware/auth');
const Song = require('../models/Song');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving songs' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    res.json(song);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving song' });
  }
});

router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, artist, lyrics } = req.body;
    const song = new Song({
      title,
      artist,
      lyrics,
    });
    await song.save();
    res.status(201).json({ message: 'Song created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating song' });
  }
});

router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { title, artist, lyrics } = req.body;
    const song = await Song.findByIdAndUpdate(
      req.params.id,
      { title, artist, lyrics },
      { new: true }
    );
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    res.json({ message: 'Song updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating song' });
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    res.json({ message: 'Song deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting song' });
  }
});

module.exports = router;

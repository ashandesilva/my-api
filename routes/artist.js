const express = require('express');
const Artist = require('../models/Artist');

const router = express.Router();

// Get all artists
router.get('/', async (req, res) => {
  try {
    const artists = await Artist.find();
    res.json(artists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving artists' });
  }
});

// Get a single artist by ID
router.get('/:id', async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) {
      return res.status(404).json({ message: 'Artist not found' });
    }
    res.json(artist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving artist' });
  }
});

// Create a new artist
router.post('/', async (req, res) => {
  try {
    const { name, genre, bio } = req.body;
    const artist = new Artist({
      name,
      genre,
      bio
    });
    await artist.save();
    res.status(201).json({ message: 'Artist created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating artist' });
  }
});

// Update an existing artist
router.put('/:id', async (req, res) => {
  try {
    const { name, genre, bio } = req.body;
    const artist = await Artist.findByIdAndUpdate(
      req.params.id,
      { name, genre, bio },
      { new: true }
    );
    if (!artist) {
      return res.status(404).json({ message: 'Artist not found' });
    }
    res.json({ message: 'Artist updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating artist' });
  }
});

// Delete an artist
router.delete('/:id', async (req, res) => {
  try {
    const artist = await Artist.findByIdAndDelete(req.params.id);
    if (!artist) {
      return res.status(404).json({ message: 'Artist not found' });
    }
    res.json({ message: 'Artist deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting artist' });
  }
});

module.exports = router;

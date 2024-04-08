//userRoutes.js
const router = require('express').Router();
const Thought = require('../models/Thought');
const User = require('../models/User');
// GET all users
router.get('/', async (req, res) => {
  try {
    const userData = await User.find({});
    res.json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
// GET a single user by _id and populated thought and friend data
router.get('/:id', async (req, res) => {
    try {
      const userData = await User.findById(req.params.id).populate('thoughts').populate('friends');
      if (!userData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(userData);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  // POST to create a new user
  router.post('/', async (req, res) => {
    try {
      const userData = await User.create(req.body);
      res.json(userData);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  // PUT to update a user by _id
  router.put('/:id', async (req, res) => {
    try {
      const userData = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!userData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(userData);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  // DELETE to delete a user by _id
  router.delete('/:id', async (req, res) => {
    try {
      const userData = await User.findByIdAndDelete(req.params.id);
      if (!userData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json({ message: 'User deleted' });
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  // POST to add a friend
  router.post('/:id/friends/:friendId', async (req, res) => {
    try {
      const userData = await User.findByIdAndUpdate(
        req.params.id,
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      res.json(userData);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  // DELETE to remove a friend
  router.delete('/:id/friends/:friendId', async (req, res) => {
    try {
      const userData = await User.findByIdAndUpdate(
        req.params.id,
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      res.json(userData);
    } catch (err) {
      res.status(400).json(err);
    }
  });
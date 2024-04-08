//thoughtRoutes.js
const router = require('express').Router();
const Thought = require('../models/Thought');
const User = require('../models/User');


// GET all thoughts
router.get('/', async (req, res) => {
  try {
    const thoughtData = await Thought.find({});
    res.json(thoughtData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single thought by _id
router.get('/:id', async (req, res) => {
  try {
    const thoughtData = await Thought.findById(req.params.id);
    if (!thoughtData) {
      res.status(404).json({ message: 'No thought found with this id!' });
      return;
    }
    res.json(thoughtData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// POST to create a new thought (and push the created thought's _id to the associated user's thoughts array)
router.post('/', async (req, res) => {
  try {
    const thoughtData = await Thought.create(req.body);
    await User.findByIdAndUpdate(
      req.body.userId,
      { $push: { thoughts: thoughtData._id } },
      { new: true }
    );
    res.json(thoughtData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT to update a thought by _id
router.put('/:id', async (req, res) => {
  try {
    const thoughtData = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!thoughtData) {
      res.status(404).json({ message: 'No thought found with this id!' });
      return;
    }
    res.json(thoughtData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE to delete a thought by _id
router.delete('/:id', async (req, res) => {
  try {
    const thoughtData = await Thought.findByIdAndDelete(req.params.id);
    if (!thoughtData) {
      res.status(404).json({ message: 'No thought found with this id!' });
      return;
    }
    res.json({ message: 'Thought deleted' });
  } catch (err) {
    res.status(400).json(err);
  }
});

// POST to add a reaction to a thought
router.post('/:id/reactions', async (req, res) => {
  try {
    const thoughtData = await Thought.findByIdAndUpdate(
      req.params.id,
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    );
    res.json(thoughtData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE to remove a reaction from a thought
router.delete('/:id/reactions/:reactionId', async (req, res) => {
  try {
    const thoughtData = await Thought.findByIdAndUpdate(
      req.params.id,
      { $pull: { reactions: { _id: req.params.reactionId } } },
      { new: true }
    );
    res.json(thoughtData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../../controllers/thoughtController');

// /api/thoughts get all thoughts
// /api/thoughts post a new thought
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId put update a user by _id
// delete a thought by _id
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions Post and Delete
router.route('/:thoughtId/reactions').post(createReaction).delete(deleteReaction);

module.exports = router;
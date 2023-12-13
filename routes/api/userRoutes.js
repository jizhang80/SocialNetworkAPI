const router = require('express').Router();
const {
  getUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
} = require('../../controllers/userController');

// /api/users get all users
// /api/users post a new user
router.route('/').get(getUsers).post(createUser);

// /api/users put update a user by _id
// /api/users delete a user by _id
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

module.exports = router;
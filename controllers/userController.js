const { User, Thought } = require('../models');

module.exports = {
    //get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // get a single user by _id
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({_id: req.params.userId})
            if(!user){
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // create a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
          } catch (err) {
            res.status(500).json(err);
          }
    },

    // update a user
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                req.body
            );
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.status(200).json(user);
        } catch (err) {
            console.error(err)
            res.status(500).json(err);
        }
    },

    // delete a user
    // Remove a user's associated thoughts when deleted.
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });
      
            if (!user) {
              return res.status(404).json({ message: 'No user with that ID' });
            }
            
            // Bonus, Remove a user's associated thoughts when deleted.
            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: 'User and associated thoughts deleted!' })
          } catch (err) {
            res.status(500).json(err);
          }
    },

    // add a new friend
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: {friends: req.params.friendId}},
                { new: true }
            );
            if (!user) {
                return res
                  .status(404)
                  .json({ message: 'found no user with that userId' });
              }
            res.json(user)
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // delete a friend
    async deleteFriend(req,res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId }},
                { new: true }
            );
            if (!user) {
                return res
                  .status(404)
                  .json({ message: 'found no user with that userId' });
              }
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },


};
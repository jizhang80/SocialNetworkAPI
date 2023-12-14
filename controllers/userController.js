const { User } = require('../models');

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
                {_id: req.parames.userId},
                req.body
            );
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // delete a user
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });
      
            if (!user) {
              return res.status(404).json({ message: 'No user with that ID' });
            }
      
            await Application.deleteMany({ _id: { $in: user.applications } });
            res.json({ message: 'User and associated apps deleted!' })
          } catch (err) {
            res.status(500).json(err);
          }
    },

    // add a new friend
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: {friends: req.parames.friendId}},
                { new: true }
            );
            if (!user) {
                return res
                  .status(404)
                  .json({ message: 'found no user with that userId' });
              }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // delete a friend
    async deleteFriend(req,res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.parames.userId },
                { $pull: { friends: req.parames.friendId }},
                { new: true }
            );
        } catch (err) {
            res.status(500).json(err);
        }
    },


};
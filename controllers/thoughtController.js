const { Thought, User } = require('../models');

module.exports = {
    //get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //get a single thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({_id: req.params.thoughtId});
            if(!thought){
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json(thought);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    //post create a new thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: {thoughts: thought._id}},
                { new: true }
            );
            res.json({thought: thought, user: user});
          } catch (err) {
            res.status(500).json(err);
          }
    },

    //put update a thought by _id
    // do NOT allowed to update thought user info
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                req.body
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //delete a thought by _id
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            // delete in user thoughts
            const user = await User.findOneAndUpdate(
                { username: thought.username },
                { $pull: { thoughts: thought._id }},
                { new: true }
            );
            if (!thought) {
              return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json({ message: 'Thought deleted!' })
          } catch (err) {
            res.status(500).json(err);
          }
    },

    // create a reaction in a single thought by thoughtId
    async createReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: {reactions: req.body.reaction}},
                { new: true }
            );
            if (!thought) {
                return res
                  .status(404)
                  .json({ message: 'found no thought with that thoughtId' });
              }
            res.json({thought});
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // delete a reaction in a single thought by reactionId
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: req.body.reactionId }},
                { new: true }
            );
            if (!thought) {
                return res
                  .status(404)
                  .json({ message: 'found no thought with that thoughtId' });
              }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
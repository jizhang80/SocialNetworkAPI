const { Thought, Reaction } = require('../models');

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
            const thought = await Thought.findOne({_id: req.params.thoughtId})
            if(!thought){
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //post create a new thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
          } catch (err) {
            res.status(500).json(err);
          }
    },

    //put update a thought by _id
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
                { $addToSet: {reactions: req.params.reactionId}},
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

    // delete a reaction in a single thought by reactionId
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: req.params.reactionId }},
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
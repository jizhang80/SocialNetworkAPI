const {Schema, model } = require('mongoose');

const reactionSchema = new Schema (
    {
        reactionId: {type: Schema.Types.ObjectId},
        reactionBody: {
            type: String, 
            required: true, 
            maxLength: [280, `max length is 280`],
        },
        usename: {type: String, required: true},
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => date.toDateString(),
        },
    },
);

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;
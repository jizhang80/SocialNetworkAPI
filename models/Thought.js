const {Schema, model } = require('mongoose');

const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: [1,`must longer than 1`],
            maxLength: [280, `must less than 280`],
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => date.toDateString(),
        },
        username: { type: String, required: true },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount')
.get(function() {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
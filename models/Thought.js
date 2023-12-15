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
            get: (date) => {
                const dt = date.toISOString().split(/[-T .:]/);;
                return (`${dt[0]}-${dt[1]-1}-${dt[2]} ${dt[3]}:${dt[4]}`)
            },
        },
        username: { type: String, required: true },
        reactions: [{
            type: Schema.Types.ObjectId,
            ref: 'reaction'
        },],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
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
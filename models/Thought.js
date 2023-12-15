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
            get: (date) => {
                const dt = date.toISOString().split(/[-T .:]/);;
                return (`${dt[0]}-${dt[1]-1}-${dt[2]} ${dt[3]}:${dt[4]}`)
            },
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

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
        reactions: [reactionSchema],
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
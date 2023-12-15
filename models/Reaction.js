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

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;
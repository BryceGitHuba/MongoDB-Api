//Reaction.js
const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => createdAtVal.toISOString(),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    _id: false, // Prevents creation of _id for subdocument
  }
);

module.exports = reactionSchema;
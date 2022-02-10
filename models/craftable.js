/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const craftableSchema = new mongoose.Schema({
  item_id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
  profession_category: {
    type: String,
    required: true,
  },
  materials_created_from: {
    type: Object,
    required: true,
  },
});

craftableSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Craftable', craftableSchema);

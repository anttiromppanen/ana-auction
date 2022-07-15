/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const craftableSchema = new mongoose.Schema({
  _id: Number,
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
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
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Craftable', craftableSchema);

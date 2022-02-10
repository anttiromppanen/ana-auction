const craftablesRouter = require('express').Router();
const Craftable = require('../models/craftable');

craftablesRouter.get('/', async (req, res) => {
  const craftables = await Craftable.find({});
  res.json(craftables.map((craftable) => craftable.toJSON()));
});

module.exports = craftablesRouter;

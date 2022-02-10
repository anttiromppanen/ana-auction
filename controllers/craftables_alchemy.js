const craftablesRouter = require('express').Router();
const Craftable = require('../models/craftable');

craftablesRouter.get('/', async (req, res) => {
  const alchemyCraftables = await Craftable.find({ profession: 'Alchemy' });
  res.json(alchemyCraftables.map((craftable) => craftable.toJSON()));
});

craftablesRouter.get('/flask', async (req, res) => {
  const flasks = await Craftable.find({ profession: 'Alchemy', profession_category: 'Flask' });
  res.json(flasks.map((craftable) => craftable.toJSON()));
});

craftablesRouter.get('/potion', async (req, res) => {
  const potions = await Craftable.find({ profession: 'Alchemy', profession_category: 'Potion' });
  res.json(potions.map((craftable) => craftable.toJSON()));
});

craftablesRouter.get('/elixir', async (req, res) => {
  const elixirs = await Craftable.find({ profession: 'Alchemy', profession_category: 'Elixir' });
  res.json(elixirs.map((craftable) => craftable.toJSON()));
});

module.exports = craftablesRouter;

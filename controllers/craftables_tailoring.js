const craftablesTailoringRouter = require('express').Router();
const Craftable = require('../models/craftable');

craftablesTailoringRouter.get('/', async (req, res) => {
  const tailoringCraftables = await Craftable.find({ profession: 'Tailoring' });
  res.json(tailoringCraftables.map((craftable) => craftable.toJSON()));
});

craftablesTailoringRouter.get('/shadow-resist', async (req, res) => {
  const shadowResistItems = await Craftable.find({
    profession: 'Tailoring',
    profession_category: 'Shadow resist',
  });

  res.json(shadowResistItems.map((craftable) => craftable.toJSON()));
});

module.exports = craftablesTailoringRouter;

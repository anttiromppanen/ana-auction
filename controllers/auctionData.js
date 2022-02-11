const auctionDataRouter = require('express').Router();
const axios = require('axios');
const config = require('../utils/config');

auctionDataRouter.get('/', async (req, res) => {
  const auctionData = await axios({
    url: 'https://eu.api.blizzard.com/data/wow/connected-realm/4476/auctions/6?namespace=dynamic-classic-eu&locale=en_US',
    method: 'get',
    headers: {
      Authorization: `Bearer ${config.API_KEY}`,
    },
  });

  res.json(auctionData.data.auctions);
});

module.exports = auctionDataRouter;

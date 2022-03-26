const auctionDataRouter = require('express').Router();
const axios = require('axios');
const config = require('../utils/config');
const getApiKey = require('../utils/getApiKey');

auctionDataRouter.get('/', async (req, res) => {
  const key = await getApiKey(config.CLIENT_ID, config.CLIENT_SECRET);
  const auctionData = await axios({
    url: 'https://eu.api.blizzard.com/data/wow/connected-realm/4476/auctions/6?namespace=dynamic-classic-eu&locale=en_US',
    method: 'get',
    headers: {
      Authorization: `Bearer ${key.access_token}`,
    },
  });

  res.json(auctionData.data.auctions);
});

module.exports = auctionDataRouter;

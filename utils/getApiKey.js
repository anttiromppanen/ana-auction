function createAccessToken(apiKey, apiSecret, region = 'eu') {
  return new Promise((resolve, reject) => {
    let credentials = Buffer.from(`${apiKey}:${apiSecret}`);

    const requestOptions = {
      host: `${region}.battle.net`,
      path: '/oauth/token',
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials.toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    let responseData = '';

    function requestHandler(res) {
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      res.on('end', () => {
        let data = JSON.parse(responseData);
        resolve(data);
      });
    }

    let request = require('https').request(requestOptions, requestHandler);
    request.write('grant_type=client_credentials');
    request.end();

    request.on('error', (error) => {
      reject(error);
    });
  });
}

module.exports = createAccessToken;

import 'dotenv/config'

import restana from 'restana';
import fetch from 'node-fetch';
import files from 'serve-static';

const service = restana();

const env = {
    "baseUrl": process.env.BABYBUDDY_BASE_URL,
    "token": process.env.BABYBUDDY_TOKEN
};

async function getWeight(req, res) {
    const weightUrl = `${env.baseUrl}/api/weight/`;
    console.log('Getting weight', weightUrl);
    const weightRes = await fetch(weightUrl, {
        mode: 'no-cors',
        credentials: 'include',
        headers: {
            Authorization: `Token ${env.token}`
        }
    });
    const weights = await weightRes.json();
    res.send(weights);
}


service.get('/api/weights', getWeight);

const serve = files('./public', {
    lastModified: false,
    setHeaders: (res, path) => {
      res.setHeader('cache-control', 'public, no-cache, max-age=604800')
    }
  });

  service.use(serve);

service.start(3000);
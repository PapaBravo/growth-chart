import restana from 'restana';
import fetch from 'node-fetch';
import files from 'serve-static';
import path from 'path';



const service = restana();

const env = {
    "baseUrl": "https://boeck.berlin",
    "token": "super-secret"
};

async function getWeight(req, res) {
    const weightRes = await fetch(`${env.baseUrl}/api/weight/`, {
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

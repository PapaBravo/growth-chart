import 'dotenv/config'

import restana from 'restana';
import fetch from 'node-fetch';
import files from 'serve-static';
import { DateTime } from "luxon";

import {getPercentiles} from './percentiles.js'

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
    res.send(weights.results);
}

async function getPercentilesController(req, res) {
    try {
        console.log(req.query)
        const dateOfBirth = DateTime.fromISO(req.query.dateOfBirth);
        const lastMeasurement = DateTime.fromISO(req.query.lastMeasurement);
        const percentiles = await getPercentiles(dateOfBirth, lastMeasurement);
        res.send(percentiles);
    } catch (err) {
        console.error(err);
        res.send(err.message || 'Unknown error', 500);
    }
    
}


service.get('/api/weights', getWeight);
service.get('/api/percentiles', getPercentilesController);

const serve = files('./public', {
    lastModified: false,
    setHeaders: (res, path) => {
      res.setHeader('cache-control', 'public, no-cache, max-age=604800')
    }
  });

  service.use(serve);

service.start(3000);
import { parse } from 'csv-parse';
import fs from 'node:fs/promises';

async function getPercentileFile() {
    const csv = await fs.readFile('./data/wfa-boys-percentiles-expanded-tables.csv', "utf8");

    return new Promise((resolve, reject) => {
        parse(csv, {columns: true, cast: true}, (err, records) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(records);
            }
        })
    })
}

/**
 * 
 * @param {luxon.DateTime} dateOfBirth 
 * @param {luxon.DateTime} lastMeasurement 
 * @returns 
 */
async function getPercentiles(dateOfBirth, lastMeasurement) {
    let percentiles = await getPercentileFile();
    percentiles.forEach(p => p.date = dateOfBirth.plus({days: p.Age}));
    percentiles = percentiles.filter(p => p.date <= lastMeasurement);

    console.log(percentiles.length, percentiles[100]);

    return percentiles;
}

export { getPercentiles };
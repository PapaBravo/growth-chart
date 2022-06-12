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

const PERCENTILE_NAMES = ['P01', 'P1', 'P3', 'P5', 'P10', 'P15', 'P25', 'P50', 'P75', 'P85', 'P90', 'P95', 'P97', 'P99', 'P999'];

/**
 * 
 * @param {luxon.DateTime} dateOfBirth 
 * @param {luxon.DateTime} lastMeasurement 
 * @returns 
 */
async function getPercentiles(dateOfBirth, lastMeasurement) {
    let percentiles = await getPercentileFile();
    percentiles.forEach(p => {
        p.date = dateOfBirth.plus({days: p.Age});
        PERCENTILE_NAMES.forEach(pn => p[pn] *= 1000 );
    });
    percentiles = percentiles.filter(p => p.date <= lastMeasurement);

    console.log(percentiles.length, percentiles[100]);

    return percentiles;
}

export { getPercentiles };
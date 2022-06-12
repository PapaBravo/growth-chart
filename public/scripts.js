async function getWeight() {
    const res = await fetch(`./api/weights/`);
    const weights = await res.json();
    return weights;
}

/**
 * 
 * @param {String} dateOfBirth 
 * @param {String} lastMeasurement 
 * @returns 
 */
async function getPercentiles(dateOfBirth, lastMeasurement) {
  const res = await fetch(`./api/percentiles?dateOfBirth=${dateOfBirth}&lastMeasurement=${lastMeasurement}`);
  const percentiles = await res.json();
  return percentiles;
}

function renderWeight(weights, percentiles) {
      const data = {
        datasets: [{
          label: 'Weight',
          data: weights.reverse().map(w => ({x: w.date, y: w.weight}) ),
        }]
      };

      const PERCENTILE_NAMES = [
        // 'P01',
        // 'P1',
        'P3',
        // 'P5',
        'P10',
        // 'P15',
        // 'P25',
        'P50',
        // 'P75',
        // 'P85',
        'P90',
        // 'P95',
        'P97',
        // 'P99',
        // 'P999',
      ];

      PERCENTILE_NAMES.forEach(p => {
        data.datasets.push({
          label: p,
          data: percentiles.map(perc => ({x: perc.date, y: perc[p]}))
        });
      })

    
      const config = {
        type: 'line',
        data: data,
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'month'
                    }
                }
            }
        }
      };

      const myChart = new Chart(
        document.getElementById('weightChart'),
        config
      );
}

async function main() {
    const dateOfBirth = "2022-02-19";
    const weights = await getWeight();
    const percentiles = await getPercentiles(dateOfBirth, weights[0].date)
    console.log(weights, percentiles);
    renderWeight(weights, percentiles);
}

main();

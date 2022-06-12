async function getWeight() {
    const res = await fetch(`./api/weights/`);
    const weights = await res.json();
    return weights;
}

async function getPercentiles(dateOfBirth, lastMeasurement) {
  const res = await fetch(`./api/percentiles?dateOfBirth=2022-02-19&lastMeasurement=2022-06-01`);
}

function renderWeight(weights) {
      const data = {
        datasets: [{
          label: 'Weight',
          data: weights.reverse().map(w => ({x: w.date, y: w.weight}) ),
        }]
      };
    
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
    const percentiles = await getPercentiles(dateOfBirth, weights[0].weight)
    console.log(weights);
    renderWeight(weights);
}

main();

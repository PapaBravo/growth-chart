async function getWeight() {
    const res = await fetch(`./api/weights/`);
    const weights = await res.json();
    return weights;
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
    const weights = await getWeight();
    console.log(weights);
    renderWeight(weights);
}

main();

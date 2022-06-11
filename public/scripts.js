let env;

// async function getEnv() {
//     const res = await fetch('./env.json');
//     const env = await res.json();
//     return env;
// }

async function getWeight() {
    const res = await fetch(`./api/weights/`, {
    });
    const weights = await res.json();
    return weights;
}

async function main() {
    const weights = await getWeight();
    console.log(weights);
}

main();

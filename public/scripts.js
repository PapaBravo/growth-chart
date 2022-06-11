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

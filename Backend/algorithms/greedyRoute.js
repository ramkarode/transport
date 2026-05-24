const network = require("../data/networkData");

const greedyRoute = (
  source,
  destination,
) => {

  source =
    source.charAt(0).toUpperCase() +
    source.slice(1).toLowerCase();

  destination =
    destination.charAt(0).toUpperCase() +
    destination.slice(1).toLowerCase();

  let current = source;

  let route = [];

  let totalTime = 0;

  let totalCost = 0;

  const visited = new Set();

  while (current !== destination) {

    visited.add(current);

    const connections = network[current];

    if (!connections) {
      break;
    }

    let bestOption = null;

    /**
     * First Priority:
     * Direct Destination
     */

    for (const option of connections) {

      if (
        option.destination === destination
      ) {

        bestOption = option;

        break;
      }
    }

    /**
     * Otherwise Choose Fastest
     */

    if (!bestOption) {

      for (const option of connections) {

        if (
          visited.has(option.destination)
        ) {
          continue;
        }

        if (
          !bestOption ||
          option.time < bestOption.time
        ) {
          bestOption = option;
        }
      }
    }

    if (!bestOption) {
      break;
    }

    route.push({
      from: current,
      to: bestOption.destination,
      mode: bestOption.mode,
      time: bestOption.time,
      cost: bestOption.cost,
    });

    totalTime += bestOption.time;

    totalCost += bestOption.cost;

    current = bestOption.destination;
  }

  return {
    source,
    destination,
    route,
    totalTime,
    totalCost,
  };
};

module.exports = greedyRoute;
const greedyRoute = require("../algorithms/greedyRoute");

exports.optimizeRoute = async (req, res) => {
  try {

    /**
     * Extract & Normalize Input
     */
    const source = req.body.source
      ?.trim();

    const destination = req.body.destination
      ?.trim();

    /**
     * Validation
     */
    if (!source || !destination) {
      return res.status(400).json({
        success: false,
        message:
          "Source and destination are required",
      });
    }

    /**
     * Run Greedy Algorithm
     */
    const optimizedRoute = greedyRoute(
      source,
      destination,
    );

    /**
     * Route Validation
     */
    if (
      !optimizedRoute.route.length
    ) {
      return res.status(404).json({
        success: false,
        message:
          "No route found between selected locations",
      });
    }

    res.status(200).json({
      success: true,
      optimizedRoute,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
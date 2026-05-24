const network = {
  Indore: [
    {
      destination: "Bhopal",
      mode: "Rail",
      time: 4,
      cost: 500,
    },
    {
      destination: "Mumbai",
      mode: "Air",
      time: 2,
      cost: 2000,
    },
  ],

  Bhopal: [
    {
      destination: "Delhi",
      mode: "Air",
      time: 3,
      cost: 2500,
    },
    {
      destination: "Nagpur",
      mode: "Road",
      time: 6,
      cost: 700,
    },
  ],

  Mumbai: [
    {
      destination: "Delhi",
      mode: "Air",
      time: 2,
      cost: 3000,
    },
  ],

  Delhi: [
    {
      destination: "Noida",
      mode: "Road",
      time: 1,
      cost: 200,
    },
  ],
};

module.exports = network;
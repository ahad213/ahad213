const nodeGeoCoder = require("node-geocoder");

const options = {
  provider: process.env.GEOCODE_PROVIDER,
  httpAdapter: "https",
  apiKey: process.env.GEOCODE_API_KEY,
  formatter: null,
};

const geocoder = nodeGeoCoder(options);

module.exports = geocoder;

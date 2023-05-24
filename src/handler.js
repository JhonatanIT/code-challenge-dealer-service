'use strict';

const headers = {
  "content-type": "application/json",
};

module.exports.getDealers = async (event) => {
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(
      {
        message: 'Go Serverless getDealers!'
      }
    ),
  };
};

module.exports.getVehiclesByBac = async (event) => {

  const { bac } = event.pathParameters

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(
      {
        message: 'Go Serverless getVehiclesByBac! ' + bac 
      }
    ),
  };
};

'use strict';

const fetch = require('node-fetch');
const yup = require('yup')

//Retry pattern config
const RETRY_ATTEMPTS = 5;

//Validation Dealer API
const schemaDealer = yup.object().shape({
  bac: yup.string().required(),
  name: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  country: yup.string().required(),
  brand: yup.string().required()
});

//Validation Vehicles API
const schemaVehicles = yup.object().shape({
  bac: yup.string().required(),
  vin: yup.string().required(),
  ctpStatus: yup.string().required(),
  onstarStatus: yup.string().required(),
  createdAt: yup.date().required(),
  color: yup.string().required(),
  stockNumber: yup.string().required(),
  year: yup.number().required()
});

const headers = {
  "content-type": "application/json",
};

const DEALERS_URI = 'https://bb61co4l22.execute-api.us-west-2.amazonaws.com/development/dealers';
const VEHICLES_URI = 'https://bb61co4l22.execute-api.us-west-2.amazonaws.com/development/vehicles/';

module.exports.getDealers = async (event) => {

  let currentTry = 0;

  //Retry pattern
  while (true) {
    try {

      const response = await fetch(DEALERS_URI);
      const data = await response.json();

      if (data.length) {
        for (const element of data) {
          await schemaDealer.validate(element, { abortEarly: false })
        }
      } else {
        await schemaDealer.validate(data, { abortEarly: false })
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(data)
      };

    } catch (e) {

      currentTry++;
      console.log(`Failed attempt ${currentTry} (Error: ${e})`);

      if (currentTry >= RETRY_ATTEMPTS) {
        console.log('Retry maximum reached');
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify(e),
        };
      }
    }
  }
};

module.exports.getVehiclesByBac = async (event) => {

  const { bac } = event.pathParameters;

  let currentTry = 0;
  let dataDTO = [];

  //Retry pattern
  while (true) {
    try {

      const response = await fetch(VEHICLES_URI + bac);
      const data = await response.json();

      if (data.length) {
        for (const element of data) {
          await schemaVehicles.validate(element, { abortEarly: false })

          dataDTO.push({
            "bac": element.bac,
            "vin": element.vin,
            "ctpStatus": element.ctpStatus,
            "onstarStatus": element.onstarStatus,
            "createdAt": new Date(element.createdAt).toLocaleDateString(),
            "color": element.color,
            "stockNumber": element.stockNumber,
            "year": element.year
          })
        }
      } else {
        await schemaVehicles.validate(data, { abortEarly: false })
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(dataDTO)
      };

    } catch (e) {

      currentTry++;
      console.log(`Failed attempt ${currentTry} (Error: ${e})`);

      if (currentTry >= RETRY_ATTEMPTS) {
        console.log('Retry maximum reached');
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify(e),
        };
      }
    }
  }
};

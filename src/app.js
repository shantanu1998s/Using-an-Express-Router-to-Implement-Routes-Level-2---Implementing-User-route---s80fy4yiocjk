//Aim:Write a code to Update a product using Patch Request and  to delete a product using DELETE request

const fs = require('fs');
const express = require('express');
const { object } = require('joi');
const app = express();
const router = new express.Router();
const bodyParser = require('body-parser');

//middleware
router.use(express.json());
router.use(bodyParser.json());

const product = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/product.json`)
);

// Defining The Router
// Handling PATCH request
router.patch('/api/v1/product/:id', (req, res) => {
  try {
    //Write your code here
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Product Updation Failed',
      status: 'Error',
    });
  }
});

//Deleting Product
router.delete('/api/v1/product/:id', (req, res) => {
  try {
    //Write your code here
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Product Deletion Failed',
      status: 'Error',
    });
  }
});

//Registering our Router
app.use(router);

module.exports = app;

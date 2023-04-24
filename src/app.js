const fs = require("fs");
const express = require("express");
const { object } = require("joi");
const app = express();
const router = new express.Router();
const bodyParser = require("body-parser");

//middleware
router.use(express.json());
router.use(bodyParser.json());

let product = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/product.json`)
);

// Defining The Router
// Handling PATCH request
router.patch("/api/v1/product/:id", (req, res) => {
  try {
    //Write your code here
    const id = +req.params.id;
    const findIndex = product.findIndex((el) => el.id === id);
    if (findIndex === -1) {
      return res.status(404).json({
        message: "Product Not Found",
        status: "Error",
      });
    }
    const updateProduct = { ...product[findIndex], ...req.body };
    product[findIndex] = updateProduct;
    const filteredData = product.map((el) => {
      return { id: el.id, title: el.title, price: el.price };
    });
    // console.log(filteredData);
    fs.writeFile(
      `${__dirname}/../dev-data/product.json`,
      JSON.stringify(product),
      (err) => {
        if (err) throw err;
        console.log("Successfully updated");
      }
    );
    res.status(201).json({
      message: "success",

      data: {
        product: filteredData,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Product Updation Failed",
      status: "Error",
    });
  }
});

//Deleting Product
router.delete("/api/v1/product/:id", (req, res) => {
  try {
    const id = +req.params.id;
    const findIndex = product.findIndex((el) => el.id === id);
    if (findIndex === -1) {
      res.status(404).json({
        message: "Product Not Found",
        status: "Error",
      });
    }
    product = product.filter((el) => el.id !== id);
    fs.writeFile(
      `${__dirname}/../dev-data/product.json`,
      JSON.stringify(product),
      (err) => {
        if (err) throw err;
        console.log("Successfully deleted");
      }
    );
    res.status(201).json({
      status: "success",

      data: {
        product,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Product Deletion Failed",
      status: "Error",
    });
  }
});

//Registering our Router
app.use(router);

module.exports = app;

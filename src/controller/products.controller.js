const { client } = require("../modals");

const addProduct = async (req, res) => {
    const { name, price} = req.body;
    console.log("body", req.body);
    try {
      const response = await client.query(
        `INSERT INTO products(name, price) VALUES ( '${name}', '${price}') RETURNING id`
      );
      console.log("res", response.rows);
      res.send(req.body);
    } catch (err) {
      console.log(err);
      res.send(err);
    } finally {
      client.end;
    }
  };
const getProducts = async (req, res) => {
    try {
      const response = await client.query(
        `SELECT * FROM products`
      );
      console.log("res in getProducts", response.rows);
      res.send(response.rows);
    } catch (err) {
      console.log(err);
      res.send(err);
    } finally {
      client.end;
    }
  };

  module.exports = { addProduct, getProducts };
const { Product } = require('../models');

exports.createProduct = async (req, res) => {
  try {
    const { title, description, inventoryCount } = req.body;
    await Product.create({ title, description, inventoryCount });
    res.status(201).send("Product created");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, inventoryCount } = req.body;
    await Product.update({ title, description, inventoryCount }, { where: { id } });
    res.status(200).send("Product updated");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.destroy({ where: { id } });
    res.status(200).send("Product deleted");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

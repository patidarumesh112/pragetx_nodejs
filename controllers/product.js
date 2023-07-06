const Product = require('../models/product.js');
const { Op } = require('sequelize');

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;

    const product = new Product({ name, description, price, quantity });
    await product.save();

    res.status(201).json({ message: 'Product created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateProduct = async (req, res) => {
    try {
      const { name, description, price, quantity } = req.body;
      const product = await Product.findByPk(req.params.id);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      product.name = name;
      product.description = description;
      product.price = price;
      product.quantity = quantity;
  
      await product.save();
  
      res.status(200).json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update product' });
    }
  };
  

  exports.deleteProduct = async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findByPk(productId);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      await product.destroy();
  
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  exports.getAllProducts = async (req, res) => {
    try {
      const { search, page, limit, sort } = req.query;
      const queryOptions = {};
  
      // Search by name or description
      if (search) {
        queryOptions.where = {
          [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
            { description: { [Op.like]: `%${search}%` } },
          ],
        };
      }
  
      // Pagination
      const currentPage = parseInt(page) || 1;
      const itemsPerPage = parseInt(limit) || 10;
      const offset = (currentPage - 1) * itemsPerPage;
      queryOptions.limit = itemsPerPage;
      queryOptions.offset = offset;
  
      // Sorting
      if (sort) {
        const [sortBy, sortOrder] = sort.split(':');
        queryOptions.order = [[sortBy, sortOrder]];
      }
  
      const products = await Product.findAll(queryOptions);
  
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
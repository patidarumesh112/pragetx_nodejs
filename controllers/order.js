const Order = require('../models/order.js');
const Product = require('../models/product.js');

exports.createOrder = async (req, res) => {
    try {
        const { products, customerInfo } = req.body;

        // Check if products are provided
        if (!products || products.length === 0) {
            return res.status(400).json({ message: 'No products provided' });
        }

        const productIds = products.map((product) => product.productId);
        const foundProducts = await Product.findAll({
            where: {
                id: productIds
            }
        });

        const insufficientProducts = products.filter((product) => {
            const foundProduct = foundProducts.find((foundProduct) => foundProduct.id.toString() === product.productId);

            if (!foundProduct || foundProduct.quantity < product.quantity) {
                return true;
            }

            return false;
        });

        if (insufficientProducts.length > 0) {
            return res.status(400).json({ message: 'Insufficient quantity for some products', insufficientProducts });
        }
        // Deduct ordered quantity from available quantity of each product
        for (const product of products) {
            const foundProduct = foundProducts.find((foundProduct) => foundProduct.id.toString() === product.productId);
            foundProduct.quantity -= product.quantity;
            await foundProduct.save();
        }

        // Create the order
        const order = new Order({ products, customerInfo });

        // Calculate the total price based on the products
        const totalPrice = products.reduce((total, product) => {
            const foundProduct = foundProducts.find((foundProduct) => foundProduct.id.toString() === product.productId);

            if (foundProduct) {
                return total + foundProduct.price * product.quantity;
            } else {
                return total; // Skip products that are not found in the database
            }
        }, 0);

        // Set the total price and customer ID on the order instance
        order.total = totalPrice;
        order.customerId = req.userId; // Assuming you have the user ID available in req.user.userId
        await order.save();

        res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.getOrderById = async (req, res) => {
  try {
    // const orderId = req.params.id;
    const userId = req.userId; // Assuming you have the user ID available in req.user.userId

    
    const order = await Order.findAll({
        where: {
          customerId: userId,
        },
      });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }


    // Return the order to the authorized user
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


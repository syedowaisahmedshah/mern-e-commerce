const Product = require('../../models/product');
const products = require('./products');

const seedProducts = async (db) => {
    await Product.deleteMany();
    await Product.insertMany(products);

    console.log('Products seeding completed');
};

module.exports = seedProducts;
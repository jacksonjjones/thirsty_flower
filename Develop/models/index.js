// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id'
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  as: 'tags', // Renaming the association to avoid conflicts
  foreignKey: 'product_id', // Specify the foreign key for Product
  otherKey: 'tag_id' // Specify the foreign key for Tag
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  as: 'products', // Renaming the association to avoid conflicts
  foreignKey: 'tag_id', // Specify the foreign key for Tag
  otherKey: 'product_id' // Specify the foreign key for Product
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};


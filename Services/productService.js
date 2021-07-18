const Service = require('../Models/service');

const { convertObj } = require('../Utils');

class ProductService extends Service {
  constructor() {
    super();
  }

  async CreateProduct(product) {
    try {
      const { title, price, description, imageURL } = product;

      const newProduct = await this.pool.query(
        `INSERT INTO products (title, price, description, image_url)
				VALUES($1,$2,$3,$4)
				ON CONFLICT DO NOTHING RETURNING *`,
        [title, price, description, imageURL]
      );
      if (newProduct) {
        console.log(`services/ProductService/CreateProduct: Insert new product successfully! title: ${title}, price: ${price}, description: ${description},
        imageURL: ${imageURL}`);
      }
      return true;
    } catch (error) {
      console.log(
        `services/ProductService/CreateProduct: failed! cannot insert new product!`,
        error.message
      );
      return false;
    }
  }

  async GetAllProducts() {
    try {
      let products;
      const res = await this.pool.query('SELECT * FROM products');
      if (res.rows) {
        products = res.rows.map(convertObj);

        console.info(`services/productService.js GetAllProducts successfully!`);
        return products;
      }
      return false;
    } catch (error) {
      console.info(
        `services/productService.js GetAllProducts failed! ${error.message}`
      );
      return false;
    }
  }

  async UpdateProductById(query, values) {
    try {
      let product;
      const res = await this.pool.query(query, values);
      if (res.rows && res.rows.length) {
        product = convertObj(res.rows[0]);
        console.info(
          `services/productService.js UpdateProductById successfully! with productId: ${product.id}`
        );
        return product;
      }
      return false;
    } catch (error) {
      console.info(
        `services/productService.js UpdateProductById failed! ${error.message}`
      );
      return false;
    }
  }

  async deleteProduct(productId) {
    try {
      const deleted = await this.pool.query(
        `DELETE FROM products WHERE id=$1 RETURNING *`,
        [productId]
      );
      if (!deleted.rowCount) {
        throw new Error('Product not exist');
      }
      console.info('services/productService.js deleteProduct successfully!');
      return true;
    } catch (err) {
      return false;
    }
  }
}

module.exports = ProductService;

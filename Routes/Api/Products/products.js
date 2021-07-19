require('dotenv').config();

const Controller = require('../../../Models/controller');
const ProductService = require('../../../Services/productService');

const { convertToUnderscore, createUpdateQuery } = require('../../../Utils');

class Products extends Controller {
  constructor() {
    super();
    this.productRouter = this.getRouter();
    this.productService = new ProductService();
    this.setRoutes();
  }

  async createProduct(req, res) {
    try {
      const { title, price, description, imageURL } = req.body;
      const product = {
        title,
        price,
        description,
        imageURL,
      };
      const isCreated = await this.productService.CreateProduct(product);
      if (isCreated) {
        console.log('Api/Product/products.js createProduct success!');
        res.status(200).json(isCreated);
      }
    } catch (err) {
      console.log('Api/Product/products.js createProduct failed!');
      res.status(400).json({ code: err.code, message: err.message });
    }
  }

  async getAllProducts(req, res) {
    try {
      const returningProducts = await this.productService.GetAllProducts();
      if (!returningProducts) {
        console.error(`Api/Product/products.js getAllProducts failed!`);
        res.setHeader('Access-Control-Allow-Origin', '*').status(404).json({
          message: `getAllProducts failed!`,
        });
      } else {
        res
          .status(200)
          .setHeader('Access-Control-Allow-Origin', '*')
          .json(returningProducts);
      }
    } catch (error) {
      console.error(
        `Api/Product/products.js getAllProducts: failed!: ${error.message}`
      );
      res
        .status(400)
        .setHeader('Access-Control-Allow-Origin', '*')
        .json({ code: error.code, message: error.message });
    }
  }

  async updateProduct(req, res) {
    try {
      const { id } = req.body;
      const updatesObj = convertToUnderscore(req.body);
      const cols = Object.keys(updatesObj);
      const values = Object.values(updatesObj);
      const query = createUpdateQuery('products', cols, id, 'id');
      const product = await this.productService.UpdateProductById(
        query,
        values
      );
      if (!product) {
        res
          .status(404)
          .send(`Cannot update product: product's id: ${productId}`);
      } else {
        res.status(200).json(product);
      }
    } catch (error) {
      console.error(
        `Routes/Api/Products/products.js updateProduct failed: ${error.message}`
      );
      res.status(400).json({ code: error.code, message: error.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const isProductDeleted = await this.productService.deleteProduct(id);
      if (!isProductDeleted) {
        console.error(
          `Routes/Api/Products/products.js deleteProduct, productId: ${id}`
        );
        res.status(404).json({
          message: `product productId: ${id}`,
        });
      } else {
        res.status(200).send({ message: `Product deleted successfully !` });
      }
    } catch (error) {
      console.error(
        `Routes/Api/Products/products.js deleteProduct failed: ${error.message}`
      );
      res.status(400).json({ code: error.code, message: error.message });
    }
  }
  async getTopFiveSells(req, res) {
    try {
      const returningProducts = await this.productService.GetTopFiveSells();
      if (!returningProducts) {
        console.error(`Api/Product/products.js getToFiveSells failed!`);
        res.setHeader('Access-Control-Allow-Origin', '*').status(404).json({
          message: `getToFiveSells failed!`,
        });
      } else {
        res
          .status(200)
          .setHeader('Access-Control-Allow-Origin', '*')
          .json(returningProducts);
      }
    } catch (error) {
      console.error(
        `Api/Product/products.js getToFiveSells: failed!: ${error.message}`
      );
      res
        .status(400)
        .setHeader('Access-Control-Allow-Origin', '*')
        .json({ code: error.code, message: error.message });
    }
  }
  async getTopFiveUniqueSells(req, res) {
    try {
      const returningProducts =
        await this.productService.GetTopFiveUniqueSells();
      if (!returningProducts) {
        console.error(`Api/Product/products.js getTopFiveUniqueSells failed!`);
        res.setHeader('Access-Control-Allow-Origin', '*').status(404).json({
          message: `getTopFiveUniqueSells failed!`,
        });
      } else {
        res
          .status(200)
          .setHeader('Access-Control-Allow-Origin', '*')
          .json(returningProducts);
      }
    } catch (error) {
      console.error(
        `Api/Product/products.js getTopFiveUniqueSells: failed!: ${error.message}`
      );
      res
        .status(400)
        .setHeader('Access-Control-Allow-Origin', '*')
        .json({ code: error.code, message: error.message });
    }
  }

  setRoutes() {
    try {
      this.productRouter.post('/create', this.createProduct.bind(this));

      this.productRouter.get('/get-all', this.getAllProducts.bind(this));
      this.productRouter.get(
        '/get-top-five-sells',
        this.getTopFiveSells.bind(this)
      );
      this.productRouter.get(
        '/get-top-five-unique-sells',
        this.getTopFiveUniqueSells.bind(this)
      );

      this.productRouter.patch('/update', this.updateProduct.bind(this));

      this.productRouter.delete('/delete/:id', this.deleteProduct.bind(this));
    } catch (error) {
      console.log('Error', error.message);
    }
  }

  getRouterInstance() {
    return this.productRouter;
  }
}

const productController = new Products();
const productRoutes = productController.getRouterInstance();

module.exports = productRoutes;

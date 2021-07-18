var cors = require('cors');

// const Header = require('./Header/header');

const Database = require('./DB');

const PORT = 5001;

class Server {
  constructor(express) {
    this.express = express;
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
    // this.app.use(Header);
    this.app.use(cors({ origin: 'http://localhost:3000/admin' }));

    var allowCrossDomain = function (req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
      next();
    };
    this.app.use(allowCrossDomain);

    // this.app.use(function (req, res, next) {
    //   // Website you wish to allow to connect
    //   res.setHeader(
    //     'Access-Control-Allow-Origin',
    //     'http://localhost:3000/admin'
    //   );

    //   // Request methods you wish to allow
    //   res.setHeader(
    //     'Access-Control-Allow-Methods',
    //     'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    //   );

    //   // Request headers you wish to allow
    //   res.setHeader(
    //     'Access-Control-Allow-Headers',
    //     'X-Requested-With,content-type'
    //   );

    //   // Set to true if you need the website to include cookies in the requests sent
    //   // to the API (e.g. in case you use sessions)
    //   res.setHeader('Access-Control-Allow-Credentials', true);

    //   // Pass to next layer of middleware
    //   next();
    // });
  }

  initDB() {
    const database = new Database();
    database.connect();
  }

  initRouter() {
    const Router = require('./Routes/routes');
    const router = new Router().getRoutes();
    this.app.use('/api', router);
  }

  run() {
    const port = process.env.PORT || 5001;
    this.initDB();
    this.initRouter();
    this.app.listen(port, () => console.log('Server up on port:', PORT));
  }
}

module.exports = Server;

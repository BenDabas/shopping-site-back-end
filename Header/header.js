// const Header = (req, res, next) => {
//   const allowedOrigins = [
//     'http://localhost:5000/*/*',
//     'http://localhost:8888/*/*',

//     'http://localhost:5001/*/*',
//     'http://localhost:5000/api/products/get-all',
//     'http://localhost:5001/api/products/get-all',
//     'http://localhost:5000//api//products//get-all',
//     'http://localhost:5001//api//products//get-all',

//     'http://localhost:3000/admin',
//     'http://localhost:3000//admin',
//     // 'http://localhost:3000/users/create',
//     // 'http://localhost:3001/users/create',
//     // 'http://localhost:3000//users//create',
//     // 'http://localhost:3001//users//create',
//     // 'http://localhost:3000//users//create',
//     // 'http://localhost:3001//users//create'
//   ];
//   const origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//     res.setHeader('Access-Control-Allow-Origin', origin);
//   }
//   // Website you wish to allow to connect
//   // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
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
// };

// module.exports = Header;

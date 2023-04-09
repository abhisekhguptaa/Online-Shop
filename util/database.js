// const Sequelize = require("sequelize");

// const sequelize = new Sequelize("node-complete", "root", "1234567890", {
//   dialect: "mysql",
//   host: "localhost",
// });

// /*const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "node-complete",
//   password: "1234567890",
// });*/

// //module.exports = pool.promise();
// module.exports = sequelize;

const { MongoClient, ServerApiVersion } = require("mongodb");
// const { log } = require("console");
const uri =
  "mongodb+srv://Abhisekh:fzFptUcrpH6oWMaB@first.cjwqqgj.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

let _db;

const mongoConnect = (callback) => {
  client
    .connect()
    .then((client) => {
      console.log("Connected");
      _db = client.db();
      callback();
      
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb=()=>{
  if(_db){
    return _db;
  }
  throw 'No database found';
};

//module.exports = mongoConnect;
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://Abhisekh:<password>@first.cjwqqgj.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

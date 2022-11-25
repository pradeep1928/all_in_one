const MongoClient = require("mongodb").MongoClient;

const connect_mongoDB = async () => {
  let mongodb_uri = "mongodb://127.0.0.1/";
  let db = null;
  try {
    db = await MongoClient.connect(mongodb_uri);
    console.log("mongodb connected successfully");
  } catch (error) {
    console.log("error in mongo connection.", error);
  }
  return db;
};



module.exports = {
    connect_mongoDB
}
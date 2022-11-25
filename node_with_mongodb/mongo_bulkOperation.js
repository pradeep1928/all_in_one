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

const bulk_operation = async () => {
  const connDbInstance = await connect_mongoDB();
  try {
    let database = connDbInstance.db("movie_flix");
    let collection = database.collection("theaters");
    const bulkOp = await collection.bulkWrite([
      {
        insertOne: {
          document: {
            location: {
              address: {
                street1: "5 Main St.",
                city: "new yang",
                state: "AK",
                zipcode: "44432",
              },
            },
          },
        },
      },
      {
        insertOne: {
          document: {
            location: {
              address: {
                street1: "75 tenn Plaza",
                city: "New York",
                state: "NY",
                zipcode: "10001",
              },
            },
          },
        },
      },
      {
        updateMany: {
          filter: { "location.address.city": "new gini" },
          update: { $set: { is_in_ohio: true } },
          upsert: true,
        },
      },
      {
        deleteOne: { filter: { "location.address.zipcode": "44011" } },
      },
    ]);

    console.log("final result: ", bulkOp);
  } catch (error) {
    console.log("error in dbInstance or bulk operation", error);
  } finally {
    await connDbInstance.close();
  }
};

bulk_operation();

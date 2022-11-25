const { connect_mongoDB } = require("./mongo_connection");

const bulk_operation = async () => {
  const connDbInstance = await connect_mongoDB();
  try {
    let database = connDbInstance.db("bulkOp_db");
    let collection = database.collection("bulkOp_coll_1");
    const bulkOp = await collection.bulkWrite([
      {
        insertOne: {
          document: {
            name: "rahul chaudhary",
            role: "python",
            salary: 40000,
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
            name: "gopal kumar",
            role: "nodejs",
            salary: 45000,
            location: {
              address: {
                street1: "5 Main St.",
                city: "new jersy",
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
            name: "gautam",
            role: "Angular",
            salary: 55000,
            location: {
              address: {
                street1: "ln3 road",
                city: "new jersy",
                state: "4k",
                zipcode: "45432",
              },
            },
          },
        },
      },
      {
        insertOne: {
          document: {
            name: "amit yadav",
            role: "Angular",
            salary: 50000,
            location: {
              address: {
                street1: "ln7 road",
                city: "Washington",
                state: "1k",
                zipcode: "44633",
              },
            },
          },
        },
      },
      {
        insertOne: {
          document: {
            name: "ashish chaube",
            role: "nodejs",
            salary: 30000,
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
        insertOne: {
          document: {
            name: "durgesh mishra",
            role: "python",
            salary: 50000,
            location: {
              address: {
                street1: "75 tenn Plaza",
                city: "california",
                state: "NY",
                zipcode: "10001",
              },
            },
          },
        },
      },

      {
        updateMany: {
          filter: { "location.address.city": "new jersy" },
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

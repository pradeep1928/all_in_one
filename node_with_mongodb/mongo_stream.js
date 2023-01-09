const { connect_mongoDB } = require("./mongo_connection");


const streamWithMongodb = async () => {
    let connDbInstance = await connect_mongoDB();

    try {
        let database = connDbInstance.db("pradeep_testDB");
        let collection = database.collection("testCol");

        let pipeline = [
            {
              $match: {"fullDocument.salary": { $gte: 60000 } }
            } ];

         let changeStream = collection.watch({fullDocument: "updateLookup"});
         changeStream.on('change', (doc) => {
            //  console.log("updated salary document: ", doc.fullDocument.salary);
             console.log("updated document: ", doc);

         })
    } catch (error) {
        console.log("error in steamWithMongodb function: ", error);
    }
}


streamWithMongodb()
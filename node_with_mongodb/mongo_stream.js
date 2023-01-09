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

         let changeStream = database.watch({fullDocument: "updateLookup"});
         changeStream.on('change', (doc) => {
            //  console.log("updated salary document: ", doc.fullDocument.salary);
            let salary = doc.fullDocument.salary;
            let name = doc.fullDocument.name
            if (name == 'pradeep' && salary >= 80000) {
                console.log("good salary:", salary);
            }
            //  console.log("updated document: ", doc);

         })
    } catch (error) {
        console.log("error in steamWithMongodb function: ", error);
    }
}


streamWithMongodb()
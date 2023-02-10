const { connect_mongoDB } = require("./mongo_connection");

let databases = {
    vivasmpp_20220912: "vivasmpp_20220912",
    pradeep_testDB : "pradeep_testDB"
}

let collections = {
    short_messages: "short_messages",
    testCol: "testCol"
}


const streamWithMongodb = async () => {
    let connDbInstance = await connect_mongoDB();

    try {
        let database = connDbInstance.db(databases.pradeep_testDB);
        let collection = database.collection(collections.testCol);

        let pipeline = [
            {
              $match: {"fullDocument.salary": { $gte: 60000 } }
            } ];

         let changeStream = database.watch({fullDocument: "updateLookup"});
         changeStream.on('change', (doc) => {
            //  console.log("updated salary document: ", doc.fullDocument.salary);
            let salary = doc.fullDocument.salary;
            let name = doc.fullDocument.name
            let message_length = doc.fullDocument.message_length
            if (message_length > 20) {
                // console.log("handsome salary:", doc);
                console.log('message length is greater than 20 for this doc: ',doc );
            }
            //  console.log("updated document: ", doc);

         })
    } catch (error) {
        console.log("error in steamWithMongodb function: ", error);
    }
}


streamWithMongodb()
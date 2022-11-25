const { connect_mongoDB } = require("./mongo_connection");


const aggregate_Op = async () => {
    const connDbInstance = await connect_mongoDB();
    try {
        let database = connDbInstance.db("bulkOp_db");
        let collection = database.collection("bulkOp_coll_1");

        const pipeline = [
            // { $match: { "salary": 50000 } },
            // { $unwind: "$location" },
            { $group: { _id: "$role", count: { $sum: 1 } } },
            // { $project: { _id: 0, role: 1, name: 1, salary: 1, "location": 1}}
        ]
        
        const aggrResult = await collection.aggregate(pipeline).toArray() ;
        console.log("aggrResult------ ", aggrResult)
    } catch (error) {
        console.log("error in dbInstance or bulk operation", error);
    } finally {
        await connDbInstance.close();
    }
}

aggregate_Op();
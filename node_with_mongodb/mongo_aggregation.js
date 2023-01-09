const { connect_mongoDB } = require("./mongo_connection");


const aggregate_Op = async () => {
    let connDbInstance = await connect_mongoDB();
    try {
        let database = connDbInstance.db("bulkOp_db");
        let collection = database.collection("bulkOp_coll_1");

        const pipeline = [
            { $match: { $expr: { $gte : [ "salary", 30000 ]} }},
            { "$unwind": "$location" },
            { $group: { _id: {"role": "$role", "name": "$name" }, count: { $sum: 1 } }},
            // { $project: { _id: 0, name: "$name", language: "$_id", count: "$count", salary: "$salary"}},
            // { $sort: { _id: 1 } }
        ]

        const aggrResult = await collection.aggregate(pipeline).toArray();
        console.log("aggrResult------ ", aggrResult)
    } catch (error) {
        console.log("error in connDbInstance or bulk operation", error);
    } finally {
        await connDbInstance.close();
    }
}

aggregate_Op();
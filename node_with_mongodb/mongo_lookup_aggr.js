const { connect_mongoDB } = require("./mongo_connection");

const lookUp_Op = async () => {
    const connDbInstance = await connect_mongoDB();
    try {
        let database = connDbInstance.db("bulkOp_db");
        let collection = database.collection("lookUpCol_1");

        const lookupPipeline = [
            { $lookup: { from: "lookUpCol_2", localField: "playername", foreignField: "playername", as: "barcaInWorldXI" } }, { $match: { "barcaInWorldXI": { $ne: [] } } }, { $unwind: "$barcaInWorldXI" }, { $project: { _id: 0, playername: 1, country: 1, club: "$barcaInWorldXI.club" } }, { $replaceRoot: { newRoot: "$$ROOT" } }
        ]

        const lookupResult = await collection.aggregate(lookupPipeline).toArray();
        console.log("lookup result is: ", lookupResult)

    } catch (error) {
        console.log("error in connDbInstance or lookup operation", error)
    } finally {
        await connDbInstance.close()
    }
}

lookUp_Op()
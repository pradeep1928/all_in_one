const { connect_mongoDB } = require("./mongo_connection");

const insertIntoDb = async (data) => {
    const connDbInstance = await connect_mongoDB();
    try {
        const dbCol = connDbInstance.db('bulkOp_db').collection('lookUpCol_2');
        let resutl = await dbCol.insertMany(data)
        console.log("mongo insert result: ", resutl)
    
    } catch (error) {
        console.log("error in connection or inserting query", error);
    } finally {
        await connDbInstance.close()
    }
}

let dumpdata = [
    { "playername" : "Leonel Messi", "club" : "Barcelona", "country" : "Argentina" },
    { "playername" : "Cristiano Ronaldo", "club" : "Juventis", "country" : "Portugal" },
    { "playername" : "Robert Lewandowski", "club" : "Beyern Munich", "country" : "Poland" },
    { "playername" : "Sergio Busquets", "club" : "Barcelona", "country" : "Spain" },
    { "playername" : "Frenkie De Jong", "club" : "Barcelona", "country" : "Netherlands" },
    { "playername" : "Kevin De Bruyne", "club" : "Manchester City", "country" : "Belgium" },
    { "playername" : "Sergio Ramos", "club" : "Real Madrid", "country" : "Spain" },
    { "playername" : "Virgil van Dijk", "club" : "Liverpool", "country" : "Netherlands" },
    { "playername" : "Marcelo", "club" : "Real Madrid", "country" : "Brazil" },
    { "playername" : "Trent Alexander-Arnold", "club" : "Liverpool", "country" : "England" },
    { "playername" : "Marc-Andre ter Stegen", "club" : "Barcelona", "country" : "Germany" },
]


insertIntoDb(dumpdata)


const express = require('express');
const moment = require('moment')
const rateLimit = require('express-rate-limit')

const app = express();
app.use(express.json())
const port = 3002;

const apiLimiter = rateLimit({
	windowMs: 1000, // 100 miliseconds
	limit: 1, // Limit each IP to 1 requests per `window` (here, per 15 minutes)
	standardHeaders: 'draft-7', // Set `RateLimit` and `RateLimit-Policy` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	// store: ... , // Use an external store for more precise rate limiting
})


const { connect_mongoDB } = require("./mongo_connection");

let connDbInstance;

const client = async () => {
    connDbInstance = await connect_mongoDB();
}

client()

const concurrent_insert = async (req, res) => {
    if (connDbInstance) {
        let session;
        session = connDbInstance.startSession();
        try {
            
            session.startTransaction();
            const dbCol = connDbInstance.db('pradeep_testDB').collection('credit_insert');

            // let body = req.body;
            // let type = body.type;
            // let credit = body.credit
            let arr = ['credit', 'debit'];
            let type = arr[Math.floor(Math.random() * arr.length)];
            let credit = 200;

            const getQuery = { "_id": -1 };
            const getResult = await dbCol.find({}, { session }).sort(getQuery).limit(1).toArray();

            if (getResult.length > 0) {
                let new_net_bal;
                if (type && type == 'credit') {
                    new_net_bal = parseInt(getResult[0].net_bal) + parseInt(credit);
                } else {
                    new_net_bal = parseInt(getResult[0].net_bal) - parseInt(credit);
                }

                let insertObj = {
                    "user_id": getResult[0].user_id,
                    "system_id": getResult[0].system_id,
                    "credits_assigned": credit,
                    "added_datetime": moment().format("YYYY-MM-DD HH:mm:ss"),
                    "description": 'testing purpose',
                    "transaction_type": type,
                    "user_type": getResult[0].user_type,
                    "net_bal": new_net_bal
                };
                
                console.log("🚀 ~ file: mongo_session.js:46 ~ constconcurrent_insert= ~ insertObj:", insertObj)
                let insertResult = await dbCol.insertOne(insertObj, { session });
                console.log("🚀 ~ file: mongo_session.js:47 ~ constconcurrent_insert= ~ insertResult:", insertResult)
                await session.commitTransaction();
                res.status(200).json(type == "credit" ? `Amount credited ${credit}` : `Amount debited ${credit}`);
            } else {
                res.status(404).json('No user found');
            }
        } catch (error) {
            console.error('Error:', error);
            if (session && session.transaction.state !== 'TRANSACTION_COMMITTED') {
                await session.abortTransaction();
            }
            res.status(500).json('An error occurred');
        } finally {
            if (session) {
                await session.endSession();
            }
        }

    } else {
        console.log("No Connection with mongodb")
    }
};

app.use('/api/', apiLimiter);
app.get('/api/credit', concurrent_insert)


app.listen(port, () => {
    console.log(`server started at port ${port}`)
})



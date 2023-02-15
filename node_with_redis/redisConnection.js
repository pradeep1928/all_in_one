
const { createClient } = require('redis');
const client = createClient();


const redisOP = async (key, value) => {
    await client.connect();
    console.log("connected"
    )
    await client.set(key, value);
    const val = await client.get(key);
    let objval = JSON.parse(val)
    console.log("get val", objval)

    await client.hSet('frameworks_hash', {'javascript':'ReactJS', 'css':'TailwindCSS', 'node':'Express', 'AI':'Python'});
    let hvalall = await client.hGetAll('frameworks_hash');
    let hval = await client.hGet('frameworks_hash', 'node');

    console.log("hval get all", hvalall)
    console.log("hval get all", hval)
    await client.disconnect();
}

let obj =  [{'name':'pradeep', 'role':'wevdev', 'city':'mumbai'}, {'name':'rahul', 'role':'python', 'city':'mumbai'}]
let str = JSON.stringify(obj)
console.log('str----', str);

redisOP('name', str)
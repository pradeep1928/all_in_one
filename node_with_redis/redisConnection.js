
const { createClient } = require('redis');
const client = createClient();


(async (key, value) => {
    await client.connect();
    console.log("connected"
    )
    await client.set(key, value);
    const val = await client.get(key);
    console.log("get val", val)

    await client.hSet('frameworks_hash', {'javascript':'ReactJS', 'css':'TailwindCSS', 'node':'Express'});
    let hval = await client.hGetAll('frameworks_hash');
    console.log("hval get all", hval)
    await client.disconnect();
})('name', 'pradeep')
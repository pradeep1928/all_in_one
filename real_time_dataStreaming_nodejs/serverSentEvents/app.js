const express = require('express');
const cors = require('cors')
const app = express();
const port = 3001;
app.use(cors())

app.use(express.json())
// app.use('/', express.static('public'));

let data = 'real-time data update 1';
let number = 1;

app.get("/serverSentEvents", (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    })

    let interval = setInterval(() => {
        data = 'real-time data update ' + number;
        console.log('sent: ', data);
        res.write("data: " + data + "\n\n")
        number++
    }, 1000);
    
    //close
    res.on('close', () => {
        clearInterval(interval);
        res.end()
    })
})


app.listen(port, () => {
    console.log(`server is listening at port ${port}`);
})
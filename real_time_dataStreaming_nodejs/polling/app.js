const express = require('express');
const cors = require('cors')
const app = express();
const port = 3000;
app.use(cors())

app.use(express.json())
// app.use('/', express.static('public'));

let data = 'real-time data update 1';
let number = 1;

app.get("/", (req, res) => {
    res.send({"update": data})
})

let interval = setInterval(() => {
    data = 'real-time data update ' + number;
    console.log('sent: ', data);
    number++
}, 1000);


app.listen(port, () => {
    console.log(`server is listening at port ${port}`);
})
const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function (err0, connection) {
    if (err0) {
        throw err0;
    }
    connection.createChannel(function (err1, channel) {
        if (err1) {
            throw err1
        }
        let queue = 'q_name';
        let msg = 'hello world';

        channel.assertQueue(queue, {
            durable: false
        });

        channel.sendToQueue(queue, Buffer.from(msg));
        console.log('[x] sent %s', msg)
    });
    setTimeout(function () {
        connection.close();
        process.exit(0)
    }, 500);
})
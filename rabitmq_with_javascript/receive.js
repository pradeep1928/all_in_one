const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function (err0, connection) {
    if (err0) {
        throw err0
    }
    connection.createChannel(function (err1, channel) {
        if (err1) {
            throw err1
        }

        let queue = 'q_name'
        channel.assertQueue(queue, {
            durable: false
        });
        console.log("[*] waiting for messages in %s. To exit press CTRL+C", queue);
        channel.consume(queue, function (msg) {
            console.log('[x] Received %s', msg.content.toString());
        }, {
            noAck: true
        })
    })
})
const amqp = require('amqplib/callback_api');


amqp.connect('amqp://localhost', function (err0, connection) {
    if (err0) {
        throw err0
    }
    connection.createChannel(function (err1, channel) {
        if (err1) {
            throw err1
        }

        let exchange = 'logs';

        channel.assertExchange(exchange, 'fanout', {
            durable: false
        });

        channel.assertQueue('', {
            exclusive: true
        }, function (err2, q) {
            if (err2) {
                throw err2
            }
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
            channel.bindQueue(q.queue, exchange, '')
            channel.consume(q.queue, function (msg) {
                if (msg.content) {
                    console.log(" [x] %s", msg.content.toString());
                }
            }, {
                noAck: true
            })
        })
    })
})
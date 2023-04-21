const amqp = require('amqplib/callback_api');



amqp.connect('amqp://localhost', function (err0, connection) {
    if (err0) {
        throw err0
    }

    connection.createChannel(function (err1, channel) {
        if (err1) {
            throw err1
        }

        let queue = 'task_queue';
        channel.assertQueue(queue, {
            durable: true
        });
        channel.prefetch(1);
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function (msg) {
            let sec = msg.content.toString().split('.').length - 1;
            console.log(" [x] Received %s", msg.content.toString());

            setTimeout(() => {
                console.log(" [x] Done");
                channel.ack(msg);
            }, sec * 1000);
        }, {
            noAck: false
        })
    })
})
const amqp = require('amqplib/callback_api');



/* This code is connecting to a local RabbitMQ server using the AMQP protocol. It creates a channel and
asserts a durable queue named "task_queue". It sets a prefetch value of 1, meaning that the server
will only send one message to the worker at a time. It then starts consuming messages from the queue
using the `channel.consume()` method. When a message is received, it logs the message content and
sets a timeout based on the number of dots in the message content. After the timeout, it logs that
the message is done and acknowledges the message using `channel.ack()`. The `noAck` option is set to
false, meaning that the worker must acknowledge the message after it has been processed. */
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
const amqp = require('amqplib/callback_api');



/* This code is establishing a connection to a local RabbitMQ server using the `amqp` library in
Node.js. It then creates a channel and asserts a durable queue named `task_queue`. It sends a
message to the queue with the content of `process.argv.slice(2).join(' ') || 'hello world'` and sets
the message to be persistent. Finally, it logs a message to the console indicating that the message
was sent, waits for 500 milliseconds, and then closes the connection and exits the process. */
amqp.connect('amqp://localhost', function (err0, connection) {
    if (err0) {
        throw err0
    }

    connection.createChannel(function (err1, channel) {
        if (err1) {
            throw err1
        }

        let queue = 'task_queue';
        let msg = process.argv.slice(2).join(' ') || 'hello world';

        channel.assertQueue(queue, {
            durable: true
        })

        channel.sendToQueue(queue, Buffer.from(msg), {
            persistent: true
        });
        console.log('[x] sent "%s"', msg);
    });
    setTimeout(function () {
        connection.close();
        process.exit(0)
    }, 500);
})
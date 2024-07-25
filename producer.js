const amqp = require("amqplib");
const exchangeName = "HeaderMessage";
const [logTypes , message] = process.argv.slice(2);


async function sendData() {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    await channel.assertExchange(exchangeName , "headers");
    channel.publish(exchangeName , logTypes , Buffer.from(message));
    setTimeout(() => {
        connection.close();
        process.exit(0);
    })
}

sendData();
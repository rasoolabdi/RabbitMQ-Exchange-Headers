const amqp = require("amqplib");
const exchangeName = "HeaderMessage";

async function sendData() {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    await channel.assertExchange(exchangeName , "headers");
    channel.publish(exchangeName , "" ,Buffer.from(message) , {headers: {
        author: "rasoolabdi",
        runtime: "nodejs",
        price: 1200,
        comments: []
    }});
    setTimeout(() => {
        connection.close();
        process.exit(0);
    })
}

sendData();             
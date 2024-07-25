const amqp = require("amqplib");
const exchangeName = "headersMessage";

async function reciveData() {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    await channel.assertExchange(exchangeName , "headers");
    const assertQueue = await channel.assertQueue("" , {exclusive: true});
    channel.bindQueue(assertQueue.queue , exchangeName , "" , {author: "rasoolabdi" ,runtime: "nodejs" , "x-match" : "any"}); //any == or  , all == and
    channel.consume(assertQueue.queue , (msg) => {
        console.log(msg.content.toString());
        console.log(msg.properties.headers);
    })
}

reciveData();
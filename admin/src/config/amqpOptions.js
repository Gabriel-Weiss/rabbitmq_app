const amqp = require("amqplib/callback_api");

const connectAndSend = (queue, msg) => {
  amqp.connect("amqp://localhost", (error0, connection) => {
    if (error0) throw error0;

    connection.createChannel(function (error1, channel) {
      if (error1) throw error1;

      channel.assertQueue(queue, { durable: false });

      channel.sendToQueue(queue, msg);
      console.log(" [x] Sent msg");
    });
  });
};

module.exports = connectAndSend;

const amqp = require("amqplib/callback_api");
const {
  createProduct,
  deleteProduct,
} = require("../repositories/productMainRepo");

const connectAndConsume = (queue) => {
  amqp.connect("amqp://localhost", (error0, connection) => {
    if (error0) throw error0;

    connection.createChannel(function (error1, channel) {
      if (error1) throw error1;

      channel.assertQueue(queue, { durable: false });

      channel.consume(
        queue,
        async (msg) => {
          if (queue === "product_created") {
            const eventProd = JSON.parse(msg.content.toString());
            const productMain = {
              name: eventProd.name,
              price: parseInt(eventProd.price),
              description: eventProd.description,
              adminId: eventProd._id,
            };
            console.log(" [x] Received msg");
            await createProduct(productMain);
          } else if (queue === "product_removed") {
            const eventProd = JSON.parse(msg.content.toString());
            console.log(" [x] Received msg", eventProd);
            await deleteProduct(eventProd);
          }
        },
        { noAck: true }
      );
    });
  });
};

module.exports = connectAndConsume;

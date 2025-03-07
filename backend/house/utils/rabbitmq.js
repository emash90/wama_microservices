const amqp = require('amqplib');

let connection, channel;

const connectRabbitMQ = async () => {
  try {
    connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
    channel = await connection.createChannel();
    console.log("connection", process.env.RABBITMQ_URL)
    console.log('RabbitMQ connected!!');
  } catch (error) {
    console.error('RabbitMQ connection error:', error);
  }
};

const getChannel = () => channel;

module.exports = { connectRabbitMQ, getChannel };

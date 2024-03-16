import { bean, config} from "../core.decorator";
import { connect } from "amqplib";
let rabbitConnection = null;

class RabbitMQ{


  @bean
  getRabbitMq(): RabbitMQ {
    if(!config("rabbitmq")){
      return null;
    }
    return new RabbitMQ();
  }

  async publish(exchange, routingKey, message) {
    const channel = await getChannel();
    await channel.checkExchange(exchange);
    channel.publish(exchange, routingKey, Buffer.from(message));
    await channel.close();
  }
}

async function getChannel() {
  if(rabbitConnection == null) {
    rabbitConnection = await connect(config("rabbitmq"));
    process.once("SIGINT", async () => {
      await rabbitConnection.close();
    });
  }
  return await rabbitConnection.createChannel();
}

function rabbitListener(queue) {
  return (target, propertyKey) => {
    (async function () {
      const channel = await getChannel();
      await channel.checkQueue(queue);
      await channel.consume(queue, target[propertyKey], {noAck:true});
    }());
  }
}

export {RabbitMQ, rabbitListener}
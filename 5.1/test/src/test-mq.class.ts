import { component, getMapping, autoware, log, RabbitMQ, rabbitListener } from "../../";

import { connect } from "amqplib";


@component
export default class TestMq {

    @autoware
    rabbitMq: RabbitMQ;

    @getMapping("/mq/send")
    async send(req, res) {
        await this.rabbitMq.publish("myexchanges", "", "Hello World By RabbitMQ Class");
        res.end("ok");
    }

    @rabbitListener("myqueues")
    async listen(message) {
        log("Received By Decorator ", message.content.toString());
    }

    @getMapping("/mq/sendByExchange")
    async sendMq2() {
        const exchange = 'myexchanges';
        const text = "hello world, by exchange";
        // 开启RabbitMQ连接
        const connection = await connect('amqp://localhost');
        // 创建通道
        const channel = await connection.createChannel();
        // 检查交换机是否存在
        await channel.checkExchange(exchange);
        // 发送消息到交换机
        channel.publish(exchange, '', Buffer.from(text));
        console.log(" [x] Publish by exchange '%s'", text);
        // 关闭通道
        await channel.close();
        return "sent by exchange";
    }

    @getMapping("/mq/sendByQueue")
    async sendMq() {
        const queue = 'myqueues';
        const text = "hello world, by queue";
        // 开启RabbitMQ连接
        const connection = await connect({
            protocol: 'amqp',
            hostname: 'localhost',
            port: 5672,
            username: 'guest',
            password: 'guest'
        });
        // 创建通道
        const channel = await connection.createChannel();
        // 检查队列是否存在
        await channel.checkQueue(queue);
        // 发送消息到队列
        channel.sendToQueue(queue, Buffer.from(text));
        console.log(" [x] Sent by queue '%s'", text);
        // 关闭通道
        await channel.close();
        return "sent by queue";
    }

    @getMapping("/mq/listen")
    async testMq() {
        // 开启RabbitMQ连接
        const connection = await connect('amqp://localhost');
        // 创建通道
        const channel = await connection.createChannel();
        const queue = 'myqueues';
        const queue2 = 'myqueues2';
        // 检查队列queue是否存在
        await channel.checkQueue(queue);
        // 检查队列queue2是否存在，如不存在则创建队列
        await channel.assertQueue(queue2);
        // 监听队列queue，收到消息则调用回调函数打印输出
        await channel.consume(queue, (message) => {
            console.log(" [x] Received '%s'", message.content.toString());
        }, { noAck: true });
        // 监听队列queue2，收到消息则调用回调函数打印输出
        await channel.consume(queue2, (message) => {
            console.log(" [x] Received queue2 '%s'", message.content.toString());
        }, { noAck: true });
        return "ok";
    }
}
export default {
    rabbitMq: {
        url: 'amqp://admin:password@rabbitmq:5672/',
        queues: {
            authQueue: "auth_queue",
            userQueue: 'user_queue',
            cartQueue: 'cart_queue',
            productQueue: 'product_queue',
            orderQueue: 'order_queue',
        }
    }
}

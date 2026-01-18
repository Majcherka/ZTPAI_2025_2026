import aio_pika
import json

RABBITMQ_URL = "amqp://user:password@localhost:5672/"

async def send_message_to_queue(message_data: dict):
    connection = await aio_pika.connect_robust(RABBITMQ_URL)
    
    async with connection:
        channel = await connection.channel()
        
        queue = await channel.declare_queue("email_queue", durable=True)
        
        message_body = json.dumps(message_data).encode()
        
        await channel.default_exchange.publish(
            aio_pika.Message(body=message_body),
            routing_key=queue.name,
        )
        print(f" [x] Wyslano do kolejki: {message_data}")
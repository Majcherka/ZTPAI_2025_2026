import os
from dotenv import load_dotenv
import aio_pika
import json

load_dotenv()

RABBIT_USER = os.getenv("RABBITMQ_USER", "guest")
RABBIT_PASSWORD = os.getenv("RABBITMQ_PASSWORD", "guest")
RABBIT_HOST = os.getenv("RABBITMQ_HOST", "localhost")
RABBIT_PORT = os.getenv("RABBITMQ_PORT", "5672")

RABBITMQ_URL = f"amqp://{RABBIT_USER}:{RABBIT_PASSWORD}@{RABBIT_HOST}:{RABBIT_PORT}/"

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
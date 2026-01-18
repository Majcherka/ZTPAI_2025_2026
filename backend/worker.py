import asyncio
import aio_pika
import json

RABBITMQ_URL = "amqp://user:password@localhost:5672/"

async def main():
    connection = await aio_pika.connect_robust(RABBITMQ_URL)
    async with connection:
        channel = await connection.channel()
        queue = await channel.declare_queue("email_queue", durable=True)

        print(" [*] Czekam na wiadomosci. Nacisnij CTRL+C aby wyjsc")

        async with queue.iterator() as queue_iter:
            async for message in queue_iter:
                async with message.process():
                    data = json.loads(message.body.decode())
                    print(f" [!!!] Otrzymano zadanie: Wyslac email do {data['user_email']}")
                    print(f"       Temat: Nowe ogloszenie '{data['listing_title']}' zostało dodane.")

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("Worker zatrzymany")
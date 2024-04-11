import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv'
import { json, urlencoded } from 'express';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: [
  //       `amqp://${process.env.RABBIT_USERNAME}:${process.env.RABBIT_PASSWORD}@${process.env.RABBIT_HOST}:${process.env.RABBIT_PORT}`,
  //     ],
  //     queue: process.env.RABBIT_QUEUE_1,
  //     queueOptions: {
  //       durable: true,
  //     },
  //     noAck: true,
  //     prefetchCount: 1,
  //     isGlobalPrefetchCount: true,
  //   },
  // });

  app.use(json({ limit: '300mb' }));
  app.use(urlencoded({ limit: '300mb', extended: true }));
  app.startAllMicroservices();

  await app.listen(Number(process.env.PORT));
}
bootstrap();

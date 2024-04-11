import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy, RmqContext, RmqRecordBuilder } from '@nestjs/microservices';
import { Context } from 'vm';

@Injectable()
export class AppService {
  private logger = new Logger(AppService.name)
  constructor(    @Inject('purchase') private clientPurchase: ClientProxy,) {}

  async publishToPurchase(payload: any) {
    try {
      this.clientPurchase.send('purchase', payload).toPromise()
      this.logger.log("Publish to Q")
    } catch (err) {
      this.logger.error(err)
    }
  }
}

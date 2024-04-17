import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy, RmqContext, RmqRecordBuilder } from '@nestjs/microservices';
import { Context } from 'vm';

@Injectable()
export class AppService {
  private logger = new Logger(AppService.name)
  constructor(@Inject('createwams') private clientPurchase: ClientProxy) { }

  async publishToQueue(type: string, payload: any) {
    try {
      this.clientPurchase.send(type, payload).toPromise()
      this.logger.log("Publish to Q")
    } catch (err) {
      this.logger.error(err)
    }
  }
}

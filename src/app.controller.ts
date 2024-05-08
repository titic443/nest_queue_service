import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }


  @Post('odoo/createwams')
  createWams(@Body() body: any) {
    this.appService.publishToQueue('purchase', body)
  }

  @Post('odoo/createwamsaccount')
  createWamsEx(@Body() body: any) {
    this.appService.publishToQueue('expense', body)
  }

}

import { Controller, Render, Get, Response } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  @Render('index.hbs')
  async index(@Response() res) {
    console.log(res.locals);
    return res;
  }
}

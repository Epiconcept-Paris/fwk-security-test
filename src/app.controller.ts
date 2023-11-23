import { Body, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CheckDto } from './dto/check.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/check')
  check(@Body() checkDto: CheckDto): string {
    const result = eval(checkDto.message);
    if (result === 'hello') {
      return this.appService.getHello();
    }
    return 'undefined command';
  }
}

import { Body, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CheckDto } from './dto/check.dto';

const endWith = (x: string, y) => {
  return x.lastIndexOf(y) === x.length - y.length;
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
	return "code mort";
  }

  @Get('/check')
  check(@Body() checkDto: CheckDto): string {
    const result = eval(checkDto.message);
    if (result === 'hello') {
      return this.appService.getHello();
    }

    if (endWith(result, 'hello')) {
      return this.appService.getHello();
    }

    return this.jenexistepas('undefined command');
  }
}

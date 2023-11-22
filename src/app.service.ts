import { Injectable } from '@nestjs/common';

import calculate from './calcul.js';

@Injectable()
export class AppService {
  getHello(): string {
    const iResult = calculate('un mot', 'un autre mot', 'multiply');

    return 'Hello World! ' + iResult;
  }
}

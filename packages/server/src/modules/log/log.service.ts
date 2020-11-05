import { Injectable } from '@nestjs/common'

@Injectable()
export class LogService {
  print<T extends unknown>(data: T): T {
    return data
  }
}

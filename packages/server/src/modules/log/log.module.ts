import { Module } from '@nestjs/common'

import { SocketModule } from '../socket/socket.module'
import { LogController } from './log.controller'
import { LogService } from './log.service'

@Module({
  imports: [SocketModule],
  controllers: [LogController],
  providers: [LogService],
  exports: [LogService],
})
export class LogModule {}

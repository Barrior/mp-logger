import { Body, Controller, Post } from '@nestjs/common'

import { SocketGateway } from '../socket/socket.gateway'
import { EmitLogsDto } from './dto/log.dto'

@Controller('cgi/logs')
export class LogController {
  constructor(private readonly socketGateway: SocketGateway) {}

  @Post()
  emitLogs(@Body() body: EmitLogsDto): void {
    this.socketGateway.emit(body.d)
  }
}

import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server } from 'socket.io'

import { EmitLogsDto } from '../log/dto/log.dto'

@WebSocketGateway()
export class SocketGateway {
  @WebSocketServer()
  server!: Server

  emit(logs: EmitLogsDto['d']): void {
    this.server.emit('message', logs)
  }
}

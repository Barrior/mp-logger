import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { resolve } from 'path'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { LogModule } from './log/log.module'
import { SocketModule } from './socket/socket.module'

@Module({
  imports: [
    LogModule,
    SocketModule,
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, '../../public'),
      exclude: ['/api*', '/cgi*'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

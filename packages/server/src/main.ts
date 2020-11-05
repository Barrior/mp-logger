import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'

import config from './config'
import logger from './lib/logger'
import { AppModule } from './modules/app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.disable('x-powered-by')

  // Parameters checking of input and output
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: config.isProd,
    })
  )

  await app.listen(config.port)

  const origin = `http://localhost:${config.port}`

  logger.info(`
  -------------------------------------------------
    Application is running
    url: ${origin}
    demoUrl: ${origin + config.demoPath}
    NODE_ENV: ${process.env.NODE_ENV}
    Node Version: ${process.version}
  -------------------------------------------------
  `)
}

bootstrap()

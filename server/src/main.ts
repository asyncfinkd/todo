import { NestFactory } from '@nestjs/core'
import { AppModule } from 'src/app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as express from 'express'
import * as helmet from 'helmet'
import * as compression from 'compression'
import { createGlobalPrefix } from 'lib/createGlobalPrefix'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  })

  createGlobalPrefix(app, '/api')
  await app.listen(3000)
}

bootstrap()

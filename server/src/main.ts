import { NestFactory } from '@nestjs/core'
import { AppModule } from 'src/app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as helmet from 'helmet'
import * as compression from 'compression'
import { createGlobalPrefix } from 'lib/createGlobalPrefix'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  ValidationPipe,
} from '@nestjs/common'

interface Error {
  error: string
  message: string
}

export class ValidationException extends BadRequestException {
  constructor(public validationErrors: Error[]) {
    super()
  }
}

@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost): any {
    const context = host.switchToHttp()
    const response = context.getResponse()
    console.log(exception.validationErrors.map((err) => err.message))
    return response.status(400).json({
      statusCode: 400,
      validationErrors: exception.validationErrors.map((err) => {
        return { error: err.error, message: err.message.split('-')[0] }
      }),
    })
  }
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  })

  app.use(compression())
  app.use(helmet())

  createGlobalPrefix(app, '/api')

  const config = new DocumentBuilder()
    .setTitle('Smart Pharm Server Example')
    .setDescription('Documentation for Developers')
    .setVersion('1.0')
    .addBearerAuth(
      {
        description: 'api by bearer validator',
        name: 'Authorization',
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'Header',
      },
      'access-token',
    )
    .setBasePath('api')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/swagger', app, document)

  app.useGlobalFilters(new ValidationFilter())
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      disableErrorMessages:
        process.env.NODE_ENV === 'production' ? true : false,
    }),
  )

  await app.listen(process.env.PORT, () => {
    console.log(`server is listening ${process.env.PORT} port`)
  })
}

bootstrap()

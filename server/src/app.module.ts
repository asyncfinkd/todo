import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module'
import { RegisterModule } from './modules/register/register.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    AuthModule,
    RegisterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

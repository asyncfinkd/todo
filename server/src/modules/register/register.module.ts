import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { useMongooseConnect } from 'lib/use-mongoose'
import { User, UserSchema } from 'src/auth/model/auth.model'
import { RegisterController } from './controller/register.controller'
import { RegisterService } from './service/register.service'

@Module({
  imports: [
    useMongooseConnect(UserSchema, User),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '12h' },
      }),
    }),
  ],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}

import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { useMongooseConnect } from 'lib/use-mongoose'
import { User, UserSchema } from 'src/auth/model/auth.model'
import { AuthController } from './controller/auth.controller'
import { AuthService } from './service/auth.service'
import { JwtStrategy } from './strategy/jwt.strategy'

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
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}

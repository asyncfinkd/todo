import { Module } from '@nestjs/common'
import { useMongooseConnect } from 'lib/use-mongoose'
import { User, UserSchema } from 'src/auth/model/auth.model'
import { TodoController } from './controller/todo.controller'
import { TodoService } from './service/todo.service'

@Module({
  imports: [useMongooseConnect(UserSchema, User)],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}

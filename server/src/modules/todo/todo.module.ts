import { Module } from '@nestjs/common'
import { useMongooseConnect } from 'lib/use-mongoose'
import { User, UserSchema } from 'src/auth/model/auth.model'
import { TodoController } from './controller/todo.controller'
import { Todo, TodoSchema } from './model/todo.model'
import { TodoService } from './service/todo.service'

/**
 * Module
 */
@Module({
  imports: [
    useMongooseConnect(UserSchema, User),
    useMongooseConnect(TodoSchema, Todo),
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}

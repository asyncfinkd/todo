import { Controller, Get, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { TodoService } from '../service/todo.service'

@Controller()
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @ApiTags('Todo')
  @Get('get/personal/:id/todo')
  getTodo(@Param('id') id: string) {
    return this.todoService.getItems(id)
  }
}

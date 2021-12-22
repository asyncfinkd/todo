import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
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

  @ApiTags('Todo')
  @Post('add/personal/:id/todo/:category')
  addTodo(@Param('id') id: string, @Param('category') category: string) {
    return this.todoService.addItem(id, category)
  }

  @ApiTags('Todo')
  @Post('add/personal/:id/todo')
  addTodoHeader(@Body() req, @Param('id') id: string) {
    return this.todoService.addTodoHeader(req, id)
  }
}

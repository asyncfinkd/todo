import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger'
import { AddTodoTopicDto } from '../dto/todo.dto'
import { TodoService } from '../service/todo.service'

@Controller()
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'))
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @ApiTags('Todo')
  @Get('get/personal/todo')
  getTodo(@Req() req) {
    return this.todoService.getItems(req.user)
  }

  @ApiTags('Todo')
  @Post('add/personal/todo/:category')
  addTodo(
    @Req() authReq,
    @Body() req: AddTodoTopicDto,
    @Param('category') category: string,
  ) {
    return this.todoService.addItem(authReq.user, req, category)
  }

  @ApiTags('Todo')
  @Post('edit/personal/todo/:category')
  editTodo(
    @Req() authReq,
    @Body() req: AddTodoTopicDto,
    @Param('category') category: string,
  ) {
    return this.todoService.editTodo(authReq.user, req, category)
  }

  @ApiTags('Todo')
  @ApiBody({ type: AddTodoTopicDto })
  @Post('add/personal/todo')
  addTodoHeader(@Req() authReq, @Body() req: AddTodoTopicDto) {
    return this.todoService.addTodoHeader(authReq.user, req)
  }

  // @ApiTags('Todo')
  // @ApiBody({})
  // @Post('delete/personal/:id/todo/:todoID')
  // deleteTodoHeader(@Param('id') id: string, @Param('todoID') todoID: string) {
  //   return this.todoService.deleteTodoHeader(id, todoID)
  // }
}

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
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @ApiTags('Todo')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Get('get/personal/todo')
  getTodo(@Req() req) {
    return this.todoService.getItems(req.user)
  }

  @ApiTags('Todo')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Post('add/personal/todo/:category')
  addTodo(
    @Req() authReq,
    @Body() req: AddTodoTopicDto,
    @Param('category') category: string,
  ) {
    return this.todoService.addItem(authReq.user, req, category)
  }

  @ApiTags('Todo')
  @Post('edit/personal/todo')
  editTodo(@Body() req) {}

  @ApiTags('Todo')
  @ApiBody({ type: AddTodoTopicDto })
  @Post('add/personal/todo')
  addTodoHeader(@Body() req: AddTodoTopicDto) {
    return this.todoService.addTodoHeader(req)
  }

  // @ApiTags('Todo')
  // @ApiBody({})
  // @Post('delete/personal/:id/todo/:todoID')
  // deleteTodoHeader(@Param('id') id: string, @Param('todoID') todoID: string) {
  //   return this.todoService.deleteTodoHeader(id, todoID)
  // }
}

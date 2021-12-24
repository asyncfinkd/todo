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
import { AddTodoTopicDto, DeleteTodoItemDto } from '../dto/todo.dto'
import { TodoService } from '../service/todo.service'

/**
 * Controller
 */
@Controller()
@ApiTags('Todo')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'))
export class TodoController {
  /**
   * Creates an instance of todo controller.
   * @param todoService
   */
  constructor(private readonly todoService: TodoService) {}

  /**
   * Apis tags
   * @param req
   * @returns
   */
  @Get('get/personal/todo')
  getTodo(@Req() req) {
    return this.todoService.getItems(req.user)
  }

  @Get('get/personal/todo/:id')
  getOnceItem(@Req() req, @Param('id') id: string) {
    return this.todoService.getOnceItem(req.user, id)
  }

  /**
   * Apis tags
   * @param authReq
   * @param req
   * @param category
   * @returns
   */
  @Post('add/personal/todo/:category')
  addTodo(
    @Req() authReq,
    @Body() req: AddTodoTopicDto,
    @Param('category') category: string,
  ) {
    return this.todoService.addItem(authReq.user, req, category)
  }

  /**
   * Apis tags
   * @param authReq
   * @param req
   * @param category
   * @returns
   */
  @Post('edit/personal/todo/:category')
  async editTodo(
    @Req() authReq,
    @Body() req: AddTodoTopicDto,
    @Param('category') category: string,
  ) {
    const result = await this.todoService.editTodo(authReq.user, req, category)

    return result
  }

  /**
   * Apis tags
   * @param authReq
   * @param req
   * @returns
   */
  @ApiBody({ type: AddTodoTopicDto })
  @Post('add/personal/todo')
  addTodoHeader(@Req() authReq, @Body() req: AddTodoTopicDto) {
    return this.todoService.addTodoHeader(authReq.user, req)
  }

  /**
   * Posts todo controller
   * @param authReq
   * @param req
   * @param category
   * @returns
   */
  @Post('delete/personal/todo/:category')
  async deleteTodo(
    @Req() authReq,
    @Body() req: DeleteTodoItemDto,
    @Param('category') category: string,
  ) {
    const result = await this.todoService.deleteTodoItem(
      authReq.user,
      category,
      req,
    )

    return result
  }

  @Post('delete/personal/todo/topic')
  async deleteTodoTopic(
    @Req() authReq,
    // @Param('category') category: string,
  ) {
    return this.todoService.deleteTodoTopic(authReq.user)
  }
}

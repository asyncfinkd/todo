import { Body, Controller, Post } from '@nestjs/common'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { RegisterDto } from '../dto/register.dto'
import { RegisterService } from '../service/register.service'

@Controller('register')
export class RegisterController {
  constructor(private readonly RegisterService: RegisterService) {}

  @ApiTags('Register')
  @Post()
  @ApiBody({ type: RegisterDto })
  async registerUser(@Body() user: RegisterDto) {
    return await this.RegisterService.registerUser(user)
  }
}

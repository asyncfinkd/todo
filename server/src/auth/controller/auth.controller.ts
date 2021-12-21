import { Body, Controller, Post } from '@nestjs/common'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { AuthDto } from 'src/auth/dto/auth.dto'
import { AuthService } from '../service/auth.service'

interface TAuth {
  success: boolean
  access_token: string
}
/**
 * Controller
 */
/**
 */
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  /**
   * Creates an instance of auth controller.
   * @param authService
   */
  constructor(private readonly authService: AuthService) {}
  /**
   * Posts auth controller
   * @param dto
   * @returns student
   */
  @Post()
  @ApiBody({ type: AuthDto })
  authStudent(@Body() dto: AuthDto): Promise<TAuth> {
    return this.authService.signinLocal(dto)
  }
}

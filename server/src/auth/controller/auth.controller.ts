import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger'
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

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Post('refresh')
  async refreshToken(@Req() req) {
    const result = await this.authService.refreshToken(req.user.userID)

    return result
  }
}

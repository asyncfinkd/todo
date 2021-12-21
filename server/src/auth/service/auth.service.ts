import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import { AuthDto } from 'src/auth/dto/auth.dto'
import { UserDocument, UserSchema } from 'src/auth/model/auth.model'
import { Model } from 'mongoose'

/**
 * Injectable
 */
@Injectable()
export class AuthService {
  /**
   * Creates an instance of auth service.
   * @param jwtService
   * @param userModel
   */
  constructor(
    private jwtService: JwtService,
    @InjectModel(UserSchema.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  /**
   * Signins local
   * @param dto
   * @returns
   */
  async signinLocal(dto: AuthDto) {
    const user = await this.userModel.findOne({ email: dto.email })
    if (!user) throw new UnauthorizedException('Credentials incorrect')
    if (user.password !== dto.password)
      throw new UnauthorizedException('Credentials incorrect')

    return this.signUser(
      user._id,
      user.email,
      user.role,
      user.name,
      user.lastName,
    )
  }

  /**
   * Signs user
   * @param userID
   * @param email
   * @param role
   * @returns
   */
  signUser(
    userID: string,
    email: string,
    role: string,
    name: string,
    lastName: string,
  ) {
    return {
      success: true,
      access_token: this.jwtService.sign({
        userID,
        email,
        role,
        name,
        lastName,
      }),
    }
  }
}

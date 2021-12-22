import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UserDocument, UserSchema } from 'src/auth/model/auth.model'
import { RegisterDto } from '../dto/register.dto'

@Injectable()
export class RegisterService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(UserSchema.name) private userModel: Model<UserDocument>,
  ) {}

  async registerUser(user: RegisterDto) {
    try {
      return await this.userModel
        .findOne({ email: user.email })
        .then((result) => {
          if (!result) {
            const newUser = new this.userModel(user)
            newUser.save()

            return this.generateToken(
              user.email,
              user.email,
              user.role,
              user.name,
              user.lastName,
            )
          } else {
            throw new ConflictException('მსგავსი ელ.ფოსტა უკვე რეგისტრირებულია')
          }
        })
    } catch (err) {
      throw new InternalServerErrorException({ description: err })
    }
  }

  /**
   * Generates token
   * @param userID
   * @param email
   * @param role
   * @returns
   */
  generateToken(
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
      message: 'თქვენ წარმატებით გაიარეთ რეგისტრაცია',
    }
  }
}

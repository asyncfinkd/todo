import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UserDocument, UserSchema } from 'src/auth/model/auth.model'

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(UserSchema.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async getItems(id: string) {
    try {
      const user = await this.userModel.findById({ _id: id })

      return { item: user, success: true }
    } catch (err) {
      return err
    }
  }
}

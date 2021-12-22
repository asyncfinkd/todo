import { Injectable, InternalServerErrorException } from '@nestjs/common'
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

      return { item: user.todos, success: true }
    } catch (err) {
      throw new InternalServerErrorException({ description: err })
    }
  }

  async addItem(req: any, id: string, category: string) {
    try {
      const item = await this.userModel.findById({ _id: id })

      item.todos.map((secondItem) => {
        // @ts-ignore
        if (category == secondItem._id) {
          secondItem.items.push({ ...req, completed: false })
        }
      })
      item.save()
    } catch (err) {
      throw new InternalServerErrorException({ description: err })
    }
  }

  async addTodoHeader(req: any, id: string) {
    try {
      const user = await this.userModel.findById({ _id: id })

      user.todos.push(req)
      user.save()
    } catch (err) {
      throw new InternalServerErrorException({ description: err })
    }
  }
}

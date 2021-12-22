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

      return { item: user.todos, success: true }
    } catch (err) {
      return err
    }
  }

  async addItem(id: string, category: string) {
    try {
      const item = await this.userModel.findById({ _id: id })

      item.todos.map((secondItem) => {
        // console.log(secondItem)
        // console.log(secondItem._id)
        // @ts-ignore
        if (category === secondItem._id) {
          console.log(secondItem)
        }
      })
    } catch (err) {
      return err
    }
  }

  async addTodoHeader(req: any, id: string) {
    try {
      const user = await this.userModel.findById({ _id: id })

      user.todos.push(req)
      user.save()
    } catch (err) {
      return err
    }
  }
}

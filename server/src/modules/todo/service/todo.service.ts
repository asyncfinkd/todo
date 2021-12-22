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

  async getItems(req: any) {
    try {
      console.log(req)
      const user = await this.userModel.findById({ _id: req.userID })

      return { item: user.todos, success: true }
    } catch (err) {
      throw new InternalServerErrorException({ description: err })
    }
  }

  async addItem(authReq: any, req: any, category: string) {
    try {
      const item = await this.userModel.findById({ _id: authReq.userID })

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

  async editTodo(req: any) {
    try {
      const user = await this.userModel.findById({ _id: req.id })

      user.todos.map((item) => {
        console.log(item)
      })
    } catch (err) {
      throw new InternalServerErrorException({ description: err })
    }
  }

  async addTodoHeader(authReq: any, req: any) {
    try {
      const user = await this.userModel.findById({ _id: authReq.userID })

      user.todos.push(req)
      user.save()
    } catch (err) {
      throw new InternalServerErrorException({ description: err })
    }
  }

  // async deleteTodoHeader(id: string, todoID: string) {
  //   try {
  //     const user = await this.userModel.findById({ _id: id })

  //     user.todos.map((item) => {
  // @ts-ignore
  //       if (todoID == item._id) {
  //         console.log(item)
  //       }
  //     })
  //   } catch (err) {
  //     throw new InternalServerErrorException({ description: err })
  //   }
  // }
}

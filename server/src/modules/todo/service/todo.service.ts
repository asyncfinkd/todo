/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UserDocument, UserSchema } from 'src/auth/model/auth.model'
import { TodoDocument, TodoSchema } from '../model/todo.model'

/**
 * Injectable
 */
@Injectable()
export class TodoService {
  /**
   * Creates an instance of todo service.
   * @param userModel
   */
  constructor(
    @InjectModel(UserSchema.name)
    private userModel: Model<UserDocument>,
    @InjectModel(TodoSchema.name) private todoModel: Model<TodoDocument>,
  ) {}

  /**
   * Gets items
   * @param req
   * @returns
   */
  async getItems(req: any) {
    try {
      const user = await this.userModel
        .findOne({ _id: req.userID })
        .populate('todos.items')

      return { item: user, success: true }
    } catch (err) {
      throw new InternalServerErrorException({ description: err })
    }
  }

  /**
   * Gets once item
   * @param req
   * @param id
   */
  async getOnceItem(req: any, id: string) {
    try {
      const user = await this.userModel.findOne({ _id: req.userID })

      const data = []
      user.todos.map((item) => {
        // @ts-ignore
        if (id == item._id) {
          data.push(item)
        }
      })

      return { item: data[0] }
    } catch (err) {
      throw new InternalServerErrorException({ description: err })
    }
  }

  /**
   * Adds item
   * @param authReq
   * @param req
   * @param category
   */
  async addItem(authReq: any, req: any, category: string) {
    try {
      const item = await this.userModel.findById({ _id: authReq.userID })

      item.todos.map((secondItem) => {
        // @ts-ignore
        if (category == secondItem._id) {
          // secondItem.items.push({ ...req, completed: false })
        }
      })

      item.save()
    } catch (err) {
      throw new InternalServerErrorException({ description: err })
    }
  }

  /**
   * Edits todo
   * @param authReq
   * @param req
   * @param category
   */
  async editTodo(authReq: any, req: any, category: string) {
    try {
      const user = await this.userModel.findById({ _id: authReq.userID })

      user.todos.map((item) => {
        // @ts-ignore
        if (category == item._id) {
          item.text = req.text
        }
      })

      return user.save().then(() => {
        return {
          success: true,
          item: user.todos,
          message: 'წარმატებით შეიცვალა ტოპიკის სახელი',
        }
      })
    } catch (err) {
      throw new InternalServerErrorException({ description: err })
    }
  }

  /**
   * Adds todo header
   * @param authReq
   * @param req
   */
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

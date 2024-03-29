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
      const user = await this.userModel
        .findOne({ _id: req.userID })
        .populate('todos.items')

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

      const newTodo = new this.todoModel({ ...req, completed: false })

      newTodo.save((err, doc) => {
        if (!err) {
          item.todos.map((item) => {
            // @ts-ignore
            if (category == item._id) {
              item.items.push(doc._id)
            }
          })

          item.save()
        }
      })

      return {
        success: true,
        message: 'გილოცავთ წარმატებით დაემატა ახალი აითემი',
      }
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

  async deleteTodoTopic(authReq: any, _id: any) {
    try {
      const deleteUser = await this.userModel.findByIdAndUpdate(
        { _id: authReq.userID },
        { $pull: { todos: { _id: _id._id } } },
        { new: true },
      )
      if (deleteUser) {
        const saveUser = await deleteUser.save()
        return {
          success: true,
          doc: saveUser,
        }
      } else {
        throw new InternalServerErrorException({
          description: 'მომხმარებელი ვერ მოიძებნა',
        })
      }
    } catch (err) {
      throw new InternalServerErrorException({ description: err })
    }
  }

  /**
   * Deletes todo item
   * @param authReq
   * @param category
   * @param itemID
   * @returns
   */
  async deleteTodoItem(authReq: any, category: string, itemID: any) {
    try {
      return this.userModel
        .findById({
          _id: authReq.userID,
        })
        .then((result) => {
          result.todos.map((element) => {
            // @ts-ignore
            if (element._id == category) {
              element.items = element.items.filter(
                (item) => item.toString() != itemID._id,
              )
            }
          })
          return result.save().then(() => {
            return this.todoModel
              .findByIdAndRemove({ _id: itemID._id })
              .then(() => {
                return { success: true, message: 'წარმატებით წაიშალა აითემი' }
              })
          })
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
      return user
        .save()
        .then((doc: any) => {
          return {
            success: true,
            message: 'გილოცავთ წარმატებით დაემატა ტოპიკი',
            item: doc.todos,
          }
        })
        .catch(() => {
          throw new InternalServerErrorException({
            message: 'დაფიქსირდა შეცდომა',
          })
        })
    } catch (err) {
      throw new InternalServerErrorException({ description: err })
    }
  }
}

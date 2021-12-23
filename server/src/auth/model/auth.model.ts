import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import * as mongoose from 'mongoose'
import { TodoSchema } from 'src/modules/todo/model/todo.model'

export type UserDocument = UserSchema & Document

@Schema({ _id: false })
export class SchemaForMapping {
  @Prop()
  text: string

  @Prop({ type: [mongoose.Types.ObjectId], ref: TodoSchema.name })
  items: TodoSchema[]
}

const SchemaForMap = SchemaFactory.createForClass(SchemaForMapping)

@Schema({ collection: 'users' })
export class UserSchema {
  @Prop()
  email: string

  @Prop()
  name: string

  @Prop()
  lastName: string

  @Prop()
  role: string

  @Prop()
  password: string

  @Prop()
  image: string

  @Prop({ type: [SchemaForMap] })
  todos: SchemaForMapping[]
}

export interface IUser {
  _id: string
  email: string
  name: string
  lastName: string
  role: string
  password: string
  image: string
}

export const User = SchemaFactory.createForClass(UserSchema)

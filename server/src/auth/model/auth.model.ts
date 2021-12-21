import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserDocument = UserSchema & Document

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

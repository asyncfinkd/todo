import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'

export type TodoDocument = TodoSchema & mongoose.Document

@Schema({ collection: 'todos' })
export class TodoSchema {
  @Prop()
  text: string

  @Prop()
  completed: boolean
}

export const Todo = SchemaFactory.createForClass(TodoSchema)

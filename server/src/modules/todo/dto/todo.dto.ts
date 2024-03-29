import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

/**
 * Add todo topic dto
 */
export class AddTodoTopicDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  text: string
}

export class DeleteTodoItemDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  _id: string
}

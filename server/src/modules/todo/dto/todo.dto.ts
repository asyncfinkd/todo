import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class AddTodoTopicDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  text: string
}

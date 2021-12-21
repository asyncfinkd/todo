import { ApiProperty } from '@nestjs/swagger'

export class RegisterDto {
  @ApiProperty()
  email: string

  @ApiProperty()
  name: string

  @ApiProperty()
  lastName: string

  @ApiProperty()
  role: string

  @ApiProperty()
  password: string
}

import { ApiProperty } from '@nestjs/swagger'

export class AuthDto {
  @ApiProperty()
  email: string

  @ApiProperty()
  password: string
}

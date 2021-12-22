import { SetMetadata } from '@nestjs/common'

export const authRole = (...authRole: string[]) =>
  SetMetadata('roles', authRole)

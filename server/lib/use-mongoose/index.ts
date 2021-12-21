import { MongooseModule } from '@nestjs/mongoose'

/**
 * X use mongoose connect
 * @param x
 * @param y
 * @returns
 */

export const useMongooseConnect = (x, y) => {
  return MongooseModule.forFeature([{ name: x.name, schema: y }])
}

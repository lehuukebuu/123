import { Request, Response, NextFunction } from 'express'
import { body, validationResult, ValidationChain } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/src/middlewares/schema'
import { EntityError, ErrorWithStatus } from '~/models/Error'
export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await validation.run(req)
    //promite : phải thêm await

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
      //lấy từng chỗ check lỗi lưu vô req
    }
    const errorObject = errors.mapped()
    const entityError = new EntityError({ errors: {} })
    for (const key in errorObject) {
      //lấy msg của từng lỗi ra
      const { msg } = errorObject[key]
      if (msg instanceof ErrorWithStatus && msg.status !== 422) {
        return next(msg)
      }
      //nếu xuống đc đây thì mày là lỗi 422
      entityError.errors[key] = msg
    }
    //xử lý lỗi luôn
    next(entityError)
    //mapped: biến đổi  đẹp hơn
  }
}

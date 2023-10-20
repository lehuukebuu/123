import { Request, Response, NextFunction } from 'express'
import { body, validationResult, ValidationChain } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/src/middlewares/schema'
export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await validation.run(req)
    //promite : phải thêm await

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
      //lấy từng chỗ check lỗi lưu vô req
    }

    res.status(400).json({ errors: errors.mapped() })
    //mapped: biến đổi  đẹp hơn
  }
}

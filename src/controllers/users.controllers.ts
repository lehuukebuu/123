import { NextFunction, Request, Response } from 'express'
import usersService from '~/services/users.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterReqBody } from '~/models/requests/User.requests'
export const loginController = async (req: Request, res: Response) => {
  //nếu nó vào đc đây , nó đã đưa email và password đúng, đăng nhập thành công
  const { user }: any = req
  const user_id = user._id //objectId
  //server phải tạo ra access_token và refresh_token để đưa chi client
  const result = await usersService.login(user_id.toString()) //
  return res.json({
    message: 'Login successfully',
    result
  })
}
export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  const { email, password, name, date_of_birth } = req.body
  //đoạn bị thay thế
  const result = await usersService.register(req.body)
  return res.json({
    message: 'Register successfully',
    result
  })
}

import { NextFunction, Request, Response } from 'express'
import usersService from '~/services/users.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { LoginReqBody, LogoutReqBody, RegisterReqBody } from '~/models/requests/User.requests'
import { ObjectId } from 'mongodb'
import User from '~/models/schemas/User.shema'
import { USERS_MESSAGES } from '~/constants/messages'
export const loginController = async (req: Request<ParamsDictionary, any, LoginReqBody>, res: Response) => {
  //nếu nó vào đc đây , nó đã đưa email và password đúng, đăng nhập thành công
  const user = req.user as User
  const user_id = user._id as ObjectId //objectId
  //server phải tạo ra access_token và refresh_token để đưa chi client
  const result = await usersService.login(user_id.toString()) //
  return res.json({
    message: USERS_MESSAGES.LOGIN_SUCCESS,

    result
  })
}
export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  const { email, password, name, date_of_birth } = req.body
  //đoạn bị thay thế
  const result = await usersService.register(req.body)
  return res.json({
    message: USERS_MESSAGES.REGISTER_SUCCESS,
    result
  })
}

export const logoutController = async (req: Request<ParamsDictionary, any, LogoutReqBody>, res: Response) => {
  //lấy refresh_token từ req.body
  const { refresh_token } = req.body
  //logout:vào database xóa refresh_token này
  const result = await usersService.logout(refresh_token)
  res.json(result)
}

import { NextFunction, Request, Response } from 'express'
import usersService from '~/services/users.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { LoginReqBody, LogoutReqBody, RegisterReqBody, TokenPayload } from '~/models/requests/User.requests'
import { ObjectId } from 'mongodb'
import User from '~/models/schemas/User.shema'
import { USERS_MESSAGES } from '~/constants/messages'
import { UserVerifyStatus } from '~/constants/enums'
import databaseService from '~/services/database.services'
import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/Error'
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
export const emailVerifyController = async (req: Request, res: Response) => {
  //kiểm tra user này đã verify hay chưa
  const { user_id } = req.decoded_email_verify_token as TokenPayload
  const user = req.user as User
  if (user.verify === UserVerifyStatus.Verified) {
    return res.json({
      message: USERS_MESSAGES.EMAIL_ALREADY_VERIFIED_BEFORE
    })
  }
  //nếu mà xuống đc đây nghĩa user này chưa verify, chưa bị banned, và khớp mã
  //mình tiến hành update:verify:1, xóa email_verify_token,update_at
  const result = await usersService.verifyEmail(user_id)
  return res.json({
    message: USERS_MESSAGES.EMAIL_VERIFY_SUCCESS,
    result
  })
}
export const resendEmailVerifyController = async (req: Request, res: Response) => {
  //nếu code vào đây đc nghiawx là đã đi qua đc tầng accessTokenValidator
  //trong req đó có decoded_authorization
  const { user_id } = req.decoded_authorization as TokenPayload
  //lấy user từ database

  const user = await databaseService.users.findOne({
    _id: new ObjectId(user_id)
  })
  if (!user) {
    throw new ErrorWithStatus({
      message: USERS_MESSAGES.USER_NOT_FOUND,
      status: HTTP_STATUS.NOT_FOUND
    })
  }
  if (user.verify == UserVerifyStatus.Banned) {
    throw new ErrorWithStatus({
      message: USERS_MESSAGES.USER_BANNED,
      status: HTTP_STATUS.FORBIDDEN
    })
  }
  if (user.verify == UserVerifyStatus.Verified) {
    return res.json({
      message: USERS_MESSAGES.EMAIL_ALREADY_VERIFIED_BEFORE
    })
  }
  //nếu chưa verify thì tiến hành update cho user mã mới
  const result = await usersService.resendEmailVerify(user_id)
  return res.json(result)
}
export const forgotPasswordController = async (req: Request, res: Response) => {
  //lấy user_id từ req.user
  const { _id } = req.user as User
  //tiến hành update lại forgot_password_token
  const result = await usersService.forgotPassword((_id as ObjectId).toString())
  return res.json(result)
}
export const verifyForgotPasswordTokenController = async (req: Request, res: Response, next: NextFunction) => {
  //nếu đã đến bước này nghĩa là ta đã tìm có forgot_password_token hợp lệ
  //và đã lưu vào req.decoded_forgot_password_token
  //thông tin của user
  //ta chỉ cần thông báo rằng token hợp lệ
  return res.json({
    message: USERS_MESSAGES.VERIFY_FORGOT_PASSWORD_TOKEN_SUCCESS
  })
}

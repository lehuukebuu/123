import { RegisterReqBody } from '~/models/requests/User.requests'
import User from '../models/schemas/User.shema'
import databaseService from './database.services'
import { hashPassword } from '~/utils/crypto'
import { signToken } from '~/utils/jwt'
import { TokenType, UserVerifyStatus } from '~/constants/enums'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import { ObjectId } from 'mongodb'
import { USERS_MESSAGES } from '~/constants/messages'
import { verify } from 'crypto'

class UsersService {
  // hàm nhận vào user_id và bỏ payload để tạo access_token
  private signAccessToken(user_id: string) {
    return signToken({
      payload: { user_id, token_type: TokenType.AccessToken },
      options: { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN },
      privatekey: process.env.JWT_SECRET_ACCESS_TOKEN as string
    })
  }
  private signRefreshToken(user_id: string) {
    return signToken({
      payload: { user_id, token_type: TokenType.AccessToken },
      options: { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN },
      privatekey: process.env.JWT_SECRET_REFRESH_TOKEN as string
    })
  }
  private signEmailVerifyToken(user_id: string) {
    return signToken({
      payload: { user_id, token_type: TokenType.AccessToken },
      options: { expiresIn: process.env.EMAIL_VERIFY_TOKEN_EXPIRE_IN },
      privatekey: process.env.JWT_SECRET_EMAIL_VERIFY_TOKEN as string
    })
  }
  private signAccessTokenAndsignRefreshToken(user_id: string) {
    return Promise.all([this.signAccessToken(user_id), this.signRefreshToken(user_id)])
  }
  private signForgotPasswordToken(user_id: string) {
    return signToken({
      payload: { user_id, token_type: TokenType.FrogotPasswordToken },
      options: { expiresIn: process.env.FORGOT_PASSWORD_TOKEN_EXPIRE_IN },
      privatekey: process.env.JWT_SECRET_FORGOT_PASSWORD_TOKEN as string //thêm
    })
  }

  // hàm nhận vào user_id và bỏ payload để tạo refresh_token
  async checkEmailExist(email: string) {
    const user = await databaseService.users.findOne({ email })
    return Boolean(user)
  }

  async register(payload: RegisterReqBody) {
    const user_id = new ObjectId()
    const email_verify_token = await this.signEmailVerifyToken(user_id.toString())

    const result = await databaseService.users.insertOne(
      new User({
        ...payload,
        _id: user_id,
        email_verify_token,
        date_of_birth: new Date(payload.date_of_birth),
        password: hashPassword(payload.password)
      })
    )
    const [access_token, refresh_token] = await this.signAccessTokenAndsignRefreshToken(user_id.toString())
    //lưu refresh_token vào database
    await databaseService.refreshTokens.insertOne(
      new RefreshToken({
        token: refresh_token,
        user_id: new ObjectId(user_id)
      })
    )
    //giả lập gửi mail
    console.log(email_verify_token)
    return { access_token, refresh_token }
  }
  async login(user_id: string) {
    const [access_token, refresh_token] = await this.signAccessTokenAndsignRefreshToken(user_id)

    await databaseService.refreshTokens.insertOne(
      new RefreshToken({
        token: refresh_token,
        user_id: new ObjectId(user_id)
      })
    )
    return { access_token, refresh_token }
  }
  async logout(refresh_token: string) {
    await databaseService.refreshTokens.deleteOne({ token: refresh_token })
    return {
      message: USERS_MESSAGES.LOGIN_SUCCESS
    }
  }
  async verifyEmail(user_id: string) {
    //cập nhật lại user
    await databaseService.users.updateOne(
      {
        _id: new ObjectId(user_id)
      },
      [
        {
          $set: { email_verify_token: '', verify: UserVerifyStatus.Verified, updated_at: '$$NOW' }
        }
      ]
    )
    //tạo access_token và refresh_token
    const [access_token, refresh_token] = await this.signAccessTokenAndsignRefreshToken(user_id)
    //lưu refresh_token vào database
    await databaseService.refreshTokens.insertOne(
      new RefreshToken({
        token: refresh_token,
        user_id: new ObjectId(user_id)
      })
    )
    return { access_token, refresh_token }
  }
  async resendEmailVerify(user_id: string) {
    const email_verify_token = await this.signEmailVerifyToken(user_id)
    //cập nhật lại user
    await databaseService.users.updateOne(
      {
        _id: new ObjectId(user_id)
      },
      [
        {
          $set: {
            email_verify_token,
            updated_at: '$$NOW'
          }
        }
      ]
    )
    //giả lập mail
    console.log(email_verify_token)
    return { message: USERS_MESSAGES.REFRESH_EMAIL_VERIFY_SUCCESS }
  }

  async forgotPassword(user_id: string) {
    //tạo ra forgot_password_token
    const forgot_password_token = await this.signForgotPasswordToken(user_id)
    //cập nhật vào forgot_password_token và user_id
    await databaseService.users.updateOne({ _id: new ObjectId(user_id) }, [
      {
        $set: { forgot_password_token: forgot_password_token, updated_at: '$$NOW' }
      }
    ])
    //giả lập mail
    console.log('forgot_password_token: ', forgot_password_token)
    return {
      message: USERS_MESSAGES.CHECK_EMAIL_TO_RESET_PASSWORD
    }
  }
}
const usersService = new UsersService()
export default usersService

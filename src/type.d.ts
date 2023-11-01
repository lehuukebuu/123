import User from './models/schemas/User.shema'

// file này dùng để định nghĩa lại thuộc tính có sẵn
declare module 'express' {
  interface Request {
    user?: User
    decoded_authorization?: TokenPayload
    decoded_refresh_token?: TokenPayload
  }
}

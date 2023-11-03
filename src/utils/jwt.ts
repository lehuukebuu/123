import { secureHeapUsed } from 'crypto'
import jwt from 'jsonwebtoken'
import { TokenPayload } from '~/models/requests/User.requests'

//làm  hàm nhận vào payload, privatekey, options từ đó
export const signToken = ({
  payload,
  privatekey,
  options = { algorithm: 'HS256' }
}: {
  payload: string | object | Buffer
  privatekey: string
  //thêm ? là nó tự ký
  options: jwt.SignOptions
}) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privatekey, options, (err, token) => {
      if (err) throw reject(err)
      resolve(token as string)
    })
  })
}
//biến payload, privatekey, options thành object bằng cách thêm {}

export const verifyToken = ({ token, secretOrPublicKey }: { token: string; secretOrPublicKey: string }) => {
  //trả về JwtPayload(thông tin người gữi req) nếu token hợp lệ
  return new Promise<TokenPayload>((resolve, reject) => {
    //method này sẽ verify token, nếu token hợp lệ thì nó sẽ trả về payload
    //nếu token không hợp lệ thì nó sẽ throw error
    //secretOrPublicKey dùng để verify token
    //nếu token được tạo ra bằng secret|PublicKey thì ta dùng secret|PublicKey key để verify
    //từ đó biết rằng access_token được tạo bởi chính server
    jwt.verify(token, secretOrPublicKey, (error, decoded) => {
      if (error) throw reject(error)
      resolve(decoded as TokenPayload)
    })
  })
}

import jwt from 'jsonwebtoken'

//làm  hàm nhận vào payload, privatekey, options từ đó
export const signToken = ({
  payload,
  privatekey = process.env.JWT_SECRET as string,
  options = { algorithm: 'HS256' }
}: {
  payload: string | object | Buffer
  privatekey?: string
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

import { Request, Response } from 'express'
import usersService from '~/services/users.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterReqBody } from '~/models/requests/User.requests'
export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body
  if (email === 'test@gmail.com' && password === '123456')
    return res.json({
      mesage: 'Login successfully',
      result: [
        { name: 'Bửu', yob: 2004 },
        { name: 'rim', yob: 2004 },
        { name: 'tuyen', yob: 2004 }
      ]
    })
}
export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  try {
    //đoạn bị thay thế
    const result = await usersService.register(req.body)
    res.json({
      message: 'Register success',
      result
    })
  } catch (error) {
    res.status(400).json({
      message: 'register failed',
      error
    })
  }
}

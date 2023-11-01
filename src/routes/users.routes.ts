import { Router } from 'express'
import { access } from 'fs'
import { loginController, logoutController, registerController } from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator
} from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handers'
const usersRouter = Router()

usersRouter.get('/login', loginValidator, wrapAsync(loginController))
/* 
    Description: Register new user
    Path:/register
    Method:POST
    body{
        name:string
        email:string
        password:string
        confirm_password:string
        date_of_birth: string theo chuẩn ISO 8601
        
    }
*/
usersRouter.post('/register', registerValidator, wrapAsync(registerController))

usersRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapAsync(logoutController))

export default usersRouter

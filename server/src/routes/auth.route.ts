import express from 'express'
import { AuthController } from '../controllers/auth.controller'

const authController = new AuthController()
const authRouter = express.Router()

authRouter.post('/login', authController.loginUser)
authRouter.post('/register', authController.register)
authRouter.post('/username-resolve/:role', authController.resolveUsername)

export default authRouter
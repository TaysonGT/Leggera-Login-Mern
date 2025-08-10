import { Response, Request } from "express";
import { UserService } from "../services/user.service";
import { AuthService } from "../services/auth.service";
import { IUser } from "../entities/user.entity";

const userService = new UserService()
const authService = new AuthService()

export class AuthController {


    async loginUser(req: Request, res: Response){
        const data:{username: string, password: string, remember: boolean} = req.body

        authService.login(data)
        .then(({safeUser, expires})=>{
            res.cookie('token', JSON.stringify(safeUser), {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: expires
            })
            res.json({
                message: "Login Successful",
                success: true,
                user: safeUser
            })
        }).catch((error)=>{
            res.json({message: error.message, success: false});
        })
    }

    async register(req: Request, res: Response){
        const data:IUser = req.body

        authService.register(data)
        .then(({safeUser})=>{
            res.cookie('token', JSON.stringify(safeUser), {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: new Date().getTime()+ 2*60*60*1000
            })
            res.json({
                message: "Login Successful",
                success: true,
                user: safeUser
            })
        }).catch((error)=>{
            res.json({message: error.message, success: false});
        })
    }

    async resolveUsername(req: Request, res: Response) {
        try{
            const data = req.body;
            const user = await userService.getClientByUsername(data.username);
            res.status(200).json({ success:true, email: user.email });
        }catch (error) {
            res.status(404).json({ success:false, error: error.message || 'Username not found' });
        }
    }
}
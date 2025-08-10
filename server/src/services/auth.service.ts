import { myDataSource } from "../app.data-source";
import { IUser, User } from "../entities/user.entity";
import bcrypt from 'bcrypt'

const userRepo = myDataSource.getRepository(User)

export class AuthService{

    constructor(
    ){}

    async register(data: IUser){
        // Validation
        if (!data.username || !data.password) {
            throw new Error('Username and password are required');
        }
        if (!/^[a-zA-Z0-9_]+$/.test(data.username.toLowerCase())) {
            throw new Error('Invalid characters in username');
        }
        if (data.password !== data.confirmPassword) {
            throw new Error("Password confirmation doesn't match");
        }

        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        // Email validation
        if (!emailRegex.test(data.email)) {
            throw new Error('Invalid email format');
        }
        
        // Create client
        const user = userRepo.create({
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            username: data.username.toLowerCase(),
            gender: data.gender,
            avatarUrl: data.avatarUrl,
        });

        await userRepo.save(user)
        
        const safeUser = {
            id: user.id,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            avatarUrl: user.avatarUrl
        }

        
        return {safeUser}
    }
        
    
        async login(data: {username: string, password: string, remember: boolean}){
            let expires = 2 * 60 * 60 * 1000
    
            if(data.remember) expires = 8 * 1000 * 60 * 60;
    
            if(!data.password || !data.username){
                throw new Error('Please fill all the fields')
            }
            if (!/^[a-zA-Z0-9_]+$/.test(data.username.toLowerCase())) {
                throw new Error('Invalid characters in username');
            }
    
            const trimmedUsername = data.username.trim().toLowerCase();
            const trimmedPassword = data.password.trim();
    
            const user = await userRepo.findOne({where: {username: trimmedUsername}})
            
            if(!user) throw new Error('User not found')
            
            const isVerified = bcrypt.compare(trimmedPassword, user.password)

            if(!isVerified) throw new Error('Incorrect Password')

            const safeUser = {
                id: user.id,
                username: user.firstname,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                avatarUrl: user.avatarUrl
            }
    
            return {safeUser, expires}
        }
    

}
import { myDataSource } from "../app.data-source.js";
import { User } from "../entities/user.entity.js";

const userRepo = myDataSource.getRepository(User)

export class UserService{

    constructor(
        
    ){}

    
    async allClients(){
        return await userRepo.find()
    }
    
    async getClientById(id:string){
        return await userRepo.findOne({where:{id}})
    }

    async getClientByUsername(username:string){
        if(!username) throw new Error('No username provided');
            
        const user = await userRepo.findOne({where:{username:username.toLowerCase().trim()}})

        if(!user) throw new Error('User not found');
        return user
    }
}
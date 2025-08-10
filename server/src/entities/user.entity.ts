import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';

export interface IUser {
  id:string;
  firstname: string;
  lastname: string;
  username: string;
  gender: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatarUrl?: string;
}

@Entity('users')
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    username: string;

    @Column()
    firstname: string;
    
    @Column()
    lastname: string;
    
    @Column()
    gender: string;
    
    @Column()
    password: string;
    
    @Column({unique:true})
    email: string;
    
    @Column({nullable: true})
    avatarUrl?: string;
    
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
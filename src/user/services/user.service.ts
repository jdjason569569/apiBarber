import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { users } from '../entities/users.entity';

@Injectable()
export class UserService {

    constructor(@InjectRepository(users) private userRepo: Repository<users>){}

    findAll(){
       return this.userRepo.find();
    }

    findUser(id: string): Promise<users>{
        return this.userRepo.findOne({ where: { id_firebase: id }});
    }

    create(body: users){
        const newUser = this.userRepo.create(body);
        return this.userRepo.save(newUser);
    }

    async update(id: any, body:any){
        const user = await this.userRepo.findOne(id);
        this.userRepo.merge(user, body);
        return this.userRepo.save(user);
    }

    async delete(id: number){
        await this.userRepo.delete(id);
        return true;
    }
}

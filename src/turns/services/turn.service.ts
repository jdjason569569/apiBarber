import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Turn } from '../entities/turn.entity';


@Injectable()
export class TurnService {

    constructor(@InjectRepository(Turn) private turnRepo: Repository<Turn>){}

    findAll(){
       return this.turnRepo.find();
    }

     async findTaskById(id: number){
        return await this.turnRepo.find({ where: { id: id }});
    }

    create(body: Turn){
        body.date_register = new Date();
        const newTask = this.turnRepo.create(body);
        return this.turnRepo.save(newTask);
    }
    

    async update(id: any, body:any){
        const [task] = await this.findTaskById(id);
        this.turnRepo.merge(task, body);
        return this.turnRepo.save(task);
    }

    async delete(id: number){
        await this.turnRepo.delete(id);
        return true;
    }





}

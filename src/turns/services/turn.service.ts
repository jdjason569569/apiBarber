import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Turn } from '../entities/turn.entity';


@Injectable()
export class TurnService {

    constructor(@InjectRepository(Turn) private turnRepo: Repository<Turn>){}

    async findAll(){
       return await this.turnRepo.find({ order: { order: 'ASC' }});
    }

     async findTurnById(id: number){
        return await this.turnRepo.find({ where: { id: id }});
    }

    async orderCreate(body: Turn[]){
        for (const turn of body) {
            return await this.create(turn, true);
        }
    }

    async create(body: Turn, isDelete: boolean){
        let newTask = null;
        body.date_register = new Date();
        if(!isDelete){
          const turns = await this.findAll();
          if(turns.length === 0){
            body.order = 1;
          }
          if(turns.length > 0){
            var maxOrder = turns.reduce( (max, obj) => {
                return obj.order > max ? obj.order : max;
              }, turns[0].order);
            body.order = maxOrder +1;
        }
       }
        newTask = this.turnRepo.create(body);
    return this.turnRepo.save(newTask);
    }
    

    async update(id: any, body:any){
        const [task] = await this.findTurnById(id);
        this.turnRepo.merge(task, body);
        return this.turnRepo.save(task);
    }

    async delete(id: number){
        let count = 1;
        await this.turnRepo.delete(id);
        const turns = await this.findAll();
        if(turns.length > 0 ){
            for (const turn of turns) {
                turn.order = count++
            };
            for (const turn of turns) {
                await this.create(turn, true);
            }
        }
        return true;
    }





}

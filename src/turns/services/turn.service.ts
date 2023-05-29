import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Turn } from '../entities/turn.entity';

@Injectable()
export class TurnService {
  constructor(@InjectRepository(Turn) private turnRepo: Repository<Turn>) {}

  async findAll() {
    return await this.turnRepo.find({ order: { order: 'ASC' } });
  }

  async findTurnById(id: number) {
    return await this.turnRepo.find({ where: { id: id } });
  }

  async orderCreate(body: Turn[]) {
    await this.turnRepo.clear();
    for (const turn of body) {
      await this.create(turn, true);
    }
    return true;
  }

  async create(body: Turn, isDelete: boolean) {
    if (!isDelete) {
      const turns = await this.findAll();
      if (turns.length === 0) {
        body.order = 1;
        body.date_register = new Date();
      }
      if (turns.length > 0) {
        body.order = this.maxOrder(turns) + 1;
        let maxDate = this.maxDate(turns);
        body.date_register = new Date(maxDate.getTime() + 20 * 60000);
      }
    }
    return this.turnRepo.save(this.turnRepo.create(body));
  }

  private maxOrder(turns: Turn[]) {
    return turns.reduce((max, obj) => {
      return obj.order > max ? obj.order : max;
    }, turns[0].order);
  }

  private maxDate(turns: Turn[]) {
    return turns.reduce((max, obj) => {
      return obj.date_register > max ? obj.date_register : max;
    }, turns[0].date_register);
  }

  async update(id: any, body: any) {
    const [originalTurn] = await this.findTurnById(id);
    this.turnRepo.merge(originalTurn, body);
    return this.turnRepo.save(originalTurn);
  }

  async delete(id: number) {
    let count = 1;
    const turnsIniitial = await this.findAll();
    const deleteTurn = turnsIniitial.find((element) => (element.id === id));
    var posicionDeleteTurn = turnsIniitial.indexOf(deleteTurn);
    await this.turnRepo.delete(id);
    const turns = await this.findAll();
    if (turns.length > 0) {
      for (const turn of turns) {
        turn.order = count++;
      }
      let countTime = 0;
      for (const turn of turns.slice(posicionDeleteTurn)) {
        turn.date_register = new Date(
          deleteTurn.date_register.getTime() + ((countTime += 20) * 60000),
        );
        await this.update(turn.id, turn);
      }
    }
    return true;
  }
}

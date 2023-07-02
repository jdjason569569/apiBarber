import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Turn } from '../entities/turn.entity';
import { NotificationService } from 'src/utilityServices/notification.service';
import { Customer } from 'src/customers/entities/customers.entity';
import { users } from 'src/user/entities/users.entity';
import { CustomerService } from 'src/customers/services/customers.service';

@Injectable()
export class TurnService {
  constructor(
    @InjectRepository(Turn) private turnRepo: Repository<Turn>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
    private serviceCustomer: CustomerService,
    private notificationsService: NotificationService,
  ) {}

  async findAll() {
    return await this.turnRepo.find({ order: { order: 'ASC' } });
  }

  async getAllTurnCustomer() {
    return await this.turnRepo.find({
      relations: ['customer'],
      order: { order: 'ASC' }
    });
  }

  async findTurnById(id: number) {
    return await this.turnRepo.find({ where: { id: id } });
  }

  async orderCreate(body: Turn[], newIndex: number) {
    try {
      let countTime = 0;
      body[newIndex].date_register = body[newIndex + 1].date_register;
      const dateInitial = new Date(body[newIndex].date_register);
      await this.update(body[newIndex].id, body[newIndex]);
      body[newIndex].date_register = dateInitial;
      //this.notificationsService.sendEmail(body[newIndex], 'turnChange');

      let indexAdd = newIndex + 1;

      for (const turn of body.slice(indexAdd)) {
        turn.date_register = new Date(
          dateInitial.getTime() + (countTime += 20) * 60000,
        );
        //this.notificationsService.sendEmail(turn, 'turnChange');
        await this.update(turn.id, turn);
        indexAdd++;
      }
    } catch (error) {
      console.log(error);
    }
    return true;
  }

  async create(body: Turn, method: string) {
    let responseCustomer = null;
    if (method === 'turnCustomer') {
      const customer = new Customer();
      customer.name = body.customer.name;
      customer.email = body.customer.email;

      const user = new users();
      user.id_users = body.customer.user.id_users;
      customer.user = user;
      responseCustomer = await this.customerRepo.save(customer);
    } else {
      responseCustomer = await this.serviceCustomer.findCustomerByEmail(
        body.customer.email,
      );
    }

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
    const turn = new Turn();
    turn.completed = false;
    turn.order = body.order;
    turn.date_register = body.date_register;
    turn.customer = responseCustomer;
    await this.notificationsService.sendEmail(body, 'new');
    return this.turnRepo.save(turn);
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
    originalTurn.order = body.order;
    originalTurn.date_register = body.date_register;
    return this.turnRepo.save(originalTurn);
  }

  async delete(id: number) {
    let count = 1;
    const turnsIniitial = await this.findAll();
    const deleteTurn = turnsIniitial.find((element) => element.id === id);
    this.notificationsService.sendEmail(deleteTurn, 'deleteTurnNotification');
    var posicionDeleteTurn = turnsIniitial.indexOf(deleteTurn);
    await this.turnRepo.delete(id);
    const turns = await this.findAll();
    if (turns.length > 0) {
      for (const turn of turns) {
        turn.order = count++;
      }
      let countTime = -20;
      for (const turn of turns.slice(posicionDeleteTurn)) {
        turn.date_register = new Date(
          deleteTurn.date_register.getTime() + (countTime += 20) * 60000,
        );
        this.notificationsService.sendEmail(turn, 'deleteTurn');
        await this.update(turn.id, turn);
        posicionDeleteTurn++;
      }
    }
    return true;
  }

  async postpone(body: Turn[]) {
    try {
      for (const turn of body) {
        turn.date_register = new Date(turn.date_register);
        turn.date_register.setMinutes(turn.date_register.getMinutes() + 10);
        this.notificationsService.sendEmail(turn, 'turnPostpone');
        await this.update(turn.id, turn);
      }
    } catch (error) {
      console.log(error);
    }
    return true;
  }
}

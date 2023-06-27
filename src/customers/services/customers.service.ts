import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationService } from 'src/utilityServices/notification.service';
import { Customer } from '../entities/Customers.entity';
import { users } from 'src/user/entities/users.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
    private notificationsService: NotificationService,
  ) {}

  findAll() {
    return this.customerRepo.find();
  }

  async findCustomerByEmail(email: string): Promise<Customer> {
    return this.customerRepo.findOne({ where: { email: email } });
  }

  findUser(id: string): Promise<Customer> {
    return this.customerRepo.findOne({ where: { id_customer: +id } });
  }

  async create(body: Customer) {
    try {
      return await this.customerRepo.save(this.customerRepo.create(body));
    } catch (error) {
      console.error('Error al crear el cliente:', error);
      throw new Error('No se pudo crear el cliente');
    }
  }

  async update(id: any, body: any) {
    // const user = await this.userRepo.findOne(id);
    // this.userRepo.merge(user, body);
    // return this.userRepo.save(user);
  }

  async delete(id: number) {
    // await this.userRepo.delete(id);
    // return true;
  }
}

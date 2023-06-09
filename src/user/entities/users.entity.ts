import { Customer } from 'src/customers/entities/customers.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class users {
  @PrimaryGeneratedColumn()
  id_users: number;

  @Column()
  register: Date;

  @Column()
  id_firebase: string;

  @Column()
  email: string;

  @OneToMany(() => Customer, (customer) => customer.user)
  customers : Customer[];
  

}

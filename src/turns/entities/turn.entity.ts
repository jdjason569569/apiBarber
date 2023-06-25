import { Customer } from 'src/customers/entities/customers.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Turn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  completed: boolean;

  @Column()
  date_register: Date;

  @Column()
  order: number;


  @OneToOne(() => Customer)
  @JoinColumn({name: 'id_customer'})
  customer: Customer;
}

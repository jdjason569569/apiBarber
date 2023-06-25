import { Turn } from 'src/turns/entities/turn.entity';
import { users } from 'src/user/entities/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id_customer: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @ManyToOne(() => users, (user)=>user.customers)
  @JoinColumn({name: 'id_users'})
  user: users

  @OneToOne(() => Turn, (turn)=> turn.customer)
  turn: Turn;
}

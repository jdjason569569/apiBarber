import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id_customer: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  id_users: number;
}

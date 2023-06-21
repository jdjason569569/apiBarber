import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Turn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: false})
  completed: boolean;

  @Column()
  date_register: Date;

  @Column()
  order: number;

  @Column()
  id_users: number;

  @Column()
  id_customer: number;

}
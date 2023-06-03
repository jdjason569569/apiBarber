import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Turn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({default: false})
  completed: boolean;

  @Column()
  date_register: Date;

  @Column()
  order: number;

}
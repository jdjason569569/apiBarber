import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Turn {
  @PrimaryGeneratedColumn()
  id_turn: number;

  @Column()
  name: string;

  @Column({default: false})
  completed: boolean;


}
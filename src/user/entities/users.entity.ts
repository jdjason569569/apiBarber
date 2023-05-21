import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
  

}

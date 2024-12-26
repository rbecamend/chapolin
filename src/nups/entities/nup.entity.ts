import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('nups_tb')
export class Nup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true, length: 20 })
  nup: string;

  @Column({ default: false })
  cadastrado: boolean;

  @CreateDateColumn()
  createdAt: Date;
}

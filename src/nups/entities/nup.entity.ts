import { Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn } from "typeorm";

@Entity()
export class Nup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique:true })
  nup: string;

  @Column({ nullable: false })
  orgaoJulgador: string;

  @Column({ default: false })
  cadastrado: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

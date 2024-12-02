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
  orgao_julgador: string;

  @Column({ default: false })
  estado: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

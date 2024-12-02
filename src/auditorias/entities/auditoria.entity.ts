import { Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn, OneToOne, JoinColumn } from "typeorm";
import { Nup } from "../../nups/entities/nup.entity";

@Entity()
export class Auditoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @OneToOne(() => Nup)
  @JoinColumn({ name: 'id' })
  nup_id: Nup;

  @Column({ default: false })
  wasRegistered: boolean;

  @Column({ default: false })
  wasSucceded: boolean;

  @Column()
  mensagem: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";
import { UserAuth } from "./UserAuth";

@Entity()
class LoanAccountPassword {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @ManyToOne((type) => UserAuth)
  user: UserAuth;

  @Column()
  creditor_name: string;

  @Column()
  website: string;

  @Column()
  user_name: string;

  @Column()
  password: string;

  @Column()
  loan_amount: number;

  @Column()
  payment_date: string;

  @Column()
  account_nick_name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default LoanAccountPassword;

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
class CreditCardPassword {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @ManyToOne((type) => UserAuth)
  user: UserAuth;

  @Column()
  credit_card_name: string;

  @Column()
  website: string;

  @Column()
  user_name: string;

  @Column()
  password: string;

  @Column()
  credit_card_number: number;

  @Column()
  payment_date: string;

  @Column()
  account_nick_name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default CreditCardPassword;

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserAuth } from "./UserAuth";

@Entity()
class BankAccountPassword {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @ManyToOne((type) => UserAuth)
  user: UserAuth;

  @Column()
  bank_name: string;

  @Column()
  website: string;

  @Column()
  user_name: string;

  @Column()
  password: string;

  @Column()
  account_number: number;

  @Column()
  routing: string;

  @Column()
  account_nick_name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default BankAccountPassword;

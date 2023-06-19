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
class MerchantAccountPassword {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @ManyToOne((type) => UserAuth)
  user: UserAuth;

  @Column()
  merchant_name: string;

  @Column()
  website: string;

  @Column()
  user_name: string;

  @Column()
  password: string;

  @Column()
  account_number: number;

  @Column()
  account_nick_name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default MerchantAccountPassword;

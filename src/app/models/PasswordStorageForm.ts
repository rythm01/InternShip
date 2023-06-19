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
class PasswordStorage {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @ManyToOne((type) => UserAuth)
  user: UserAuth;

  @Column()
  website: string;

  @Column()
  user_name: string;

  @Column()
  password: string;

  @Column()
  account_nick_name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default PasswordStorage;

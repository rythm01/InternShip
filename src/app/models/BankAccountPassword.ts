import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { UserAuth } from "./UserAuth";
import { UserProfile } from "./UserProfile";

@Entity()
class BankAccountPassword {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @ManyToOne(() => UserProfile, (userProfile) => userProfile.id)
  @JoinColumn({ name: "userProfileId" })
  userProfile: UserProfile;

  @Column()
  bank_name: string;

  @Column()
  website: string;

  @Column()
  user_name: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  account_number: string;

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

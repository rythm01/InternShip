import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  JoinColumn,
} from "typeorm";
import { UserAuth } from "./UserAuth";
import { UserProfile } from "./UserProfile";

@Entity()
class LoanAccountPassword {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserProfile, (userProfile) => userProfile.id)
  @JoinColumn({ name: "userProfileId" })
  userProfile: UserProfile;

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

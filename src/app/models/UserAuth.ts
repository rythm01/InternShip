import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";

import { UserProfile } from "./UserProfile";

@Entity()
export class UserAuth {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  is2fa: boolean;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isStaff: boolean;

  @CreateDateColumn()
  dateJoined: Date;

  @Column({ nullable: true })
  lastLogin: Date;

  @Column({ nullable: true, default: false })
  isSuperUser: boolean;

  @OneToOne(() => UserProfile, (userProfile) => userProfile.userAuth)
  userProfile: UserProfile;

  @Column({ nullable: true })
  generatedOTP: string;

  @Column({ nullable: true })
  otpExpiresIn: Date;
}

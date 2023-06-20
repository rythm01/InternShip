import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";

import { UserAuth } from "./UserAuth";

import File from "./File";
import Folder from "./Folder";
import Plan from "./plans";
import BankAccountPassword from "./BankAccountPassword";

@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  location: string;

  @Column({ nullable: true })
  stripeCustomer: string;

  @Column({ nullable: true })
  storage: string;

  @Column({ nullable: true })
  storageLeft: string;

  @Column({ nullable: true })
  profilePicture: string;

  @Column({ nullable: true })
  profilePictureKey: string;

  // One-to-one relationship with Plan entity
  @ManyToOne(() => Plan, (plan) => plan.user)
  @JoinColumn()
  plan: Plan;

  @CreateDateColumn()
  dateJoined: Date;

  @OneToMany((type) => File, (file) => file.user)
  files: File[];

  @OneToMany((type) => Folder, (folder) => folder.user)
  folders: Folder[];

  @Column()
  verficationPeriod: string;

  @OneToOne(() => UserAuth, (userAuth) => userAuth.userProfile)
  @JoinColumn()
  userAuth: UserAuth;
}

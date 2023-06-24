import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinColumn,
} from "typeorm";
import { UserProfile } from "./UserProfile";
import File from "./File";
import Buddy from "./Buddies";

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserProfile, (userProfile) => userProfile.id)
  @JoinColumn({ name: "userProfileId" })
  userProfile: UserProfile;

  @ManyToOne(() => File, (file) => file.id)
  @JoinColumn({ name: "fileId" })
  file: File;

  @ManyToOne(() => Buddy, (buddy) => buddy.id)
  @JoinColumn({ name: "buddyId" })
  buddy: Buddy;

  @Column({ default: false })
  canRead: boolean;

  @Column({ default: false })
  canWrite: boolean;

  @Column({ default: false })
  canShare: boolean;

  @Column({ type: "date", nullable: true })
  timeReleaseDate: Date;

  @Column({ type: "timestamp", nullable: true })
  instantReleaseDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

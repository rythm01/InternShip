import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { UserProfile } from './UserProfile';
import File from './File';
import { UserAuth } from './UserAuth';



@Entity()
export class FilePermission {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => File)
    file: File;

    @ManyToMany(type => UserAuth)
    user: UserAuth;

    @Column()
    can_read: boolean;

    @Column()
    can_write: boolean;

    @Column()
    can_share: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ nullable: true })
    time_release_sharing: boolean;

    @Column()
    immediate_sharing: boolean;
}

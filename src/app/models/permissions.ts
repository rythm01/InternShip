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
import BankAccountPassword from "./BankAccountPassword";
import CreditCardPassword from "./CreditCardPassword";
import LoanAccountPassword from "./LoanAccountPassword";
import MerchantAccountPassword from "./MerchantAccountPassword";
import MiscPasswordStorage from "./MiscPasswordForm";
import PasswordStorage from "./PasswordStorageForm";
import RecipeForm from "./RecipeForm";
import File from "./File";
import Buddy from "./Buddies";
import { UserAuth } from "./UserAuth";

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserAuth, (userAuth) => userAuth.id)
  @JoinColumn({ name: "userAuth" })
  userAuth: UserAuth;

  @ManyToOne(() => File, (file) => file.id, { nullable: true })
  @JoinColumn({ name: "fileId" })
  file: File;

  @ManyToOne(() => BankAccountPassword, (bank) => bank.id, { nullable: true })
  @JoinColumn({ name: "bankId" })
  bankAccountId: BankAccountPassword;

  @ManyToOne(() => CreditCardPassword, (creditCard) => creditCard.id, {
    nullable: true,
  })
  @JoinColumn({ name: "creditCardId" })
  creditCardId: CreditCardPassword;

  @ManyToOne(() => LoanAccountPassword, (loan) => loan.id, { nullable: true })
  @JoinColumn({ name: "loanId" })
  loanAccountId: LoanAccountPassword;

  @ManyToOne(() => MerchantAccountPassword, (merchant) => merchant.id, {
    nullable: true,
  })
  @JoinColumn({ name: "merchantId" })
  merchantAccountId: MerchantAccountPassword;

  @ManyToOne(() => PasswordStorage, (password) => password.id, {
    nullable: true,
  })
  @JoinColumn({ name: "passwordId" })
  passwordStorageId: PasswordStorage;

  @ManyToOne(() => MiscPasswordStorage, (misc) => misc.id, { nullable: true })
  @JoinColumn({ name: "miscId" })
  miscAccountId: MiscPasswordStorage;

  @ManyToOne(() => RecipeForm, (recipe) => recipe.id, { nullable: true })
  @JoinColumn({ name: "recipeId" })
  recipeAccountId: RecipeForm;

  @ManyToOne(() => UserAuth, (userAuth) => userAuth.id)
  @JoinColumn({ name: "buddyId" })
  buddy: UserAuth;

  @Column({ nullable: true })
  form_type: string;

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

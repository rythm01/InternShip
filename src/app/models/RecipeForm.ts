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
class RecipeForm {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserProfile, (userProfile) => userProfile.id)
  @JoinColumn({ name: "userProfileId" })
  userProfile: UserProfile;

  @Column()
  recipe_name: string;

  @Column()
  ingredient_one: string;

  @Column()
  ingredient_one_amount: string;

  @Column()
  ingredient_one_amount_type: string;

  @Column()
  ingredient_two: string;

  @Column()
  ingredient_two_amount: string;

  @Column()
  ingredient_two_amount_type: string;

  @Column()
  ingredient_three: string;

  @Column()
  ingredient_three_amount: string;

  @Column()
  ingredient_three_amount_type: string;

  @Column()
  ingredient_four: string;

  @Column()
  ingredient_four_amount: string;

  @Column()
  ingredient_four_amount_type: string;

  @Column()
  ingredient_five: string;

  @Column()
  ingredient_five_amount: string;

  @Column()
  ingredient_five_amount_type: string;

  @Column()
  ingredient_six: string;

  @Column()
  ingredient_six_amount: string;

  @Column()
  ingredient_six_amount_type: string;

  @Column()
  ingredient_seven: string;

  @Column()
  ingredient_seven_amount: string;

  @Column()
  ingredient_seven_amount_type: string;

  @Column()
  cooking_description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default RecipeForm;

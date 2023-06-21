import { Response } from "express";
import { Request } from "../../../../utils/@types";
import bcrypt from "bcrypt";
import { AppDataSource } from "../../../../config";
import { UserProfile } from "../../../models/UserProfile";
import CreditCardPassword from "../../../models/CreditCardPassword";

const CreditCardRepo = AppDataSource.getRepository(CreditCardPassword);
const UserProfileRepo = AppDataSource.getRepository(UserProfile);

export const creditCardController = {
  postCreditCard: async (req: Request, res: Response, next: any) => {
    try {
      const {
        credit_card_name,
        website,
        user_name,
        password,
        credit_card_number,
        payment_date,
        account_nick_name,
      } = req.body;
      const requiredFields = [
        "credit_card_name",
        "website",
        "user_name",
        "password",
        "credit_card_number",
        "payment_date",
        "account_nick_name",
      ];

      for (let i = 0; i < requiredFields.length; i++) {
        if (!req.body[requiredFields[i]]) {
          return res.status(400).send({
            code: 400,
            message: "Please fill all required fields " + requiredFields[i],
          });
        }
      }

      const userProfile = await UserProfileRepo.createQueryBuilder(
        "userProfile"
      )
        .innerJoinAndSelect("userProfile.userAuth", "UserAuth")
        .where("userProfile.userAuth = :id", { id: req.user })
        .getOne();

      const newCreditCard = new CreditCardPassword();
      newCreditCard.userProfile = userProfile?.id as any;
      newCreditCard.credit_card_name = credit_card_name;
      newCreditCard.website = website;
      newCreditCard.user_name = user_name;
      newCreditCard.password = bcrypt.hashSync(password, 10);
      newCreditCard.credit_card_number = credit_card_number;
      newCreditCard.payment_date = payment_date;
      newCreditCard.account_nick_name = account_nick_name;

      await CreditCardRepo.save(newCreditCard);

      return res.status(200).json({
        message: "Credit Card saved Successfully",
      });
    } catch (error) {
      next(error);
    }
  },

  getCreditCard: async (req: Request, res: Response, next: any) => {
    try {
      const userProfile = await UserProfileRepo.createQueryBuilder(
        "userProfile"
      )
        .innerJoinAndSelect("userProfile.userAuth", "UserAuth")
        .where("userProfile.userAuth = :id", { id: req.user })
        .getOne();

      if (!userProfile) {
        return res
          .status(200)
          .json({ success: false, message: "No credit cards to display" });
      }
      const isCreditCard = await CreditCardRepo.createQueryBuilder("creditCard")
        .where("creditCard.userProfile = :userProfile", {
          userProfile: userProfile?.id,
        })
        .getMany();

      if (!isCreditCard) {
        return res.status(400).json({
          message: "No credit cards attached",
        });
      }

      return res.status(200).send({
        message: "Success",
        data: isCreditCard,
      });
    } catch (error) {
      next(error);
    }
  },
};

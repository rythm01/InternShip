import { Response } from "express";
import { Request } from "../../../../utils/@types";
import BankAccountPassword from "../../../models/BankAccountPassword";
import bcrypt from "bcrypt";
import { AppDataSource } from "../../../../config";
import { UserAuth } from "../../../models/UserAuth";
import { UserProfile } from "../../../models/UserProfile";

const BankAccountRepo = AppDataSource.getRepository(BankAccountPassword);
const UserRepo = AppDataSource.getRepository(UserAuth);
const UserProfileRepo = AppDataSource.getRepository(UserProfile);

export const bankAccountController = {
  postBankAccount: async (req: Request, res: Response, next: any) => {
    try {
      const {
        bank_name,
        website,
        user_name,
        password,
        account_number,
        routing,
        account_nick_name,
      } = req.body;
      const requiredFields = [
        "bank_name",
        "website",
        "user_name",
        "password",
        "account_number",
        "routing",
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

      const newBankAccount = new BankAccountPassword();
      newBankAccount.userProfile = userProfile?.id as any;
      newBankAccount.bank_name = bank_name;
      newBankAccount.website = website;
      newBankAccount.user_name = user_name;
      newBankAccount.password = bcrypt.hashSync(password, 10);
      newBankAccount.account_number = account_number;
      newBankAccount.routing = routing;
      newBankAccount.account_nick_name = account_nick_name;

      await BankAccountRepo.save(newBankAccount);

      return res.status(200).json({
        message: "Account saved Successfully",
      });
    } catch (error) {
      next(error);
    }
  },

  getBankAccount: async (req: Request, res: Response, next: any) => {
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
          .json({ success: false, message: "No Bank Account to display" });
      }
      const isBankAccount = await BankAccountRepo.createQueryBuilder(
        "bankAccount"
      )
        .where("bankAccount.userProfile = :userProfile", {
          userProfile: userProfile?.id,
        })
        .getMany();

      if (!isBankAccount) {
        return res.status(400).json({
          message: "No bank account attached",
        });
      }

      return res.status(200).send({
        message: "Success",
        data: isBankAccount,
      });
    } catch (error) {
      next(error);
    }
  },
};

import { Response } from "express";
import { Request } from "../../../../utils/@types";
import bcrypt from "bcrypt";
import { AppDataSource } from "../../../../config";
import { UserProfile } from "../../../models/UserProfile";
import MerchantAccountPassword from "../../../models/MerchantAccountPassword";

const MerchantAccountPasswordRepo = AppDataSource.getRepository(
  MerchantAccountPassword
);
const UserProfileRepo = AppDataSource.getRepository(UserProfile);

export const merchantAccountController = {
  postMerchantAccount: async (req: Request, res: Response, next: any) => {
    try {
      const {
        merchant_name,
        website,
        user_name,
        password,
        account_number,
        account_nick_name,
      } = req.body;
      const requiredFields = [
        "merchant_name",
        "website",
        "user_name",
        "password",
        "account_number",
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

      const newLoanAccount = new MerchantAccountPassword();
      newLoanAccount.userProfile = userProfile?.id as any;
      newLoanAccount.merchant_name = merchant_name;
      newLoanAccount.website = website;
      newLoanAccount.user_name = user_name;
      newLoanAccount.password = bcrypt.hashSync(password, 10);
      newLoanAccount.account_number = account_number;
      newLoanAccount.account_nick_name = account_nick_name;

      await MerchantAccountPasswordRepo.save(newLoanAccount);

      return res.status(200).json({
        message: "Merchant Account saved Successfully",
      });
    } catch (error) {
      next(error);
    }
  },

  getMerchantAccount: async (req: Request, res: Response, next: any) => {
    try {
      const userProfile = await UserProfileRepo.createQueryBuilder(
        "userProfile"
      )
        .innerJoinAndSelect("userProfile.userAuth", "UserAuth")
        .where("userProfile.userAuth = :id", { id: req.user })
        .getOne();

      if (!userProfile) {
        return res.status(200).json({
          success: false,
          message: "No merchant account forms to display",
        });
      }
      const isMerchantAccount =
        await MerchantAccountPasswordRepo.createQueryBuilder("merchantAccount")
          .where("merchantAccount.userProfile = :userProfile", {
            userProfile: userProfile?.id,
          })
          .getMany();

      if (!isMerchantAccount) {
        return res.status(400).json({
          message: "No merchant account forms attached",
        });
      }

      return res.status(200).send({
        message: "Success",
        data: isMerchantAccount,
      });
    } catch (error) {
      next(error);
    }
  },
};

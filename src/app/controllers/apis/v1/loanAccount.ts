import { Response } from "express";
import { Request } from "../../../../utils/@types";
import bcrypt from "bcrypt";
import { AppDataSource } from "../../../../config";
import { UserProfile } from "../../../models/UserProfile";
import LoanAccountPassword from "../../../models/LoanAccountPassword";

const LoanAccountPasswordRepo =
  AppDataSource.getRepository(LoanAccountPassword);
const UserProfileRepo = AppDataSource.getRepository(UserProfile);

export const loanAccountController = {
  postLoanAccount: async (req: Request, res: Response, next: any) => {
    try {
      const {
        creditor_name,
        website,
        user_name,
        password,
        loan_amount,
        payment_date,
        account_nick_name,
      } = req.body;
      const requiredFields = [
        "creditor_name",
        "website",
        "user_name",
        "password",
        "loan_amount",
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

      const newLoanAccount = new LoanAccountPassword();
      newLoanAccount.userProfile = userProfile?.id as any;
      newLoanAccount.creditor_name = creditor_name;
      newLoanAccount.website = website;
      newLoanAccount.user_name = user_name;
      newLoanAccount.password = bcrypt.hashSync(password, 10);
      newLoanAccount.loan_amount = loan_amount;
      newLoanAccount.payment_date = payment_date;
      newLoanAccount.account_nick_name = account_nick_name;

      await LoanAccountPasswordRepo.save(newLoanAccount);

      return res.status(200).json({
        message: "Loan Account saved Successfully",
      });
    } catch (error) {
      next(error);
    }
  },

  getLoanAccount: async (req: Request, res: Response, next: any) => {
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
          message: "No loan account forms to display",
        });
      }
      const isLoanAccount = await LoanAccountPasswordRepo.createQueryBuilder(
        "loanAccount"
      )
        .where("loanAccount.userProfile = :userProfile", {
          userProfile: userProfile?.id,
        })
        .getMany();

      if (!isLoanAccount) {
        return res.status(400).json({
          message: "No loan account forms attached",
        });
      }

      return res.status(200).send({
        message: "Success",
        data: isLoanAccount,
      });
    } catch (error) {
      next(error);
    }
  },

  deleteLoanAccount: async (req: Request, res: Response, next: any) => {
    try {
      const { id } = req.params;
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
      const isLoanAccount = await LoanAccountPasswordRepo.createQueryBuilder(
        "loanAccount"
      )
        .innerJoin("loanAccount.userProfile", "userProfile")
        .where("loanAccount.id = :id", { id: id })
        .andWhere("userProfile.id = :userProfileId", {
          userProfileId: userProfile.id,
        })
        .getOne();

      if (!isLoanAccount) {
        return res.status(400).json({
          message: "No records found",
        });
      }

      await LoanAccountPasswordRepo.delete({ id: parseInt(id) });

      return res.status(200).send({
        message: "Delete Successfull",
      });
    } catch (error) {
      next(error);
    }
  },

  getBankAccountDetailsById: async (req: Request, res: Response, next: any) => {
    try {
      const { id } = req.params;
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

      const isLoanAccount = await LoanAccountPasswordRepo.createQueryBuilder(
        "loanAccount"
      )
        .where("loanAccount.userProfile = :userProfile", {
          userProfile: userProfile?.id,
        })
        .andWhere("loanAccount.id = :id", { id: id })
        .getOne();

      if (!isLoanAccount) {
        return res.status(400).json({
          message: "No data found",
        });
      }

      return res.status(200).send({
        message: "Success",
        data: isLoanAccount,
      });
    } catch (error) {
      next(error);
    }
  },

  updateBankAccountDetailsById: async (
    req: Request,
    res: Response,
    next: any
  ) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const requiredFields = [
        "creditor_name",
        "website",
        "user_name",
        "password",
        "loan_amount",
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

      if (!userProfile) {
        return res
          .status(200)
          .json({ success: false, message: "No data found" });
      }

      const isLoanAccount = await LoanAccountPasswordRepo.createQueryBuilder(
        "loanAccount"
      )
        .where("loanAccount.userProfile = :userProfile", {
          userProfile: userProfile?.id,
        })
        .andWhere("loanAccount.id = :id", { id: id })
        .getOne();

      if (!isLoanAccount) {
        return res.status(400).json({
          message: "No data found",
        });
      }
      isLoanAccount.creditor_name = data?.creditor_name;
      isLoanAccount.website = data?.website;
      isLoanAccount.user_name = data?.user_name;
      isLoanAccount.password = data?.password;
      isLoanAccount.loan_amount = data?.loan_amount;
      isLoanAccount.payment_date = data?.payment_date;
      isLoanAccount.account_nick_name = data?.account_nick_name;

      await LoanAccountPasswordRepo.save(isLoanAccount);

      return res.status(200).send({
        message: " Updated successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};

import { Response } from "express";
import { Request } from "../../../../utils/@types";
import BankAccountPassword from "../../../models/BankAccountPassword";
import bcrypt from "bcrypt";
import { AppDataSource } from "../../../../config";
import { UserAuth } from "../../../models/UserAuth";

const BankAccountRepo = AppDataSource.getRepository(BankAccountPassword);
const UserRepo = AppDataSource.getRepository(UserAuth);

export const bankAccountController = {
  postBankAccount: async (req: Request, res: Response, next: any) => {
    try {
      const {
        bank_name,
        website,
        user_id,
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
        "user_id",
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

      const findUser = await UserRepo.findOne({
        where: {
          id: user_id,
        },
      });

      const newBankAccount = new BankAccountPassword();
      newBankAccount.user = findUser?.id as any;
      newBankAccount.bank_name = bank_name;
      newBankAccount.website = website;
      newBankAccount.user_name = user_name;
      newBankAccount.password = bcrypt.hashSync(password, 10);
      newBankAccount.account_number = account_number;
      newBankAccount.routing = routing;
      newBankAccount.account_nick_name = account_nick_name;

      await BankAccountRepo.save(newBankAccount);

      res.status(200).json({
        message: "Account saved Successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};

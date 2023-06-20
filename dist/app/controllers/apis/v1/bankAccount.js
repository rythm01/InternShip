"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bankAccountController = void 0;
const BankAccountPassword_1 = __importDefault(require("../../../models/BankAccountPassword"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../../../../config");
const UserAuth_1 = require("../../../models/UserAuth");
const BankAccountRepo = config_1.AppDataSource.getRepository(BankAccountPassword_1.default);
const UserRepo = config_1.AppDataSource.getRepository(UserAuth_1.UserAuth);
exports.bankAccountController = {
    postBankAccount: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { bank_name, website, user_id, user_name, password, account_number, routing, account_nick_name, } = req.body;
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
            const findUser = yield UserRepo.findOne({
                where: {
                    id: user_id,
                },
            });
            const newBankAccount = new BankAccountPassword_1.default();
            newBankAccount.user = findUser === null || findUser === void 0 ? void 0 : findUser.id;
            newBankAccount.bank_name = bank_name;
            newBankAccount.website = website;
            newBankAccount.user_name = user_name;
            newBankAccount.password = bcrypt_1.default.hashSync(password, 10);
            newBankAccount.account_number = account_number;
            newBankAccount.routing = routing;
            newBankAccount.account_nick_name = account_nick_name;
            yield BankAccountRepo.save(newBankAccount);
            res.status(200).json({
                message: "Account saved Successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }),
};

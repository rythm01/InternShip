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
const config_1 = require("../../../../config");
const UserProfile_1 = require("../../../models/UserProfile");
const BankAccountRepo = config_1.AppDataSource.getRepository(BankAccountPassword_1.default);
const UserProfileRepo = config_1.AppDataSource.getRepository(UserProfile_1.UserProfile);
exports.bankAccountController = {
    postBankAccount: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { bank_name, website, user_name, password, account_number, routing, account_nick_name, } = req.body;
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
            const userProfile = yield UserProfileRepo.createQueryBuilder("userProfile")
                .innerJoinAndSelect("userProfile.userAuth", "UserAuth")
                .where("userProfile.userAuth = :id", { id: req.user })
                .getOne();
            const newBankAccount = new BankAccountPassword_1.default();
            newBankAccount.userProfile = userProfile === null || userProfile === void 0 ? void 0 : userProfile.id;
            newBankAccount.bank_name = bank_name;
            newBankAccount.website = website;
            newBankAccount.user_name = user_name;
            newBankAccount.password = password;
            newBankAccount.account_number = account_number;
            newBankAccount.routing = routing;
            newBankAccount.account_nick_name = account_nick_name;
            yield BankAccountRepo.save(newBankAccount);
            return res.status(200).json({
                message: "Account saved Successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }),
    getBankAccount: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userProfile = yield UserProfileRepo.createQueryBuilder("userProfile")
                .innerJoinAndSelect("userProfile.userAuth", "UserAuth")
                .where("userProfile.userAuth = :id", { id: req.user })
                .getOne();
            if (!userProfile) {
                return res
                    .status(200)
                    .json({ success: false, message: "No Bank Account to display" });
            }
            const isBankAccount = yield BankAccountRepo.createQueryBuilder("bankAccount")
                .where("bankAccount.userProfile = :userProfile", {
                userProfile: userProfile === null || userProfile === void 0 ? void 0 : userProfile.id,
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
        }
        catch (error) {
            next(error);
        }
    }),
    deleteBankAccount: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const userProfile = yield UserProfileRepo.createQueryBuilder("userProfile")
                .innerJoinAndSelect("userProfile.userAuth", "UserAuth")
                .where("userProfile.userAuth = :id", { id: req.user })
                .getOne();
            if (!userProfile) {
                return res
                    .status(200)
                    .json({ success: false, message: "No Bank Account to display" });
            }
            const isBankAccount = yield BankAccountRepo.createQueryBuilder("bankAccount")
                .innerJoin("bankAccount.userProfile", "userProfile")
                .where("bankAccount.id = :id", { id: id })
                .andWhere("userProfile.id = :userProfileId", {
                userProfileId: userProfile.id,
            })
                .getOne();
            if (!isBankAccount) {
                return res.status(400).json({
                    message: "No records found",
                });
            }
            yield BankAccountRepo.delete({ id: parseInt(id) });
            return res.status(200).send({
                message: "Delete Successfull",
            });
        }
        catch (error) {
            next(error);
        }
    }),
    getBankAccountDetailsById: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const userProfile = yield UserProfileRepo.createQueryBuilder("userProfile")
                .innerJoinAndSelect("userProfile.userAuth", "UserAuth")
                .where("userProfile.userAuth = :id", { id: req.user })
                .getOne();
            if (!userProfile) {
                return res
                    .status(200)
                    .json({ success: false, message: "No Bank Account to display" });
            }
            const isBankAccount = yield BankAccountRepo.createQueryBuilder("bankAccount")
                .where("bankAccount.userProfile = :userProfile", {
                userProfile: userProfile === null || userProfile === void 0 ? void 0 : userProfile.id,
            })
                .andWhere("bankAccount.id = :id", { id: id })
                .getOne();
            if (!isBankAccount) {
                return res.status(400).json({
                    message: "No bank account attached",
                });
            }
            return res.status(200).send({
                message: "Success",
                data: isBankAccount,
            });
        }
        catch (error) {
            next(error);
        }
    }),
    updateBankAccountDetailsById: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const data = req.body;
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
            const userProfile = yield UserProfileRepo.createQueryBuilder("userProfile")
                .innerJoinAndSelect("userProfile.userAuth", "UserAuth")
                .where("userProfile.userAuth = :id", { id: req.user })
                .getOne();
            if (!userProfile) {
                return res
                    .status(200)
                    .json({ success: false, message: "No Bank Account to display" });
            }
            const isBankAccount = yield BankAccountRepo.createQueryBuilder("bankAccount")
                .where("bankAccount.userProfile = :userProfile", {
                userProfile: userProfile === null || userProfile === void 0 ? void 0 : userProfile.id,
            })
                .andWhere("bankAccount.id = :id", { id: id })
                .getOne();
            if (!isBankAccount) {
                return res.status(400).json({
                    message: "No bank account attached",
                });
            }
            isBankAccount.bank_name = data === null || data === void 0 ? void 0 : data.bank_name;
            isBankAccount.website = data === null || data === void 0 ? void 0 : data.website;
            isBankAccount.user_name = data === null || data === void 0 ? void 0 : data.user_name;
            isBankAccount.password = data === null || data === void 0 ? void 0 : data.password;
            isBankAccount.account_number = data === null || data === void 0 ? void 0 : data.account_number;
            isBankAccount.account_nick_name = data === null || data === void 0 ? void 0 : data.account_nick_name;
            yield BankAccountRepo.save(isBankAccount);
            return res.status(200).send({
                message: " Updated successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }),
};

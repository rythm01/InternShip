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
exports.loanAccountController = void 0;
const config_1 = require("../../../../config");
const UserProfile_1 = require("../../../models/UserProfile");
const LoanAccountPassword_1 = __importDefault(require("../../../models/LoanAccountPassword"));
const LoanAccountPasswordRepo = config_1.AppDataSource.getRepository(LoanAccountPassword_1.default);
const UserProfileRepo = config_1.AppDataSource.getRepository(UserProfile_1.UserProfile);
exports.loanAccountController = {
    postLoanAccount: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { creditor_name, website, user_name, password, loan_amount, payment_date, account_nick_name, } = req.body;
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
            const userProfile = yield UserProfileRepo.createQueryBuilder("userProfile")
                .innerJoinAndSelect("userProfile.userAuth", "UserAuth")
                .where("userProfile.userAuth = :id", { id: req.user })
                .getOne();
            const newLoanAccount = new LoanAccountPassword_1.default();
            newLoanAccount.userProfile = userProfile === null || userProfile === void 0 ? void 0 : userProfile.id;
            newLoanAccount.creditor_name = creditor_name;
            newLoanAccount.website = website;
            newLoanAccount.user_name = user_name;
            newLoanAccount.password = password;
            newLoanAccount.loan_amount = loan_amount;
            newLoanAccount.payment_date = payment_date;
            newLoanAccount.account_nick_name = account_nick_name;
            yield LoanAccountPasswordRepo.save(newLoanAccount);
            return res.status(200).json({
                message: "Loan Account saved Successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }),
    getLoanAccount: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userProfile = yield UserProfileRepo.createQueryBuilder("userProfile")
                .innerJoinAndSelect("userProfile.userAuth", "UserAuth")
                .where("userProfile.userAuth = :id", { id: req.user })
                .getOne();
            if (!userProfile) {
                return res.status(200).json({
                    success: false,
                    message: "No loan account forms to display",
                });
            }
            const isLoanAccount = yield LoanAccountPasswordRepo.createQueryBuilder("loanAccount")
                .where("loanAccount.userProfile = :userProfile", {
                userProfile: userProfile === null || userProfile === void 0 ? void 0 : userProfile.id,
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
        }
        catch (error) {
            next(error);
        }
    }),
    deleteLoanAccount: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
            const isLoanAccount = yield LoanAccountPasswordRepo.createQueryBuilder("loanAccount")
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
            yield LoanAccountPasswordRepo.delete({ id: parseInt(id) });
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
            const isLoanAccount = yield LoanAccountPasswordRepo.createQueryBuilder("loanAccount")
                .where("loanAccount.userProfile = :userProfile", {
                userProfile: userProfile === null || userProfile === void 0 ? void 0 : userProfile.id,
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
            const userProfile = yield UserProfileRepo.createQueryBuilder("userProfile")
                .innerJoinAndSelect("userProfile.userAuth", "UserAuth")
                .where("userProfile.userAuth = :id", { id: req.user })
                .getOne();
            if (!userProfile) {
                return res
                    .status(200)
                    .json({ success: false, message: "No data found" });
            }
            const isLoanAccount = yield LoanAccountPasswordRepo.createQueryBuilder("loanAccount")
                .where("loanAccount.userProfile = :userProfile", {
                userProfile: userProfile === null || userProfile === void 0 ? void 0 : userProfile.id,
            })
                .andWhere("loanAccount.id = :id", { id: id })
                .getOne();
            if (!isLoanAccount) {
                return res.status(400).json({
                    message: "No data found",
                });
            }
            isLoanAccount.creditor_name = data === null || data === void 0 ? void 0 : data.creditor_name;
            isLoanAccount.website = data === null || data === void 0 ? void 0 : data.website;
            isLoanAccount.user_name = data === null || data === void 0 ? void 0 : data.user_name;
            isLoanAccount.password = data === null || data === void 0 ? void 0 : data.password;
            isLoanAccount.loan_amount = data === null || data === void 0 ? void 0 : data.loan_amount;
            isLoanAccount.payment_date = data === null || data === void 0 ? void 0 : data.payment_date;
            isLoanAccount.account_nick_name = data === null || data === void 0 ? void 0 : data.account_nick_name;
            yield LoanAccountPasswordRepo.save(isLoanAccount);
            return res.status(200).send({
                message: " Updated successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }),
};
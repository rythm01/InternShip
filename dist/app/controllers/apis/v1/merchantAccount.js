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
exports.merchantAccountController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../../../../config");
const UserProfile_1 = require("../../../models/UserProfile");
const MerchantAccountPassword_1 = __importDefault(require("../../../models/MerchantAccountPassword"));
const MerchantAccountPasswordRepo = config_1.AppDataSource.getRepository(MerchantAccountPassword_1.default);
const UserProfileRepo = config_1.AppDataSource.getRepository(UserProfile_1.UserProfile);
exports.merchantAccountController = {
    postMerchantAccount: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { merchant_name, website, user_name, password, account_number, account_nick_name, } = req.body;
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
            const userProfile = yield UserProfileRepo.createQueryBuilder("userProfile")
                .innerJoinAndSelect("userProfile.userAuth", "UserAuth")
                .where("userProfile.userAuth = :id", { id: req.user })
                .getOne();
            const newLoanAccount = new MerchantAccountPassword_1.default();
            newLoanAccount.userProfile = userProfile === null || userProfile === void 0 ? void 0 : userProfile.id;
            newLoanAccount.merchant_name = merchant_name;
            newLoanAccount.website = website;
            newLoanAccount.user_name = user_name;
            newLoanAccount.password = bcrypt_1.default.hashSync(password, 10);
            newLoanAccount.account_number = account_number;
            newLoanAccount.account_nick_name = account_nick_name;
            yield MerchantAccountPasswordRepo.save(newLoanAccount);
            return res.status(200).json({
                message: "Merchant Account saved Successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }),
    getMerchantAccount: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userProfile = yield UserProfileRepo.createQueryBuilder("userProfile")
                .innerJoinAndSelect("userProfile.userAuth", "UserAuth")
                .where("userProfile.userAuth = :id", { id: req.user })
                .getOne();
            if (!userProfile) {
                return res.status(200).json({
                    success: false,
                    message: "No merchant account forms to display",
                });
            }
            const isMerchantAccount = yield MerchantAccountPasswordRepo.createQueryBuilder("merchantAccount")
                .where("merchantAccount.userProfile = :userProfile", {
                userProfile: userProfile === null || userProfile === void 0 ? void 0 : userProfile.id,
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
        }
        catch (error) {
            next(error);
        }
    }),
    deleteMerchantAccount: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
            const isMerchantAccount = yield MerchantAccountPasswordRepo.createQueryBuilder("merchantAccount")
                .innerJoin("merchantAccount.userProfile", "userProfile")
                .where("merchantAccount.id = :id", { id: id })
                .andWhere("userProfile.id = :userProfileId", {
                userProfileId: userProfile.id,
            })
                .getOne();
            if (!isMerchantAccount) {
                return res.status(400).json({
                    message: "No records found",
                });
            }
            yield MerchantAccountPasswordRepo.delete({ id: parseInt(id) });
            return res.status(200).send({
                message: "Delete Successfull",
            });
        }
        catch (error) {
            next(error);
        }
    }),
    getMerchantAccountDetailsById: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
            const isMerchantAccount = yield MerchantAccountPasswordRepo.createQueryBuilder("merchantAccount")
                .where("merchantAccount.userProfile = :userProfile", {
                userProfile: userProfile === null || userProfile === void 0 ? void 0 : userProfile.id,
            })
                .andWhere("merchantAccount.id = :id", { id: id })
                .getOne();
            if (!isMerchantAccount) {
                return res.status(400).json({
                    message: "No data found",
                });
            }
            return res.status(200).send({
                message: "Success",
                data: isMerchantAccount,
            });
        }
        catch (error) {
            next(error);
        }
    }),
    updateMerchantAccountDetailsById: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const data = req.body;
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
            const userProfile = yield UserProfileRepo.createQueryBuilder("userProfile")
                .innerJoinAndSelect("userProfile.userAuth", "UserAuth")
                .where("userProfile.userAuth = :id", { id: req.user })
                .getOne();
            if (!userProfile) {
                return res
                    .status(200)
                    .json({ success: false, message: "No data found" });
            }
            const isMerchantAccount = yield MerchantAccountPasswordRepo.createQueryBuilder("merchantAccount")
                .where("merchantAccount.userProfile = :userProfile", {
                userProfile: userProfile === null || userProfile === void 0 ? void 0 : userProfile.id,
            })
                .andWhere("merchantAccount.id = :id", { id: id })
                .getOne();
            if (!isMerchantAccount) {
                return res.status(400).json({
                    message: "No data found",
                });
            }
            isMerchantAccount.merchant_name = data === null || data === void 0 ? void 0 : data.merchant_name;
            isMerchantAccount.website = data === null || data === void 0 ? void 0 : data.website;
            isMerchantAccount.user_name = data === null || data === void 0 ? void 0 : data.user_name;
            isMerchantAccount.password = data === null || data === void 0 ? void 0 : data.password;
            isMerchantAccount.account_number = data === null || data === void 0 ? void 0 : data.account_number;
            isMerchantAccount.account_nick_name = data === null || data === void 0 ? void 0 : data.account_nick_name;
            yield MerchantAccountPasswordRepo.save(isMerchantAccount);
            return res.status(200).send({
                message: " Updated successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }),
};

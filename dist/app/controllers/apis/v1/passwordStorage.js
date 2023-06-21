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
const PasswordStorageForm_1 = __importDefault(require("../../../models/PasswordStorageForm"));
const PasswordStorageRepo = config_1.AppDataSource.getRepository(PasswordStorageForm_1.default);
const UserProfileRepo = config_1.AppDataSource.getRepository(UserProfile_1.UserProfile);
exports.merchantAccountController = {
    postMerchantAccount: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { website, user_name, password, account_nick_name } = req.body;
            const requiredFields = [
                "website",
                "user_name",
                "password",
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
            const newLoanAccount = new PasswordStorageForm_1.default();
            newLoanAccount.userProfile = userProfile === null || userProfile === void 0 ? void 0 : userProfile.id;
            newLoanAccount.website = website;
            newLoanAccount.user_name = user_name;
            newLoanAccount.password = bcrypt_1.default.hashSync(password, 10);
            newLoanAccount.account_nick_name = account_nick_name;
            yield PasswordStorageRepo.save(newLoanAccount);
            return res.status(200).json({
                message: "Password Storage saved Successfully",
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
                    message: "No password storage forms to display",
                });
            }
            const isPasswordStorage = yield PasswordStorageRepo.createQueryBuilder("passwordStorage")
                .where("passwordStorage.userProfile = :userProfile", {
                userProfile: userProfile === null || userProfile === void 0 ? void 0 : userProfile.id,
            })
                .getMany();
            if (!isPasswordStorage) {
                return res.status(400).json({
                    message: "No password storage forms attached",
                });
            }
            return res.status(200).send({
                message: "Success",
                data: isPasswordStorage,
            });
        }
        catch (error) {
            next(error);
        }
    }),
};

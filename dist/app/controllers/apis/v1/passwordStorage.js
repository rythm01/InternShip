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
exports.passwordStorageController = void 0;
const config_1 = require("../../../../config");
const UserProfile_1 = require("../../../models/UserProfile");
const PasswordStorageForm_1 = __importDefault(require("../../../models/PasswordStorageForm"));
const PasswordStorageRepo = config_1.AppDataSource.getRepository(PasswordStorageForm_1.default);
const UserProfileRepo = config_1.AppDataSource.getRepository(UserProfile_1.UserProfile);
exports.passwordStorageController = {
    postPasswordStorage: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
            newLoanAccount.password = password;
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
    getPasswordStorage: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
    deletePasswordStorage: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
            const isPasswordStorage = yield PasswordStorageRepo.createQueryBuilder("passwordStorage")
                .innerJoin("passwordStorage.userProfile", "userProfile")
                .where("passwordStorage.id = :id", { id: id })
                .andWhere("userProfile.id = :userProfileId", {
                userProfileId: userProfile.id,
            })
                .getOne();
            if (!isPasswordStorage) {
                return res.status(400).json({
                    message: "No records found",
                });
            }
            yield PasswordStorageRepo.delete({ id: parseInt(id) });
            return res.status(200).send({
                message: "Delete Successfull",
            });
        }
        catch (error) {
            next(error);
        }
    }),
    getPasswordStorageDetailsById: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
            const isPasswordStorage = yield PasswordStorageRepo.createQueryBuilder("passwordStorage")
                .where("passwordStorage.userProfile = :userProfile", {
                userProfile: userProfile === null || userProfile === void 0 ? void 0 : userProfile.id,
            })
                .andWhere("passwordStorage.id = :id", { id: id })
                .getOne();
            if (!isPasswordStorage) {
                return res.status(400).json({
                    message: "No data found",
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
    updatePasswordStorageDetailsById: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const data = req.body;
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
            if (!userProfile) {
                return res
                    .status(200)
                    .json({ success: false, message: "No data found" });
            }
            const isPasswordStorage = yield PasswordStorageRepo.createQueryBuilder("passwordStorage")
                .where("passwordStorage.userProfile = :userProfile", {
                userProfile: userProfile === null || userProfile === void 0 ? void 0 : userProfile.id,
            })
                .andWhere("passwordStorage.id = :id", { id: id })
                .getOne();
            if (!isPasswordStorage) {
                return res.status(400).json({
                    message: "No data found",
                });
            }
            isPasswordStorage.website = data === null || data === void 0 ? void 0 : data.website;
            isPasswordStorage.user_name = data === null || data === void 0 ? void 0 : data.user_name;
            isPasswordStorage.password = data === null || data === void 0 ? void 0 : data.password;
            isPasswordStorage.account_nick_name = data === null || data === void 0 ? void 0 : data.account_nick_name;
            yield PasswordStorageRepo.save(isPasswordStorage);
            return res.status(200).send({
                message: " Updated successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }),
};

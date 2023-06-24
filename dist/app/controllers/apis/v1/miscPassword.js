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
exports.miscPasswordController = void 0;
const config_1 = require("../../../../config");
const UserProfile_1 = require("../../../models/UserProfile");
const MiscPasswordForm_1 = __importDefault(require("../../../models/MiscPasswordForm"));
const MiscPasswordRepo = config_1.AppDataSource.getRepository(MiscPasswordForm_1.default);
const UserProfileRepo = config_1.AppDataSource.getRepository(UserProfile_1.UserProfile);
exports.miscPasswordController = {
    postMiscPassword: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { account_name, website, user_name, password, account_number, account_nick_name, } = req.body;
            const requiredFields = [
                "account_name",
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
            const newMiscPassword = new MiscPasswordForm_1.default();
            newMiscPassword.userProfile = userProfile === null || userProfile === void 0 ? void 0 : userProfile.id;
            newMiscPassword.account_name = account_name;
            newMiscPassword.website = website;
            newMiscPassword.user_name = user_name;
            newMiscPassword.password = password;
            newMiscPassword.account_number = account_number;
            newMiscPassword.account_nick_name = account_nick_name;
            yield MiscPasswordRepo.save(newMiscPassword);
            return res.status(200).json({
                message: "Saved Successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }),
    getMiscPassword: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userProfile = yield UserProfileRepo.createQueryBuilder("userProfile")
                .innerJoinAndSelect("userProfile.userAuth", "UserAuth")
                .where("userProfile.userAuth = :id", { id: req.user })
                .getOne();
            if (!userProfile) {
                return res.status(200).json({
                    success: false,
                    message: "No misc Password forms to display",
                });
            }
            const isMiscPassword = yield MiscPasswordRepo.createQueryBuilder("miscPassword")
                .where("miscPassword.userProfile = :userProfile", {
                userProfile: userProfile === null || userProfile === void 0 ? void 0 : userProfile.id,
            })
                .getMany();
            if (!isMiscPassword) {
                return res.status(400).json({
                    message: "No misc Password forms attached",
                });
            }
            return res.status(200).send({
                message: "Success",
                data: isMiscPassword,
            });
        }
        catch (error) {
            next(error);
        }
    }),
    deleteMiscPassword: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const userProfile = yield UserProfileRepo.createQueryBuilder("userProfile")
                .innerJoinAndSelect("userProfile.userAuth", "UserAuth")
                .where("userProfile.userAuth = :id", { id: req.user })
                .getOne();
            if (!userProfile) {
                return res
                    .status(200)
                    .json({ success: false, message: "No Data to display" });
            }
            const isMiscPassword = yield MiscPasswordRepo.createQueryBuilder("miscPassword")
                .innerJoin("miscPassword.userProfile", "userProfile")
                .where("miscPassword.id = :id", { id: id })
                .andWhere("userProfile.id = :userProfileId", {
                userProfileId: userProfile.id,
            })
                .getOne();
            if (!isMiscPassword) {
                return res.status(400).json({
                    message: "No records found",
                });
            }
            yield MiscPasswordRepo.delete({ id: parseInt(id) });
            return res.status(200).send({
                message: "Delete Successfull",
            });
        }
        catch (error) {
            next(error);
        }
    }),
    getMiscPasswordDetailsById: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
            const isMiscPassword = yield MiscPasswordRepo.createQueryBuilder("miscPassword")
                .where("miscPassword.userProfile = :userProfile", {
                userProfile: userProfile === null || userProfile === void 0 ? void 0 : userProfile.id,
            })
                .andWhere("miscPassword.id = :id", { id: id })
                .getOne();
            if (!isMiscPassword) {
                return res.status(400).json({
                    message: "No data found",
                });
            }
            return res.status(200).send({
                message: "Success",
                data: isMiscPassword,
            });
        }
        catch (error) {
            next(error);
        }
    }),
    updateMiscPasswordDetailsById: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const data = req.body;
            const requiredFields = [
                "account_name",
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
            const isMiscPassword = yield MiscPasswordRepo.createQueryBuilder("miscPassword")
                .where("miscPassword.userProfile = :userProfile", {
                userProfile: userProfile === null || userProfile === void 0 ? void 0 : userProfile.id,
            })
                .andWhere("miscPassword.id = :id", { id: id })
                .getOne();
            if (!isMiscPassword) {
                return res.status(400).json({
                    message: "No data found",
                });
            }
            isMiscPassword.account_name = data === null || data === void 0 ? void 0 : data.account_name;
            isMiscPassword.website = data === null || data === void 0 ? void 0 : data.website;
            isMiscPassword.user_name = data === null || data === void 0 ? void 0 : data.user_name;
            isMiscPassword.password = data === null || data === void 0 ? void 0 : data.password;
            isMiscPassword.account_number = data === null || data === void 0 ? void 0 : data.account_number;
            isMiscPassword.account_nick_name = data === null || data === void 0 ? void 0 : data.account_nick_name;
            yield MiscPasswordRepo.save(isMiscPassword);
            return res.status(200).send({
                message: " Updated successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }),
};

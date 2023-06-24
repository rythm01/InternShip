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
exports.creditCardController = void 0;
const config_1 = require("../../../../config");
const UserProfile_1 = require("../../../models/UserProfile");
const CreditCardPassword_1 = __importDefault(require("../../../models/CreditCardPassword"));
const CreditCardRepo = config_1.AppDataSource.getRepository(CreditCardPassword_1.default);
const UserProfileRepo = config_1.AppDataSource.getRepository(UserProfile_1.UserProfile);
exports.creditCardController = {
    postCreditCard: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { credit_card_name, website, user_name, password, credit_card_number, payment_date, account_nick_name, } = req.body;
            const requiredFields = [
                "credit_card_name",
                "website",
                "user_name",
                "password",
                "credit_card_number",
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
            const newCreditCard = new CreditCardPassword_1.default();
            newCreditCard.userProfile = userProfile === null || userProfile === void 0 ? void 0 : userProfile.id;
            newCreditCard.credit_card_name = credit_card_name;
            newCreditCard.website = website;
            newCreditCard.user_name = user_name;
            newCreditCard.password = password;
            newCreditCard.credit_card_number = credit_card_number;
            newCreditCard.payment_date = payment_date;
            newCreditCard.account_nick_name = account_nick_name;
            yield CreditCardRepo.save(newCreditCard);
            return res.status(200).json({
                message: "Credit Card saved Successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }),
    getCreditCard: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userProfile = yield UserProfileRepo.createQueryBuilder("userProfile")
                .innerJoinAndSelect("userProfile.userAuth", "UserAuth")
                .where("userProfile.userAuth = :id", { id: req.user })
                .getOne();
            if (!userProfile) {
                return res
                    .status(200)
                    .json({ success: false, message: "No credit cards to display" });
            }
            const isCreditCard = yield CreditCardRepo.createQueryBuilder("creditCard")
                .where("creditCard.userProfile = :userProfile", {
                userProfile: userProfile === null || userProfile === void 0 ? void 0 : userProfile.id,
            })
                .getMany();
            if (!isCreditCard) {
                return res.status(400).json({
                    message: "No credit cards attached",
                });
            }
            return res.status(200).send({
                message: "Success",
                data: isCreditCard,
            });
        }
        catch (error) {
            next(error);
        }
    }),
    deleteCreditCard: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
            const isCreditCard = yield CreditCardRepo.createQueryBuilder("creditCard")
                .innerJoin("creditCard.userProfile", "userProfile")
                .where("creditCard.id = :id", { id: id })
                .andWhere("userProfile.id = :userProfileId", {
                userProfileId: userProfile.id,
            })
                .getOne();
            if (!isCreditCard) {
                return res.status(400).json({
                    message: "No records found",
                });
            }
            yield CreditCardRepo.delete({ id: parseInt(id) });
            return res.status(200).send({
                message: "Delete Successfull",
            });
        }
        catch (error) {
            next(error);
        }
    }),
    getCreditCardDetailsById: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
            const isCreditCard = yield CreditCardRepo.createQueryBuilder("creditCard")
                .where("creditCard.userProfile = :userProfile", {
                userProfile: userProfile === null || userProfile === void 0 ? void 0 : userProfile.id,
            })
                .andWhere("creditCard.id = :id", { id: id })
                .getOne();
            if (!isCreditCard) {
                return res.status(400).json({
                    message: "No bank account attached",
                });
            }
            return res.status(200).send({
                message: "Success",
                data: isCreditCard,
            });
        }
        catch (error) {
            next(error);
        }
    }),
    updateCreditCardById: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const data = req.body;
            const requiredFields = [
                "credit_card_name",
                "website",
                "user_name",
                "password",
                "credit_card_number",
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
                    .json({ success: false, message: "No Bank Account to display" });
            }
            const isCreditCard = yield CreditCardRepo.createQueryBuilder("creditCard")
                .where("creditCard.userProfile = :userProfile", {
                userProfile: userProfile === null || userProfile === void 0 ? void 0 : userProfile.id,
            })
                .andWhere("creditCard.id = :id", { id: id })
                .getOne();
            if (!isCreditCard) {
                return res.status(400).json({
                    message: "No bank account attached",
                });
            }
            isCreditCard.credit_card_name = data === null || data === void 0 ? void 0 : data.credit_card_name;
            isCreditCard.website = data === null || data === void 0 ? void 0 : data.website;
            isCreditCard.user_name = data === null || data === void 0 ? void 0 : data.user_name;
            isCreditCard.password = data === null || data === void 0 ? void 0 : data.password;
            isCreditCard.credit_card_number = data === null || data === void 0 ? void 0 : data.credit_card_number;
            isCreditCard.payment_date = `${new Date(data.payment_date)}`;
            isCreditCard.account_nick_name = data === null || data === void 0 ? void 0 : data.account_nick_name;
            yield CreditCardRepo.save(isCreditCard);
            return res.status(200).send({
                message: " Updated successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }),
};

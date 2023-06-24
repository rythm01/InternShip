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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipeFormController = void 0;
const config_1 = require("../../../../config");
const UserProfile_1 = require("../../../models/UserProfile");
const RecipeForm_1 = __importDefault(require("../../../models/RecipeForm"));
// import RecipeForm from "../../../models/RecipeFormForm";
const RecipeFormRepo = config_1.AppDataSource.getRepository(RecipeForm_1.default);
const UserProfileRepo = config_1.AppDataSource.getRepository(UserProfile_1.UserProfile);
exports.recipeFormController = {
    postRecipeForm: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const _a = req.body, { recipe_name } = _a, data = __rest(_a, ["recipe_name"]);
            const requiredFields = ["recipe_name"];
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
            const newRecipeForm = new RecipeForm_1.default();
            newRecipeForm.userProfile = userProfile === null || userProfile === void 0 ? void 0 : userProfile.id;
            newRecipeForm.recipe_name = data === null || data === void 0 ? void 0 : data.recipe_name;
            newRecipeForm.ingredient_one = data === null || data === void 0 ? void 0 : data.ingredient_one;
            newRecipeForm.ingredient_one_amount = data === null || data === void 0 ? void 0 : data.ingredient_one_amount;
            newRecipeForm.ingredient_one_amount_type =
                data === null || data === void 0 ? void 0 : data.ingredient_one_amount_type;
            newRecipeForm.ingredient_two = data === null || data === void 0 ? void 0 : data.ingredient_two;
            newRecipeForm.ingredient_two_amount = data === null || data === void 0 ? void 0 : data.ingredient_two_amount;
            newRecipeForm.ingredient_two_amount_type =
                data === null || data === void 0 ? void 0 : data.ingredient_two_amount_type;
            newRecipeForm.ingredient_three = data === null || data === void 0 ? void 0 : data.ingredient_three;
            newRecipeForm.ingredient_three_amount = data === null || data === void 0 ? void 0 : data.ingredient_three_amount;
            newRecipeForm.ingredient_three_amount_type =
                data === null || data === void 0 ? void 0 : data.ingredient_three_amount_type;
            newRecipeForm.ingredient_four = data === null || data === void 0 ? void 0 : data.ingredient_four;
            newRecipeForm.ingredient_four_amount = data === null || data === void 0 ? void 0 : data.ingredient_four_amount;
            newRecipeForm.ingredient_four_amount_type =
                data === null || data === void 0 ? void 0 : data.ingredient_four_amount_type;
            newRecipeForm.ingredient_five = data === null || data === void 0 ? void 0 : data.ingredient_five;
            newRecipeForm.ingredient_five_amount = data === null || data === void 0 ? void 0 : data.ingredient_five_amount;
            newRecipeForm.ingredient_five_amount_type =
                data === null || data === void 0 ? void 0 : data.ingredient_five_amount_type;
            newRecipeForm.ingredient_six = data === null || data === void 0 ? void 0 : data.ingredient_six;
            newRecipeForm.ingredient_six_amount = data === null || data === void 0 ? void 0 : data.ingredient_six_amount;
            newRecipeForm.ingredient_six_amount_type =
                data === null || data === void 0 ? void 0 : data.ingredient_six_amount_type;
            newRecipeForm.ingredient_seven_amount = data === null || data === void 0 ? void 0 : data.ingredient_seven_amount;
            newRecipeForm.ingredient_seven = data === null || data === void 0 ? void 0 : data.ingredient_seven;
            newRecipeForm.ingredient_seven_amount_type =
                data === null || data === void 0 ? void 0 : data.ingredient_seven_amount_type;
            newRecipeForm.cooking_description = data === null || data === void 0 ? void 0 : data.cooking_description;
            yield RecipeFormRepo.save(newRecipeForm);
            return res.status(200).json({
                message: "Saved Successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }),
    getRecipeForm: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userProfile = yield UserProfileRepo.createQueryBuilder("userProfile")
                .innerJoinAndSelect("userProfile.userAuth", "UserAuth")
                .where("userProfile.userAuth = :id", { id: req.user })
                .getOne();
            if (!userProfile) {
                return res.status(200).json({
                    success: false,
                    message: "No data to display",
                });
            }
            const isRecipeForm = yield RecipeFormRepo.createQueryBuilder("recipeForm")
                .where("recipeForm.userProfile = :userProfile", {
                userProfile: userProfile === null || userProfile === void 0 ? void 0 : userProfile.id,
            })
                .getMany();
            if (!isRecipeForm) {
                return res.status(400).json({
                    message: "No data attached",
                });
            }
            return res.status(200).send({
                message: "Success",
                data: isRecipeForm,
            });
        }
        catch (error) {
            next(error);
        }
    }),
    deleteRecipeForm: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
            const isRecipeForm = yield RecipeFormRepo.createQueryBuilder("recipeForm")
                .innerJoin("recipeForm.userProfile", "userProfile")
                .where("recipeForm.id = :id", { id: id })
                .andWhere("userProfile.id = :userProfileId", {
                userProfileId: userProfile.id,
            })
                .getOne();
            if (!isRecipeForm) {
                return res.status(400).json({
                    message: "No records found",
                });
            }
            yield RecipeFormRepo.delete({ id: parseInt(id) });
            return res.status(200).send({
                message: "Delete Successfull",
            });
        }
        catch (error) {
            next(error);
        }
    }),
    getRecipeFormDetailsById: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
            const isRecipeForm = yield RecipeFormRepo.createQueryBuilder("recipeForm")
                .where("recipeForm.userProfile = :userProfile", {
                userProfile: userProfile === null || userProfile === void 0 ? void 0 : userProfile.id,
            })
                .andWhere("recipeForm.id = :id", { id: id })
                .getOne();
            if (!isRecipeForm) {
                return res.status(400).json({
                    message: "No data found",
                });
            }
            return res.status(200).send({
                message: "Success",
                data: isRecipeForm,
            });
        }
        catch (error) {
            next(error);
        }
    }),
    updateRecipeFormDetailsById: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
            const isRecipeForm = yield RecipeFormRepo.createQueryBuilder("RecipeForm")
                .where("RecipeForm.userProfile = :userProfile", {
                userProfile: userProfile === null || userProfile === void 0 ? void 0 : userProfile.id,
            })
                .andWhere("RecipeForm.id = :id", { id: id })
                .getOne();
            if (!isRecipeForm) {
                return res.status(400).json({
                    message: "No data found",
                });
            }
            isRecipeForm.recipe_name = data === null || data === void 0 ? void 0 : data.recipe_name;
            isRecipeForm.ingredient_one = data === null || data === void 0 ? void 0 : data.ingredient_one;
            isRecipeForm.ingredient_one_amount = data === null || data === void 0 ? void 0 : data.ingredient_one_amount;
            isRecipeForm.ingredient_one_amount_type =
                data === null || data === void 0 ? void 0 : data.ingredient_one_amount_type;
            isRecipeForm.ingredient_two = data === null || data === void 0 ? void 0 : data.ingredient_two;
            isRecipeForm.ingredient_two_amount = data === null || data === void 0 ? void 0 : data.ingredient_two_amount;
            isRecipeForm.ingredient_two_amount_type =
                data === null || data === void 0 ? void 0 : data.ingredient_two_amount_type;
            isRecipeForm.ingredient_three = data === null || data === void 0 ? void 0 : data.ingredient_three;
            isRecipeForm.ingredient_three_amount = data === null || data === void 0 ? void 0 : data.ingredient_three_amount;
            isRecipeForm.ingredient_three_amount_type =
                data === null || data === void 0 ? void 0 : data.ingredient_three_amount_type;
            isRecipeForm.ingredient_four = data === null || data === void 0 ? void 0 : data.ingredient_four;
            isRecipeForm.ingredient_four_amount = data === null || data === void 0 ? void 0 : data.ingredient_four_amount;
            isRecipeForm.ingredient_four_amount_type =
                data === null || data === void 0 ? void 0 : data.ingredient_four_amount_type;
            isRecipeForm.ingredient_five = data === null || data === void 0 ? void 0 : data.ingredient_five;
            isRecipeForm.ingredient_five_amount = data === null || data === void 0 ? void 0 : data.ingredient_five_amount;
            isRecipeForm.ingredient_five_amount_type =
                data === null || data === void 0 ? void 0 : data.ingredient_five_amount_type;
            isRecipeForm.ingredient_six = data === null || data === void 0 ? void 0 : data.ingredient_six;
            isRecipeForm.ingredient_six_amount = data === null || data === void 0 ? void 0 : data.ingredient_six_amount;
            isRecipeForm.ingredient_six_amount_type =
                data === null || data === void 0 ? void 0 : data.ingredient_six_amount_type;
            isRecipeForm.ingredient_seven_amount = data === null || data === void 0 ? void 0 : data.ingredient_seven_amount;
            isRecipeForm.ingredient_seven = data === null || data === void 0 ? void 0 : data.ingredient_seven;
            isRecipeForm.ingredient_seven_amount_type =
                data === null || data === void 0 ? void 0 : data.ingredient_seven_amount_type;
            isRecipeForm.cooking_description = data === null || data === void 0 ? void 0 : data.cooking_description;
            yield RecipeFormRepo.save(isRecipeForm);
            return res.status(200).send({
                message: " Updated successfully",
            });
        }
        catch (error) {
            next(error);
        }
    }),
};

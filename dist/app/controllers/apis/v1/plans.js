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
exports.plansController = void 0;
const config_1 = require("../../../../config");
const plans_1 = __importDefault(require("../../../models/plans"));
const PlansRepo = config_1.AppDataSource.getRepository(plans_1.default);
exports.plansController = {
    getPlans: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const plans = yield PlansRepo.find();
            if (!plans)
                return res.status(200).json({ success: false, message: "No Plans to display" });
            return res.status(200).json({ message: "Plan successfully found", success: true, plans: plans });
        }
        catch (err) {
            console.log(err);
            return res.status(200).json({ success: false, message: "something went wrong!" });
        }
    }),
    createPlans: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { title, storage, buddies, priceMonthly, priceYearly, discount, description, fileSizeLimit, files } = req.body;
            const extPlan = yield PlansRepo.findOne({ where: { title } });
            if (extPlan)
                return res.status(200).json({ success: false, message: "Plan already exixsts." });
            var newPlan = new plans_1.default();
            newPlan.title = title;
            newPlan.storage = storage;
            newPlan.buddies = buddies;
            newPlan.priceMonthly = priceMonthly;
            newPlan.priceYearly = priceYearly;
            newPlan.discount = discount;
            newPlan.description = description;
            newPlan.fileSizeLimit = fileSizeLimit;
            newPlan.files = files;
            newPlan.addedBy = req.admin;
            const newEntity = yield PlansRepo.save(newPlan);
            return res.status(200).json({ message: "Plan successfully added", success: true, addedPlan: newEntity });
        }
        catch (err) {
            console.log(err);
            return res.status(200).json({ success: false, message: "something went wrong!" });
        }
    }),
    updatePlan: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        return res.end();
    }),
    getPlan: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const plan = yield PlansRepo.findOne({ where: { id: req.params.id } });
            if (!plan)
                return res.status(200).json({ success: false, message: "No Plans to display" });
            return res.status(200).json({ message: "Plan successfully found", success: true, plan: plan });
        }
        catch (err) {
            console.log(err);
            return res.status(200).json({ success: false, message: "something went wrong!" });
        }
    }),
    deletePlan: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        return res.end();
    }),
};

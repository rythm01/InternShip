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
exports.storageAddonController = void 0;
const config_1 = require("../../../../config");
const StorageAddon_1 = __importDefault(require("../../../models/StorageAddon"));
const StorageAddonRepo = config_1.AppDataSource.getRepository(StorageAddon_1.default);
exports.storageAddonController = {
    getStorageAddons: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const storageAddons = yield StorageAddonRepo.find();
            if (!storageAddons)
                return res.status(200).json({ success: false, message: "No StorageAddons to display" });
            return res.status(200).json({ message: "StorageAddon successfully found", success: true, storageAddons: storageAddons });
        }
        catch (err) {
            console.log(err);
            return res.status(200).json({ success: false, message: "something went wrong!" });
        }
    }),
    createStorageAddons: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { title, priceMonthly, description } = req.body;
            const extStorageAddon = yield StorageAddonRepo.findOne({ where: { title } });
            if (extStorageAddon)
                return res.status(200).json({ success: false, message: "StorageAddon already exixsts." });
            var newStorageAddon = new StorageAddon_1.default();
            newStorageAddon.title = title;
            newStorageAddon.priceMonthly = priceMonthly;
            newStorageAddon.description = description;
            newStorageAddon.addedBy = req.admin;
            const newEntity = yield StorageAddonRepo.save(newStorageAddon);
            return res.status(200).json({ message: "StorageAddon successfully added", success: true, storageAddon: newEntity });
        }
        catch (err) {
            console.log(err);
            return res.status(200).json({ success: false, message: "something went wrong!" });
        }
    }),
    updateStorageAddon: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        return res.end();
    }),
    getStorageAddon: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const storageAddon = yield StorageAddonRepo.findOne({ where: { id: req.params.id } });
            if (!storageAddon)
                return res.status(200).json({ success: false, message: "No storageAddons to display" });
            return res.status(200).json({ message: "storageAddon successfully found", success: true, storageAddon: storageAddon });
        }
        catch (err) {
            console.log(err);
            return res.status(200).json({ success: false, message: "something went wrong!" });
        }
    }),
    deleteStorageAddon: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        return res.end();
    }),
};

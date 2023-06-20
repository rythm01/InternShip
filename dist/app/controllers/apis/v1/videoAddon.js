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
exports.videoAddonController = void 0;
const config_1 = require("../../../../config");
const VideosAddon_1 = __importDefault(require("../../../models/VideosAddon"));
const VideoAddonRepo = config_1.AppDataSource.getRepository(VideosAddon_1.default);
exports.videoAddonController = {
    getVideoAddons: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const videoAddons = yield VideoAddonRepo.find();
            if (!videoAddons)
                return res.status(200).json({ success: false, message: "No VideoAddons to display" });
            return res.status(200).json({ message: "VideoAddon successfully found", success: true, videoAddons: videoAddons });
        }
        catch (err) {
            console.log(err);
            return res.status(200).json({ success: false, message: "something went wrong!" });
        }
    }),
    createVideoAddons: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { title, priceMonthly, description, fileSizeLimit, files } = req.body;
            const extVideoAddon = yield VideoAddonRepo.findOne({ where: { title } });
            if (extVideoAddon)
                return res.status(200).json({ success: false, message: "VideoAddon already exixsts." });
            var newVideoAddon = new VideosAddon_1.default();
            newVideoAddon.title = title;
            newVideoAddon.priceMonthly = priceMonthly;
            newVideoAddon.description = description;
            newVideoAddon.fileSizeLimit = fileSizeLimit;
            newVideoAddon.files = files;
            newVideoAddon.addedBy = req.admin;
            const newEntity = yield VideoAddonRepo.save(newVideoAddon);
            return res.status(200).json({ message: "VideoAddon successfully added", success: true, videoAddon: newEntity });
        }
        catch (err) {
            console.log(err);
            return res.status(200).json({ success: false, message: "something went wrong!" });
        }
    }),
    updateVideoAddon: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        return res.end();
    }),
    getVideoAddon: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const videoAddon = yield VideoAddonRepo.findOne({ where: { id: req.params.id } });
            if (!videoAddon)
                return res.status(200).json({ success: false, message: "No videoAddons to display" });
            return res.status(200).json({ message: "videoAddon successfully found", success: true, videoAddon: videoAddon });
        }
        catch (err) {
            console.log(err);
            return res.status(200).json({ success: false, message: "something went wrong!" });
        }
    }),
    deleteVideoAddon: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        return res.end();
    }),
};

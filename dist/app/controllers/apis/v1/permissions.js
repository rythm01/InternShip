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
exports.permissionsController = void 0;
const config_1 = require("../../../../config");
const File_1 = __importDefault(require("../../../models/File"));
const permissions_1 = require("../../../models/permissions");
const UserAuth_1 = require("../../../models/UserAuth");
const FileRepo = config_1.AppDataSource.getRepository(File_1.default);
const PermissionRepo = config_1.AppDataSource.getRepository(permissions_1.FilePermission);
const UserAuthRepo = config_1.AppDataSource.getRepository(UserAuth_1.UserAuth);
exports.permissionsController = {
    getPermissions: (req, res) => __awaiter(void 0, void 0, void 0, function* () { }),
    createPermission: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { file, user, type } = req.body;
            const fileData = yield FileRepo.findOne({ where: { id: file } });
            if (!fileData) {
                return res.status(200).json({ success: false, message: "File not found" });
            }
            const userData = yield UserAuthRepo.findOne({ where: { id: user === null || user === void 0 ? void 0 : user.id } });
            const newPermission = new permissions_1.FilePermission();
            newPermission.file = fileData;
            newPermission.user = userData;
            newPermission.can_read = true;
            newPermission.can_write = true;
            newPermission.can_share = true;
            newPermission.immediate_sharing = true;
            newPermission.time_release_sharing = type === "time" ? true : false;
            yield PermissionRepo.save(newPermission);
            return res.status(200).json({ success: true, message: "Permission created" });
        }
        catch (err) {
            console.log(err);
            return res.status(200).json({ success: false, message: "Something Went wrong!" });
        }
    }),
};

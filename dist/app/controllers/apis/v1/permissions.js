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
exports.permissionsController = void 0;
const config_1 = require("../../../../config");
const File_1 = __importDefault(require("../../../models/File"));
const permissions_1 = require("../../../models/permissions");
const UserAuth_1 = require("../../../models/UserAuth");
const Buddies_1 = __importDefault(require("../../../models/Buddies"));
const UserProfile_1 = require("../../../models/UserProfile");
const FileRepo = config_1.AppDataSource.getRepository(File_1.default);
const PermissionRepo = config_1.AppDataSource.getRepository(permissions_1.Permission);
const UserAuthRepo = config_1.AppDataSource.getRepository(UserAuth_1.UserAuth);
const BuddyRepo = config_1.AppDataSource.getRepository(Buddies_1.default);
const UserProfileRepo = config_1.AppDataSource.getRepository(UserProfile_1.UserProfile);
exports.permissionsController = {
    getPermissions: (req, res) => __awaiter(void 0, void 0, void 0, function* () { }),
    createPermission: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const _a = req.body, { file_id, buddy_ids } = _a, data = __rest(_a, ["file_id", "buddy_ids"]);
            console.log(buddy_ids);
            const userProfile = yield UserProfileRepo.createQueryBuilder("userProfile")
                .innerJoinAndSelect("userProfile.userAuth", "UserAuth")
                .where("userProfile.userAuth = :id", { id: req.user })
                .getOne();
            const fileData = yield FileRepo.find({
                where: {
                    user: {
                        id: userProfile === null || userProfile === void 0 ? void 0 : userProfile.id,
                    },
                    id: file_id,
                },
            });
            const buddyData = yield BuddyRepo.find({
                where: { user: { id: req.user } },
                select: {
                    id: true,
                    buddy: {
                        id: true,
                        email: true,
                    },
                    user: {
                        id: true,
                        email: true,
                    },
                },
                relations: ["user", "buddy"],
            });
            if (!fileData || !buddyData) {
                return res
                    .status(200)
                    .json({ success: false, message: "Data not found" });
            }
            const allPermission = [];
            for (const buddy of buddyData) {
                const newPermission = new permissions_1.Permission();
                newPermission.file = fileData[0].id;
                newPermission.userAuth = req.user;
                newPermission.buddy = buddy.buddy.id;
                newPermission.canRead = (data === null || data === void 0 ? void 0 : data.read) || false;
                newPermission.canWrite = (data === null || data === void 0 ? void 0 : data.write) || false;
                newPermission.canShare = (data === null || data === void 0 ? void 0 : data.share) || false;
                if (data.timeReleaseDate) {
                    newPermission.timeReleaseDate = data === null || data === void 0 ? void 0 : data.timeReleaseDate;
                }
                else if (data.instantReleaseDate) {
                    newPermission.instantReleaseDate = data === null || data === void 0 ? void 0 : data.instantReleaseDate;
                }
                allPermission.push(newPermission);
            }
            yield PermissionRepo.save(allPermission);
            return res.status(200).json({
                success: true,
                message: "Permission created",
            });
        }
        catch (err) {
            return res
                .status(200)
                .json({ success: false, message: "Something Went wrong!" });
        }
    }),
};

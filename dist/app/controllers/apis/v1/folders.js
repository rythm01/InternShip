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
exports.folderController = void 0;
const crypto_1 = __importDefault(require("../../../../utils/crypto"));
const config_1 = require("../../../../config");
const Folder_1 = __importDefault(require("../../../models/Folder"));
const UserProfile_1 = require("../../../models/UserProfile");
const FolderRepo = config_1.AppDataSource.getRepository(Folder_1.default);
const UserProfileRepo = config_1.AppDataSource.getRepository(UserProfile_1.UserProfile);
exports.folderController = {
    getFolders: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userProfile = yield UserProfileRepo.createQueryBuilder("userProfile").innerJoinAndSelect("userProfile.userAuth", "UserAuth").where("userProfile.userAuth = :id", { id: req.user }).getOne();
            if (!userProfile) {
                return res.status(200).json({ success: false, message: 'Profile does not exist' });
            }
            const options = {
                where: Object.assign({ user: {
                        id: userProfile.id
                    } }, req.query),
                relations: ['files']
            };
            const folders = yield FolderRepo.find(options);
            if (folders.length <= 0) {
                return res.json({ message: 'Folders does not exist' });
            }
            return res.json({ success: true, message: 'Folders found successfully', data: folders });
        }
        catch (error) {
            console.log(error);
            return res.status(200).json({ success: false, message: 'Internal server error' });
        }
    }),
    createFolder: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name } = req.body;
            console.log(req.body);
            if (!name) {
                return res.status(200).json({ success: false, message: 'Please provide a name' });
            }
            const userProfile = yield UserProfileRepo.createQueryBuilder("userProfile").innerJoinAndSelect("userProfile.userAuth", "UserAuth").where("userProfile.userAuth = :id", { id: req.user }).getOne();
            if (!userProfile) {
                return res.status(200).json({ success: false, message: 'Profile does not exist' });
            }
            const folder = new Folder_1.default();
            folder.name = name + "|" + (0, crypto_1.default)(16);
            folder.user = userProfile;
            yield FolderRepo.save(folder);
            return res.json({ success: true, message: 'Folder created successfully', data: folder });
        }
        catch (error) {
            console.log(error);
            return res.status(200).json({ success: false, message: 'Internal server error' });
        }
    }),
    updateFolder: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name } = req.body;
            const { id } = req.params;
            if (!name) {
                return res.status(200).json({ success: false, message: 'Please provide a name' });
            }
            const userProfile = yield UserProfileRepo.createQueryBuilder("userProfile").innerJoinAndSelect("userProfile.userAuth", "UserAuth").where("userProfile.userAuth = :id", { id: req.user }).getOne();
            if (!userProfile) {
                return res.status(200).json({ success: false, message: 'Profile does not exist' });
            }
            //find folder based on folder id and user profile id
            const folder = yield FolderRepo.createQueryBuilder("folder").innerJoin("folder.user", "user").where("user.id = :id", { id: userProfile === null || userProfile === void 0 ? void 0 : userProfile.id }).andWhere("folder.id = :folderId", { folderId: id }).getOne();
            if (!folder) {
                return res.status(200).json({ success: false, message: 'Folder does not exist' });
            }
            if (folder.name.split("|")[0] == 'root') {
                return res.status(200).json({ success: false, message: 'Root folder cannot be updated' });
            }
            folder.name = name + "|" + (0, crypto_1.default)(16);
            yield FolderRepo.save(folder);
            return res.json({ success: true, message: 'Folder updated successfully', data: folder });
        }
        catch (error) {
            console.log(error);
            return res.status(200).json({ success: false, message: 'Internal server error' });
        }
    }),
    getFolder: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userProfile = yield UserProfileRepo.createQueryBuilder("userProfile").innerJoinAndSelect("userProfile.userAuth", "UserAuth").where("userProfile.userAuth = :id", { id: req.user }).getOne();
            if (!userProfile) {
                return res.status(200).json({ success: false, message: 'Profile does not exist' });
            }
            const options = {
                where: {
                    id: parseInt(req.params.id),
                },
                relations: ['files']
            };
            const folder = yield FolderRepo.findOne(options);
            if (!folder) {
                return res.json({ message: 'Folders does not exist' });
            }
            return res.json({ success: true, message: 'Folders found successfully', data: folder });
        }
        catch (error) {
            console.log(error);
            return res.status(200).json({ success: false, message: 'Internal server error' });
        }
    }),
    deleteFolder: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userProfile = yield UserProfileRepo.createQueryBuilder("userProfile").innerJoinAndSelect("userProfile.userAuth", "UserAuth").where("userProfile.userAuth = :id", { id: req.user }).getOne();
            if (!userProfile) {
                return res.status(200).json({ success: false, message: 'Profile does not exist' });
            }
            const findFolder = yield FolderRepo.findOne({ where: { id: parseInt(req.params.id), user: { id: userProfile.id } } });
            if (!findFolder) {
                return res.status(200).json({ success: false, message: 'Folder does not exist' });
            }
            if (findFolder.name.split("|")[0] == 'root') {
                return res.status(200).json({ success: false, message: 'Root folder cannot be updated' });
            }
            yield FolderRepo.delete(findFolder.id);
            return res.json({ success: true, message: 'Folder deleted successfully' });
        }
        catch (error) {
            console.log(error);
            return res.status(200).json({ success: false, message: 'Internal server error' });
        }
    }),
};

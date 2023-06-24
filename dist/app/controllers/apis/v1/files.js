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
exports.fileController = void 0;
const crypto_1 = __importDefault(require("../../../../utils/crypto"));
const config_1 = require("../../../../config");
const File_1 = __importDefault(require("../../../models/File"));
const UserProfile_1 = require("../../../models/UserProfile");
const Folder_1 = __importDefault(require("../../../models/Folder"));
const permissions_1 = require("../../../models/permissions");
const FileRepo = config_1.AppDataSource.getRepository(File_1.default);
const FolderRepo = config_1.AppDataSource.getRepository(Folder_1.default);
const UserProfileRepo = config_1.AppDataSource.getRepository(UserProfile_1.UserProfile);
const PermissionRepo = config_1.AppDataSource.getRepository(permissions_1.Permission);
exports.fileController = {
    getFiles: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userProfile = yield UserProfileRepo.createQueryBuilder("userProfile")
                .innerJoinAndSelect("userProfile.userAuth", "UserAuth")
                .where("userProfile.userAuth = :id", { id: req.user })
                .getOne();
            const isHaveingPermission = yield PermissionRepo.find({
                where: {
                    buddy: { id: req.user },
                },
                relations: ["buddy", "file", "userAuth"],
            });
            if (!userProfile) {
                return res
                    .status(200)
                    .json({ success: false, message: "Profile does not exist" });
            }
            let allowedFile = [];
            if (isHaveingPermission.length > 0) {
                for (const file of isHaveingPermission) {
                    const files = yield FileRepo.findOne({
                        where: {
                            id: file.file.id,
                        },
                    });
                    allowedFile.push(files);
                }
            }
            const options = {
                relations: ["folder"],
                where: Object.assign({ user: {
                        id: userProfile.id,
                    } }, req.query),
            };
            const files = yield FileRepo.find(options);
            return res.json({
                success: true,
                message: "Files found successfully",
                data: files,
                allowedFile,
            });
        }
        catch (error) {
            console.log(error);
            return res
                .status(200)
                .json({ success: false, message: "Internal server error" });
        }
    }),
    uploadFile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const file = req.file;
            if (!file) {
                return res
                    .status(200)
                    .json({ success: false, message: "Please upload a file" });
            }
            const userProfile = yield UserProfileRepo.createQueryBuilder("userProfile")
                .innerJoinAndSelect("userProfile.userAuth", "UserAuth")
                .where("userProfile.userAuth = :id", { id: req.user })
                .getOne();
            //find folder named root according to user id
            if (!userProfile) {
                return res
                    .status(200)
                    .json({ success: false, message: "Profile does not exist" });
            }
            const rootFolder = yield FolderRepo.findOne({
                where: { name: "root", user: { id: userProfile.id } },
            });
            if (!rootFolder) {
                return res
                    .status(200)
                    .json({ success: false, message: "Root folder does not exist" });
            }
            const key = (0, crypto_1.default)(16);
            var fileData = {
                name: (req.body.parent_id || 0).toString() +
                    req.user +
                    `|` +
                    file.originalname,
                ext: file.originalname.split(".")[1],
                size: file.size,
                key: key,
                folderId: req.body.parent_id || 0,
                userId: req.user,
            };
            const params = {
                Bucket: process.env.AWS_STORAGE_BUCKET_NAME || "store-and-share-vault",
                Key: key + "." + fileData.ext,
                Body: file.buffer,
            };
            //upload file to aws s3
            const data = yield config_1.s3.upload(params).promise();
            if (!data)
                return res
                    .status(500)
                    .json({ success: false, message: "something went wrong!" });
            //save file data to database
            const fileForDatabase = new File_1.default();
            fileForDatabase.name = fileData.name;
            fileForDatabase.ext = fileData.ext;
            fileForDatabase.size = (fileData.size / 1024).toFixed(2).toString();
            fileForDatabase.key = fileData.key;
            fileForDatabase.user = userProfile;
            fileForDatabase.folder = req.body.folderId || rootFolder.id;
            yield FileRepo.save(fileForDatabase);
            const leftStorage = parseFloat(userProfile.storage) - fileData.size / 1024;
            console.log(leftStorage);
            userProfile.storageLeft = leftStorage.toString();
            yield UserProfileRepo.save(userProfile);
            return res.json({ success: true, message: "File uploaded successfully" });
        }
        catch (error) {
            console.log(error);
            return res
                .status(200)
                .json({ success: false, message: "Something went wrong" });
        }
    }),
    viewFile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const { id } = req.params;
            let file;
            const userProfile = yield UserProfileRepo.createQueryBuilder("userProfile")
                .innerJoinAndSelect("userProfile.userAuth", "UserAuth")
                .where("userProfile.userAuth = :id", { id: req.user })
                .getOne();
            if (!userProfile) {
                return res
                    .status(200)
                    .json({ success: false, message: "Profile does not exist" });
            }
            const isHaveingPermission = yield PermissionRepo.find({
                where: {
                    buddy: { id: req.user },
                    file: { id: id },
                },
                relations: ["userAuth"],
            });
            console.log(isHaveingPermission);
            if (isHaveingPermission.length > 0) {
                const userAllowedProfile = yield UserProfileRepo.createQueryBuilder("userProfile")
                    .innerJoinAndSelect("userProfile.userAuth", "UserAuth")
                    .where("userProfile.userAuth = :id", {
                    id: (_a = isHaveingPermission[0]) === null || _a === void 0 ? void 0 : _a.userAuth.id,
                })
                    .getOne();
                file = yield FileRepo.findOne({
                    where: {
                        id: parseInt(id),
                        user: {
                            id: userAllowedProfile === null || userAllowedProfile === void 0 ? void 0 : userAllowedProfile.id,
                        },
                    },
                });
            }
            else {
                file = yield FileRepo.findOne({
                    where: {
                        id: parseInt(id),
                        user: {
                            id: userProfile === null || userProfile === void 0 ? void 0 : userProfile.id,
                        },
                    },
                });
            }
            if (!file)
                return res.status(200).json({
                    message: "no files found",
                    success: false,
                });
            const params = {
                Bucket: process.env.AWS_STORAGE_BUCKET_NAME || "store-and-share-vault",
                Key: file.key + "." + file.ext,
                Expires: 60,
            };
            const url = yield config_1.s3.getSignedUrlPromise("getObject", params);
            return res
                .status(200)
                .json({ success: true, data: { url, ext: file.ext } });
        }
        catch (error) {
            console.log(error);
            return res
                .status(200)
                .json({ success: false, message: "Internal server error" });
        }
    }),
    getFileData: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const userProfile = yield UserProfileRepo.createQueryBuilder("userProfile")
                .innerJoinAndSelect("userProfile.userAuth", "UserAuth")
                .where("userProfile.userAuth = :id", { id: req.user })
                .getOne();
            if (!userProfile) {
                return res
                    .status(200)
                    .json({ success: false, message: "Profile does not exist" });
            }
            const file = yield FileRepo.findOne({
                where: { id: parseInt(id), user: { id: userProfile.id } },
            });
            if (!file)
                return res.status(200).json({
                    message: "no files found",
                    success: false,
                });
            console.log(file);
            return res.status(200).json({ success: true, data: file });
        }
        catch (error) {
            console.log(error);
            return res
                .status(200)
                .json({ success: false, message: "Internal server error" });
        }
    }),
    deleteFile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const userProfile = yield UserProfileRepo.createQueryBuilder("userProfile")
                .innerJoinAndSelect("userProfile.userAuth", "UserAuth")
                .where("userProfile.userAuth = :id", { id: req.user })
                .getOne();
            if (!userProfile) {
                return res
                    .status(200)
                    .json({ success: false, message: "Profile does not exist" });
            }
            const file = yield FileRepo.findOne({
                where: { id: parseInt(id), user: { id: userProfile.id } },
            });
            if (!file)
                return res.status(200).json({
                    message: "no files found",
                    success: false,
                });
            const params = {
                Bucket: process.env.AWS_STORAGE_BUCKET_NAME || "store-and-share-vault",
                Key: file.key + "." + file.ext,
            };
            yield config_1.s3.deleteObject(params).promise();
            yield FileRepo.delete({ id: parseInt(id) });
            const leftStorage = parseFloat(userProfile.storageLeft) + parseFloat(file.size);
            userProfile.storageLeft = leftStorage.toString();
            yield UserProfileRepo.save(userProfile);
            return res
                .status(200)
                .json({ success: true, message: "File deleted successfully" });
        }
        catch (err) {
            console.log(err);
            return res
                .status(200)
                .json({ success: false, message: "Internal server error" });
        }
    }),
};

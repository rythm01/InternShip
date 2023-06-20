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
exports.profileController = void 0;
const crypto_1 = __importDefault(require("../../../../utils/crypto"));
const config_1 = require("../../../../config");
const UserProfile_1 = require("../../../models/UserProfile");
const Folder_1 = __importDefault(require("../../../models/Folder"));
const UserAuth_1 = require("../../../models/UserAuth");
const plans_1 = __importDefault(require("../../../models/plans"));
const ProfileRepo = config_1.AppDataSource.getRepository(UserProfile_1.UserProfile);
const UserAuthRepo = config_1.AppDataSource.getRepository(UserAuth_1.UserAuth);
const FolderRepo = config_1.AppDataSource.getRepository(Folder_1.default);
const PlanRepo = config_1.AppDataSource.getRepository(plans_1.default);
exports.profileController = {
    find: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // const userProfile = await ProfileRepo.createQueryBuilder("userProfile").innerJoinAndSelect("userProfile.folders", "Folder").where("userProfile.userAuth = :id", { id: req.user }).getOne();
            //create query builder to find userprofile according to user id
            const userProfile = yield ProfileRepo.createQueryBuilder("userProfile").innerJoin("userProfile.userAuth", "UserAuth").where("userProfile.userAuth = :id", { id: req.user }).getOne();
            if (!userProfile) {
                return res.status(200).json({ message: 'Profile does not exist', success: false });
            }
            const userProfileData = yield ProfileRepo.findOne({
                relations: ["files", "folders", "userAuth", "plan"],
                select: {
                    userAuth: {
                        id: true,
                        email: true,
                        name: true,
                        phoneNumber: true,
                        is2fa: true,
                        isActive: true,
                        isStaff: true,
                        dateJoined: true,
                        lastLogin: true,
                        isSuperUser: true,
                    },
                    plan: {
                        id: true,
                        title: true,
                        storage: true,
                        buddies: true,
                        fileSizeLimit: true,
                        files: true,
                    }
                },
                where: { id: userProfile.id }
            });
            if (!userProfileData) {
                return res.status(200).json({ message: 'Profile does not exist', success: false });
            }
            return res.status(200).json({ message: 'Profile found successfully', success: true, data: userProfileData });
        }
        catch (error) {
            console.log(error);
            return res.status(200).json({ message: 'Internal server error', success: false });
        }
    }),
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const file = req.file;
            const { fname, lname, verificationPeriod, location } = req.body;
            const userAuth = yield UserAuthRepo.findOne({ where: { id: req.user } });
            const userProfile = yield ProfileRepo.createQueryBuilder("userProfile").innerJoinAndSelect("userProfile.userAuth", "UserAuth").where("userProfile.userAuth = :id", { id: req.user }).getOne();
            if (userProfile) {
                return res.status(200).json({ success: false, message: 'Profile already exists' });
            }
            const plan = yield PlanRepo.findOne({ where: { title: 'Freemium' } });
            const key = (0, crypto_1.default)(16);
            var fileData = {
                name: (req.body.parent_id || 0).toString() + req.user + `|` + file.originalname,
                ext: file.originalname.split('.')[1],
                size: file.size,
                key: key,
                folderId: (req.body.parent_id || 0),
                userId: req.user
            };
            const params = {
                Bucket: process.env.AWS_STORAGE_BUCKET_NAME || "store-and-share-vault",
                Key: key + "." + fileData.ext,
                ACL: 'public-read',
                Body: file.buffer,
            };
            //upload file to aws s3
            // const data = await s3.upload(params).promise()
            // if (!data) return res.status(200).json({ success: false, message: "something went wrong!" })
            const profile = new UserProfile_1.UserProfile();
            profile.userAuth = userAuth;
            profile.firstName = fname;
            profile.lastName = lname;
            profile.plan = plan;
            profile.location = location;
            profile.verficationPeriod = verificationPeriod;
            // profile.profilePicture = data.Location;
            // profile.profilePictureKey = data.Key;
            profile.storage = (plan === null || plan === void 0 ? void 0 : plan.storage.toString()) || (1024 * 1024).toString();
            profile.storageLeft = (plan === null || plan === void 0 ? void 0 : plan.storage.toString()) || (1024 * 1024).toString();
            var response = yield ProfileRepo.save(profile);
            const folder = new Folder_1.default();
            folder.name = "root";
            folder.user = response;
            yield FolderRepo.save(folder);
            // const stripeUser = await stripe.customer.get
            // const customer = await stripe.customers.create({
            //     name: fname + " " + lname,
            //     email: req.user?.email,
            //     description: profile.id,
            // });
            profile.stripeCustomer = "#12345";
            yield ProfileRepo.save(profile);
            return res.status(200).json({ success: true, message: 'Profile created successfully' });
        }
        catch (error) {
            console.log(error);
            return res.status(200).json({ success: false, message: 'Internal server error' });
        }
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { fullName, userName, verficationPeriod, location } = req.body;
            const userProfile = yield ProfileRepo.createQueryBuilder("userProfile").innerJoinAndSelect("userProfile.userAuth", "UserAuth").where("userProfile.userAuth = :id", { id: req.user }).getOne();
            if (!userProfile) {
                return res.status(400).json({ message: 'Profile does not exist' });
            }
            const userAuth = yield UserAuthRepo.findOne({ where: { id: req === null || req === void 0 ? void 0 : req.user } });
            if (!userAuth) {
                return res.status(400).json({ message: 'User does not exist' });
            }
            if (req.file) {
                //delete exsisting file from aws s3
                const deleteParams = {
                    Bucket: process.env.AWS_STORAGE_BUCKET_NAME || "store-and-share-vault",
                    Key: userProfile.profilePictureKey,
                };
                const ackno = yield config_1.s3.deleteObject(deleteParams).promise();
                if (!ackno)
                    return res.status(200).json({ success: false, message: "something went wrong!" });
                const file = req.file;
                const key = (0, crypto_1.default)(16);
                var fileData = {
                    name: (req.body.parent_id || 0).toString() + req.user + `|` + file.originalname,
                    ext: file.originalname.split('.')[1],
                    size: file.size,
                    key: key,
                    folderId: (req.body.parent_id || 0),
                    userId: req.user
                };
                const params = {
                    Bucket: process.env.AWS_STORAGE_BUCKET_NAME || "store-and-share-vault",
                    Key: key + "." + fileData.ext,
                    ACL: 'public-read',
                    Body: file.buffer,
                };
                //upload file to aws s3
                const data = yield config_1.s3.upload(params).promise();
                if (!data)
                    return res.status(500).json({ success: false, message: "something went wrong!" });
                userProfile.profilePicture = data.Location;
                userProfile.profilePictureKey = data.Key;
            }
            userProfile.firstName = fullName.split(" ")[0];
            userProfile.lastName = fullName.split(" ")[1];
            userProfile.location = location;
            userProfile.verficationPeriod = verficationPeriod;
            userAuth.name = userName;
            yield UserAuthRepo.save(userAuth);
            yield ProfileRepo.save(userProfile);
            return res.status(200).json({ success: true, message: 'Profile updated successfully' });
        }
        catch (error) {
            console.log(error);
            return res.status(200).json({ success: false, message: 'Internal server error' });
        }
    })
};

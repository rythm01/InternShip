import { Response } from 'express';
import { Request } from '../../../../utils/@types'

import generateUid from '../../../../utils/crypto';
import { AppDataSource, s3, stripe } from '../../../../config'
import File from '../../../models/File';
import { UserProfile } from '../../../models/UserProfile';
import Folder from '../../../models/Folder';
import { UserAuth } from '../../../models/UserAuth';
import Plan from '../../../models/plans'

const ProfileRepo = AppDataSource.getRepository(UserProfile);
const UserAuthRepo = AppDataSource.getRepository(UserAuth);
const FolderRepo = AppDataSource.getRepository(Folder);
const PlanRepo = AppDataSource.getRepository(Plan);


export const profileController = {

    find: async (req: Request, res: Response) => {
        try {
            // const userProfile = await ProfileRepo.createQueryBuilder("userProfile").innerJoinAndSelect("userProfile.folders", "Folder").where("userProfile.userAuth = :id", { id: req.user }).getOne();

            //create query builder to find userprofile according to user id

            const userProfile = await ProfileRepo.createQueryBuilder("userProfile").innerJoin("userProfile.userAuth", "UserAuth").where("userProfile.userAuth = :id", { id: req.user }).getOne();

            if (!userProfile) {
                return res.status(200).json({ message: 'Profile does not exist', success: false });
            }


            const userProfileData = await ProfileRepo.findOne({
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
            })



            if (!userProfileData) {
                return res.status(200).json({ message: 'Profile does not exist', success: false });
            }
            return res.status(200).json({ message: 'Profile found successfully', success: true, data: userProfileData });
        } catch (error) {
            console.log(error)
            return res.status(200).json({ message: 'Internal server error', success: false });
        }

    },

    create: async (req: Request, res: Response) => {
        try {
            const file = req.file!;
            const { fname, lname, verificationPeriod, location } = req.body;

            const userAuth = await UserAuthRepo.findOne({ where: { id: req.user } });

            const userProfile = await ProfileRepo.createQueryBuilder("userProfile").innerJoinAndSelect("userProfile.userAuth", "UserAuth").where("userProfile.userAuth = :id", { id: req.user }).getOne();
            if (userProfile) {
                return res.status(200).json({ success: false, message: 'Profile already exists' });
            }


            const plan = await PlanRepo.findOne({ where: { title: 'Freemium' } })

            const key = generateUid(16)
            var fileData = {
                name: (req.body.parent_id || 0).toString() + req.user + `|` + file.originalname,
                ext: file.originalname.split('.')[1],
                size: file.size,
                key: key,
                folderId: (req.body.parent_id || 0),
                userId: req.user
            }
            const params = {
                Bucket: process.env.AWS_STORAGE_BUCKET_NAME || "store-and-share-vault",
                Key: key + "." + fileData.ext,
                ACL: 'public-read',
                Body: file.buffer,
            };

            //upload file to aws s3
            const data = await s3.upload(params).promise()
            if (!data) return res.status(200).json({ success: false, message: "something went wrong!" })


            const profile = new UserProfile();
            profile.userAuth = userAuth!;
            profile.firstName = fname;
            profile.lastName = lname;
            profile.plan = plan!;
            profile.location = location;
            profile.verficationPeriod = verificationPeriod;
            profile.profilePicture = data.Location;
            profile.profilePictureKey = data.Key;
            profile.storage = plan?.storage.toString() || (1024 * 1024).toString();
            profile.storageLeft = plan?.storage.toString() || (1024 * 1024).toString();

            var response = await ProfileRepo.save(profile);

            const folder = new Folder()
            folder.name = "root"
            folder.user = response!

            await FolderRepo.save(folder)


            // const stripeUser = await stripe.customer.get



            // const customer = await stripe.customers.create({
            //     name: fname + " " + lname,
            //     email: req.user?.email,
            //     description: profile.id,
            // });

            profile.stripeCustomer = "#12345";
            await ProfileRepo.save(profile);


            return res.status(200).json({ success: true, message: 'Profile created successfully' });
        } catch (error) {
            console.log(error)
            return res.status(200).json({ success: false, message: 'Internal server error' });

        }

    },

    update: async (req: Request, res: Response) => {

        try {

            const { fullName, userName, verficationPeriod, location } = req.body;
            const userProfile = await ProfileRepo.createQueryBuilder("userProfile").innerJoinAndSelect("userProfile.userAuth", "UserAuth").where("userProfile.userAuth = :id", { id: req.user }).getOne();
            if (!userProfile) {
                return res.status(400).json({ message: 'Profile does not exist' });
            }

            const userAuth = await UserAuthRepo.findOne({ where: { id: req?.user } })
            if (!userAuth) {
                return res.status(400).json({ message: 'User does not exist' });
            }

            if (req.file) {

                //delete exsisting file from aws s3
                const deleteParams = {
                    Bucket: process.env.AWS_STORAGE_BUCKET_NAME || "store-and-share-vault",
                    Key: userProfile.profilePictureKey,
                };

                const ackno = await s3.deleteObject(deleteParams).promise()
                if (!ackno) return res.status(200).json({ success: false, message: "something went wrong!" })


                const file = req.file!;
                const key = generateUid(16)
                var fileData = {
                    name: (req.body.parent_id || 0).toString() + req.user + `|` + file.originalname,
                    ext: file.originalname.split('.')[1],
                    size: file.size,
                    key: key,
                    folderId: (req.body.parent_id || 0),
                    userId: req.user
                }
                const params = {
                    Bucket: process.env.AWS_STORAGE_BUCKET_NAME || "store-and-share-vault",
                    Key: key + "." + fileData.ext,
                    ACL: 'public-read',
                    Body: file.buffer,
                };

                //upload file to aws s3
                const data = await s3.upload(params).promise()
                if (!data) return res.status(500).json({ success: false, message: "something went wrong!" })

                userProfile.profilePicture = data.Location;
                userProfile.profilePictureKey = data.Key;

            }

            userProfile.firstName = fullName.split(" ")[0];
            userProfile.lastName = fullName.split(" ")[1];
            userProfile.location = location;
            userProfile.verficationPeriod = verficationPeriod;
            userAuth.name = userName;

            await UserAuthRepo.save(userAuth);
            await ProfileRepo.save(userProfile);


            return res.status(200).json({ success: true, message: 'Profile updated successfully' });





        } catch (error) {
            console.log(error)
            return res.status(200).json({ success: false, message: 'Internal server error' });
        }
    }



}

import { Response } from "express";
import { Request } from "../../../../utils/@types";

import generateUid from "../../../../utils/crypto";
import { AppDataSource, s3 } from "../../../../config";
import File from "../../../models/File";
import { UserProfile } from "../../../models/UserProfile";
import Folder from "../../../models/Folder";

const FileRepo = AppDataSource.getRepository(File);
const FolderRepo = AppDataSource.getRepository(Folder);
const UserProfileRepo = AppDataSource.getRepository(UserProfile);

export const fileController = {
  getFiles: async (req: Request, res: Response) => {
    try {
      const userProfile = await UserProfileRepo.createQueryBuilder(
        "userProfile"
      )
        .innerJoinAndSelect("userProfile.userAuth", "UserAuth")
        .where("userProfile.userAuth = :id", { id: req.user })
        .getOne();

      if (!userProfile) {
        return res
          .status(200)
          .json({ success: false, message: "Profile does not exist" });
      }
      const options = {
        relations: ["folder"],
        where: {
          user: {
            id: userProfile.id,
          },
          ...req.query,
        },
      };

      const files = await FileRepo.find(options);
      if (files.length <= 0) {
        return res.json({ success: true, message: "Files does not exist" });
      }
      return res.json({
        success: true,
        message: "Files found successfully",
        data: files,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(200)
        .json({ success: false, message: "Internal server error" });
    }
  },

  uploadFile: async (req: Request, res: Response) => {
    try {
      const file = req.file;
      if (!file) {
        return res
          .status(200)
          .json({ success: false, message: "Please upload a file" });
      }

      const userProfile = await UserProfileRepo.createQueryBuilder(
        "userProfile"
      )
        .innerJoinAndSelect("userProfile.userAuth", "UserAuth")
        .where("userProfile.userAuth = :id", { id: req.user })
        .getOne();

      //find folder named root according to user id

      if (!userProfile) {
        return res
          .status(200)
          .json({ success: false, message: "Profile does not exist" });
      }

      const rootFolder = await FolderRepo.findOne({
        where: { name: "root", user: { id: userProfile.id } },
      });
      if (!rootFolder) {
        return res
          .status(200)
          .json({ success: false, message: "Root folder does not exist" });
      }

      const key = generateUid(16);
      var fileData = {
        name:
          (req.body.parent_id || 0).toString() +
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
      // const data = await s3.upload(params).promise()
      // if (!data) return res.status(500).json({ success: false, message: "something went wrong!" })

      //save file data to database
      const fileForDatabase = new File();

      fileForDatabase.name = fileData.name;
      fileForDatabase.ext = fileData.ext;
      fileForDatabase.size = (fileData.size / 1024).toFixed(2).toString();
      fileForDatabase.key = fileData.key;
      fileForDatabase.user = userProfile!;
      fileForDatabase.folder = req.body.folderId || rootFolder.id;

      await FileRepo.save(fileForDatabase);

      const leftStorage =
        parseFloat(userProfile.storage) - fileData.size / 1024;
      console.log(leftStorage);
      userProfile.storageLeft = leftStorage.toString();
      await UserProfileRepo.save(userProfile);

      return res.json({ success: true, message: "File uploaded successfully" });
    } catch (error) {
      console.log(error);
      return res
        .status(200)
        .json({ success: false, message: "Something went wrong" });
    }
  },

  viewFile: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const userProfile = await UserProfileRepo.createQueryBuilder(
        "userProfile"
      )
        .innerJoinAndSelect("userProfile.userAuth", "UserAuth")
        .where("userProfile.userAuth = :id", { id: req.user })
        .getOne();

      if (!userProfile) {
        return res
          .status(200)
          .json({ success: false, message: "Profile does not exist" });
      }
      const file = await FileRepo.findOne({
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
        Expires: 60,
      };

      //   const url = await s3.getSignedUrlPromise("getObject", params);

      return res.status(200).json({ success: true, data: { ext: file.ext } });
    } catch (error) {
      console.log(error);
      return res
        .status(200)
        .json({ success: false, message: "Internal server error" });
    }
  },

  getFileData: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const userProfile = await UserProfileRepo.createQueryBuilder(
        "userProfile"
      )
        .innerJoinAndSelect("userProfile.userAuth", "UserAuth")
        .where("userProfile.userAuth = :id", { id: req.user })
        .getOne();

      if (!userProfile) {
        return res
          .status(200)
          .json({ success: false, message: "Profile does not exist" });
      }
      const file = await FileRepo.findOne({
        where: { id: parseInt(id), user: { id: userProfile.id } },
      });

      if (!file)
        return res.status(200).json({
          message: "no files found",
          success: false,
        });
      console.log(file);
      return res.status(200).json({ success: true, data: file });
    } catch (error) {
      console.log(error);
      return res
        .status(200)
        .json({ success: false, message: "Internal server error" });
    }
  },

  deleteFile: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const userProfile = await UserProfileRepo.createQueryBuilder(
        "userProfile"
      )
        .innerJoinAndSelect("userProfile.userAuth", "UserAuth")
        .where("userProfile.userAuth = :id", { id: req.user })
        .getOne();

      if (!userProfile) {
        return res
          .status(200)
          .json({ success: false, message: "Profile does not exist" });
      }
      const file = await FileRepo.findOne({
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

      //   await s3.deleteObject(params).promise();

      await FileRepo.delete({ id: parseInt(id) });

      const leftStorage =
        parseFloat(userProfile.storageLeft) + parseFloat(file.size);
      userProfile.storageLeft = leftStorage.toString();
      await UserProfileRepo.save(userProfile);

      return res
        .status(200)
        .json({ success: true, message: "File deleted successfully" });
    } catch (err) {
      console.log(err);
      return res
        .status(200)
        .json({ success: false, message: "Internal server error" });
    }
  },
};

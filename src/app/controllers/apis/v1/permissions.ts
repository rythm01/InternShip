import { Response } from "express";
import { Request } from "../../../../utils/@types";

import generateUid from "../../../../utils/crypto";
import { AppDataSource, s3 } from "../../../../config";
import File from "../../../models/File";
import { Permission } from "../../../models/permissions";
import { UserAuth } from "../../../models/UserAuth";
import Buddy from "../../../models/Buddies";
import { In } from "typeorm";
import { UserProfile } from "../../../models/UserProfile";
import Folder from "../../../models/Folder";

const FileRepo = AppDataSource.getRepository(File);
const PermissionRepo = AppDataSource.getRepository(Permission);
const UserAuthRepo = AppDataSource.getRepository(UserAuth);
const BuddyRepo = AppDataSource.getRepository(Buddy);
const UserProfileRepo = AppDataSource.getRepository(UserProfile);
const FolderRepo = AppDataSource.getRepository(Folder);

export const permissionsController = {
  deletePermissions: async (req: Request, res: Response) => {
    try {
      const { id, buddyId } = req.params;

      const permissionData = await PermissionRepo.findOne({
        where: {
          id: id as any,
          userAuth: { id: req.user as any },
          buddy: { id: buddyId as any },
        },
      });

      if (!permissionData) {
        return res.status(400).json({
          message: "No permission found to this buddy",
        });
      }

      await PermissionRepo.delete(id);

      return res.status(200).send({
        message: "Delete successfully",
      });
    } catch (error) {
      return res.status(400).json({
        message: "Something went wrong",
      });
    }
  },

  createPermission: async (req: Request, res: Response) => {
    try {
      const { file_id, folder_id, buddy_ids, ...data } = req.body;
      const userProfile = await UserProfileRepo.createQueryBuilder(
        "userProfile"
      )
        .innerJoinAndSelect("userProfile.userAuth", "UserAuth")
        .where("userProfile.userAuth = :id", { id: req.user })
        .getOne();

      const buddyData = await BuddyRepo.find({
        where: { user: { id: req.user as any } },
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

      if (!buddyData) {
        return res
          .status(200)
          .json({ success: false, message: "Data not found" });
      }
      const newPermission = new Permission();
      const allPermission = [];

      if (file_id) {
        const fileData = await FileRepo.findOne({
          where: {
            user: {
              id: userProfile?.id,
            },
            id: file_id,
          },
        });
        newPermission.file = fileData?.id as any;
      }

      if (folder_id) {
        const folderData = await FolderRepo.findOne({
          where: {
            user: {
              id: userProfile?.id,
            },
            id: folder_id,
          },
        });
        newPermission.folder = folderData?.id as any;
      }

      for (const buddy of buddyData) {
        newPermission.userAuth = req.user as any;
        newPermission.buddy = buddy.buddy.id as any;
        newPermission.bankAccountId = data?.bankAccountId;
        newPermission.creditCardId = data?.creditCardId;
        newPermission.loanAccountId = data?.loanAccountId;
        newPermission.merchantAccountId = data?.merchantAccountId;
        newPermission.miscAccountId = data?.miscAccountId;
        newPermission.recipeAccountId = data?.recipeAccountId;
        newPermission.form_type = data?.form_type;
        newPermission.canRead = data?.read || false;
        newPermission.canWrite = data?.write || false;
        newPermission.canShare = data?.share || false;
        if (data.timeReleaseDate) {
          newPermission.timeReleaseDate = data?.timeReleaseDate;
        } else if (data.instantReleaseDate) {
          newPermission.instantReleaseDate = data?.instantReleaseDate;
        }
        allPermission.push(newPermission);
      }

      await PermissionRepo.save(allPermission);

      return res.status(200).json({
        success: true,
        message: "Permission created",
      });
    } catch (err) {
      return res
        .status(200)
        .json({ success: false, message: "Something Went wrong!" });
    }
  },

  getPermission: async (req: Request, res: Response) => {
    try {
      const getAllPermission = await PermissionRepo.find({
        where: {
          userAuth: { id: req.user as any },
        },
        relations: [
          "file",
          "folder",
          "bankAccountId",
          "creditCardId",
          "loanAccountId",
          "merchantAccountId",
          "passwordStorageId",
          "miscAccountId",
          "recipeAccountId",
          "buddy",
        ],
      });

      return res.status(200).json({
        message: "Success",
        data: getAllPermission,
      });
    } catch (error) {
      res.status(400).json({
        message: "Something went wrong",
      });
    }
  },
};

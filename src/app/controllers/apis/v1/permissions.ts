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

const FileRepo = AppDataSource.getRepository(File);
const PermissionRepo = AppDataSource.getRepository(Permission);
const UserAuthRepo = AppDataSource.getRepository(UserAuth);
const BuddyRepo = AppDataSource.getRepository(Buddy);
const UserProfileRepo = AppDataSource.getRepository(UserProfile);

export const permissionsController = {
  getPermissions: async (req: Request, res: Response) => {},

  createPermission: async (req: Request, res: Response) => {
    try {
      const { file_id, buddy_ids, ...data } = req.body;
      console.log(buddy_ids);
      const userProfile = await UserProfileRepo.createQueryBuilder(
        "userProfile"
      )
        .innerJoinAndSelect("userProfile.userAuth", "UserAuth")
        .where("userProfile.userAuth = :id", { id: req.user })
        .getOne();

      const fileData = await FileRepo.find({
        where: {
          user: {
            id: userProfile?.id,
          },
          id: file_id,
        },
      });

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

      if (!fileData || !buddyData) {
        return res
          .status(200)
          .json({ success: false, message: "Data not found" });
      }

      const allPermission = [];
      for (const buddy of buddyData) {
        const newPermission = new Permission();
        newPermission.file = fileData[0].id as any;
        newPermission.userAuth = req.user as any;
        newPermission.buddy = buddy.buddy.id as any;
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
};

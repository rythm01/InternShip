import { Response } from 'express';
import { Request } from '../../../../utils/@types'

import generateUid from '../../../../utils/crypto';
import { AppDataSource, s3 } from '../../../../config'
import File from '../../../models/File';
import { FilePermission } from '../../../models/permissions';
import { UserAuth } from '../../../models/UserAuth';

const FileRepo = AppDataSource.getRepository(File);
const PermissionRepo = AppDataSource.getRepository(FilePermission);
const UserAuthRepo = AppDataSource.getRepository(UserAuth);




export const permissionsController = {
    getPermissions: async (req: Request, res: Response) => { },



    createPermission: async (req: Request, res: Response) => {

        try {
            const { file, user, type } = req.body;

            const fileData = await FileRepo.findOne({ where: { id: file } });

            if (!fileData) {
                return res.status(200).json({ success: false, message: "File not found" });
            }


            const userData = await UserAuthRepo.findOne({ where: { id: user?.id } });


            const newPermission = new FilePermission();
            newPermission.file = fileData;
            newPermission.user = userData!;
            newPermission.can_read = true;
            newPermission.can_write = true;
            newPermission.can_share = true;
            newPermission.immediate_sharing = true;
            newPermission.time_release_sharing = type === "time" ? true : false;


            await PermissionRepo.save(newPermission);

            return res.status(200).json({ success: true, message: "Permission created" });



        } catch (err) {
            console.log(err);
            return res.status(200).json({ success: false, message: "Something Went wrong!" });
        }



    },

}
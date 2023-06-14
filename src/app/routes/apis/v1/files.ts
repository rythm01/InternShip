import { Router } from 'express';
import { uploadFile } from '../../../../config';
import { authenticateUser } from '../../../../middlewares/verifyUsers';

import { fileController } from '../../../controllers/apis/v1/files';

const router = Router();


router.use(uploadFile.single('file'))
router.use(authenticateUser);
router.route('/view/:id').get(fileController.viewFile)
router.route('/:id').get(fileController.getFileData).delete(fileController.deleteFile);
router.route('/').get(fileController.getFiles).post(fileController.uploadFile);


// router.get('/user', authController.getUser);

export default router;
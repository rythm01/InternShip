import { Router } from "express";
import { uploadFile } from "../../../../config";
import { authenticateUser } from "../../../../middlewares/verifyUsers";

import { permissionsController } from "../../../controllers/apis/v1/permissions";

const router = Router();

router.use(authenticateUser);
router.delete("/:id/:buddyId", permissionsController.deletePermissions);
router.route("/").post(permissionsController.createPermission);

// router.get('/user', authController.getUser);

export default router;

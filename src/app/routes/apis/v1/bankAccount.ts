import { Router } from "express";

import { authController } from "../../../controllers/apis/v1/auth";
import { bankAccountController } from "../../../controllers/apis/v1/bankAccount";
import { authenticateUser } from "../../../../middlewares/verifyUsers";

const router = Router();

router.use(authenticateUser);
router.post("/bank-password", bankAccountController.postBankAccount);

// router.get('/user', authController.getUser);

export default router;
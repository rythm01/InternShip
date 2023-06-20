import { Router } from "express";

import { authController } from "../../../controllers/apis/v1/auth";
import { bankAccountController } from "../../../controllers/apis/v1/bankAccount";
import { authenticateUser } from "../../../../middlewares/verifyUsers";

const router = Router();

router.use(authenticateUser);
router.post("/", bankAccountController.postBankAccount);
router.get("/", bankAccountController.getBankAccount);
// router.get('/user', authController.getUser);

export default router;

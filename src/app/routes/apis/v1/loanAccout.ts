import { Router } from "express";

import { authenticateUser } from "../../../../middlewares/verifyUsers";
import { loanAccountController } from "../../../controllers/apis/v1/loanAccount";

const router = Router();

router.use(authenticateUser);
router.post("/", loanAccountController.postLoanAccount);
router.get("/", loanAccountController.getLoanAccount);
router.delete("/:id", loanAccountController.deleteLoanAccount);
router.get("/:id", loanAccountController.getBankAccountDetailsById);
router.put("/:id", loanAccountController.updateBankAccountDetailsById);

export default router;

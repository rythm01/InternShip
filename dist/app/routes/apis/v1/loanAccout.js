"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyUsers_1 = require("../../../../middlewares/verifyUsers");
const loanAccount_1 = require("../../../controllers/apis/v1/loanAccount");
const router = (0, express_1.Router)();
router.use(verifyUsers_1.authenticateUser);
router.post("/", loanAccount_1.loanAccountController.postLoanAccount);
router.get("/", loanAccount_1.loanAccountController.getLoanAccount);
router.delete("/:id", loanAccount_1.loanAccountController.deleteLoanAccount);
router.get("/:id", loanAccount_1.loanAccountController.getBankAccountDetailsById);
router.put("/:id", loanAccount_1.loanAccountController.updateBankAccountDetailsById);
exports.default = router;
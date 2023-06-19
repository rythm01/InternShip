"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bankAccount_1 = require("../../../controllers/apis/v1/bankAccount");
const verifyUsers_1 = require("../../../../middlewares/verifyUsers");
const router = (0, express_1.Router)();
router.use(verifyUsers_1.authenticateUser);
router.post("/bank-password", bankAccount_1.bankAccountController.postBankAccount);
// router.get('/user', authController.getUser);
exports.default = router;

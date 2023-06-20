"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyUsers_1 = require("../../../../middlewares/verifyUsers");
const payments_1 = require("../../../controllers/apis/v1/payments");
const router = (0, express_1.Router)();
router.use(verifyUsers_1.authenticateUser);
router.post('/', payments_1.paymentController.createPaymentIntent);
exports.default = router;

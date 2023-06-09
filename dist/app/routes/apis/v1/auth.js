"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../../controllers/apis/v1/auth");
const router = (0, express_1.Router)();
router.post('/login', auth_1.authController.login);
router.post('/login-google', auth_1.authController.loginWithGoogle);
router.post('/login-admin', auth_1.authController.loginAdmin);
router.post('/register', auth_1.authController.register);
router.post('/register-admin', auth_1.authController.registerAdmin);
router.post('/2fa', auth_1.authController.twoFactorAuth);
router.post('/resend', auth_1.authController.resendCode);
router.post('/forgot-password', auth_1.authController.sendForgotPasswordOTP);
router.post('/change-password', auth_1.authController.changePassword);
// router.get('/user', authController.getUser);
exports.default = router;

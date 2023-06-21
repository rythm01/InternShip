"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const config_1 = require("../../../../config");
const verifyUsers_1 = require("../../../../middlewares/verifyUsers");
const profile_1 = require("../../../controllers/apis/v1/profile");
const router = (0, express_1.Router)();
router.use(verifyUsers_1.authenticateUser);
router.route('/')
    .get(profile_1.profileController.find)
    .post(config_1.uploadFile.single('file'), profile_1.profileController.create)
    .put(config_1.uploadFile.single('file'), profile_1.profileController.update);
// router.get('/user', authController.getUser);
exports.default = router;

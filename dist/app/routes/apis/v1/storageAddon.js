"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyUsers_1 = require("../../../../middlewares/verifyUsers");
const storageAddon_1 = require("../../../controllers/apis/v1/storageAddon");
const router = (0, express_1.Router)();
router.get('/', storageAddon_1.storageAddonController.getStorageAddons);
router.get('/:id', storageAddon_1.storageAddonController.getStorageAddon);
router.use(verifyUsers_1.authenticateAdminUser);
router.post("/", storageAddon_1.storageAddonController.createStorageAddons);
router.route('/:id').put(storageAddon_1.storageAddonController.updateStorageAddon).delete(storageAddon_1.storageAddonController.deleteStorageAddon);
// router.get('/user', authController.getUser);
exports.default = router;

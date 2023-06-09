"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationController = void 0;
const config_1 = require("../../../../config");
const notification_1 = require("../../../models/notification");
const UserAuth_1 = require("../../../models/UserAuth");
const userRepo = config_1.AppDataSource.getRepository(UserAuth_1.UserAuth);
const notificationRepo = config_1.AppDataSource.getRepository(notification_1.Notification);
exports.notificationController = {
    getNotifications: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userRepo.findOne({ where: { id: req.user } });
            if (!user) {
                return res.status(200).json({ success: false, message: 'User does not exist' });
            }
            const notification = yield notificationRepo.find({ where: { email: user.email } });
            if (!notification) {
                return res.status(200).json({ success: false, message: 'No notification found' });
            }
            return res.status(200).json({ success: true, message: 'Notification found', data: notification });
        }
        catch (error) {
            console.log(error);
            return res.status(200).json({ success: false, message: 'Internal server error' });
        }
    }),
};

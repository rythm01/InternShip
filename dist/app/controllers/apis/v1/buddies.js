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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buddyController = void 0;
const config_1 = require("../../../../config");
const Buddies_1 = __importDefault(require("../../../models/Buddies"));
const UserAuth_1 = require("../../../models/UserAuth");
const notification_1 = require("../../../models/notification");
const config_2 = require("../../../../config");
const invitation_1 = __importDefault(require("../../../models/invitation"));
const buddyRepo = config_1.AppDataSource.getRepository(Buddies_1.default);
const authRepo = config_1.AppDataSource.getRepository(UserAuth_1.UserAuth);
const invitationRepo = config_1.AppDataSource.getRepository(invitation_1.default);
const notificationRepo = config_1.AppDataSource.getRepository(notification_1.Notification);
exports.buddyController = {
    getBuddies: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield authRepo.findOne({ where: { id: req.user } });
        const buddies = yield buddyRepo.find({
            where: { user: { id: user === null || user === void 0 ? void 0 : user.id } },
            select: {
                id: true,
                relationshipStatus: true,
                buddyType: true,
                buddyStatus: true,
                buddy: {
                    id: true,
                    email: true,
                },
                user: {
                    id: true,
                    email: true,
                },
                createdAt: true,
                updatedAt: true,
            },
            relations: ["user", "buddy"],
        });
        const invitations = yield invitationRepo.find({
            where: { user: { id: user === null || user === void 0 ? void 0 : user.id } },
            relations: ["user"],
        });
        return res.status(200).json({
            success: true,
            message: "Buddies fetched",
            buddies,
            invitations,
        });
    }),
    addBuddy: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, relation, type } = req.body;
        const buddy = yield authRepo.findOne({ where: { email: email } });
        const user = yield authRepo.findOne({ where: { id: req.user } });
        var primeBuddyExists = yield buddyRepo.find({
            where: { user: { id: user === null || user === void 0 ? void 0 : user.id }, buddyType: "subprime" },
        });
        console.log(primeBuddyExists);
        var extBuddies = yield buddyRepo.find({
            where: { user: { id: user === null || user === void 0 ? void 0 : user.id }, buddy: { id: buddy === null || buddy === void 0 ? void 0 : buddy.id } },
        });
        var extInvitations = yield invitationRepo.find({
            where: { user: { id: user === null || user === void 0 ? void 0 : user.id }, buddy: email },
        });
        var extNotifications = yield notificationRepo.find({
            where: { email: email, type: "buddy" },
        });
        if (extBuddies.length > 0) {
            return res
                .status(200)
                .json({ success: false, message: "Buddy already exists" });
        }
        if (extInvitations.length > 0) {
            return res
                .status(200)
                .json({ success: false, message: "Buddy invitation already sent" });
        }
        // if (extNotifications.length > 0) {
        //     return res.status(200).json({ success: false, message: "Buddy invitation already sent" });
        // }
        var notification = new notification_1.Notification();
        notification.email = email;
        notification.message = "You have a new buddy request";
        notification.type = "buddy";
        notification.status = "unread";
        notification.data = JSON.stringify({
            email: email,
            relation: relation,
            type: "buddy",
            inviterId: req.user,
            inviterEmail: user === null || user === void 0 ? void 0 : user.email,
        });
        yield notificationRepo.save(notification);
        if (!buddy) {
            var invitation = new invitation_1.default();
            invitation.buddy = email;
            invitation.relationshipStatus = relation;
            invitation.buddyType =
                primeBuddyExists.length >= 1 ? "buddy" : "subprime";
            invitation.buddyStatus = "Invited";
            invitation.user = user;
            yield invitationRepo.save(invitation);
            const mailOptions = {
                from: "Store And Share Vault",
                to: email,
                subject: "Buddy Request",
                html: `<p>Hi ${email.split("@")[0]},</p><br/><p> ${user === null || user === void 0 ? void 0 : user.email.split("@")[0]} would like to add you as a Buddy on their Store and Share Vault Account! Click the link below to register:</p><br/><a href="https://app.sandsvault.io/signup">https://app.sandsvault.io/signup</a><br/><p>Once you register, you will be able to access your buddy's account and view their files.</p><br/><p>Thanks,</p><br/><p>Store and Share Vault Team</p>`,
            };
            config_2.transporter.sendMail(mailOptions, function (error, info) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (error) {
                        console.log(error);
                    }
                    else {
                    }
                });
            });
            return res
                .status(200)
                .json({ success: true, message: "Buddy request sent" });
        }
        var newBuddy = new Buddies_1.default();
        newBuddy.user = user;
        newBuddy.buddy = buddy;
        newBuddy.relationshipStatus = relation;
        newBuddy.buddyType = primeBuddyExists.length >= 1 ? "buddy" : "subprime";
        newBuddy.buddyStatus = "pending";
        yield buddyRepo.save(newBuddy);
        return res
            .status(200)
            .json({ success: true, message: "Buddy request sent" });
    }),
    acceptBuddy: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.body;
            const user = yield authRepo.findOne({ where: { id: req.user } });
            const invitation = yield invitationRepo.findOne({
                where: { user: { id: id }, buddy: user === null || user === void 0 ? void 0 : user.email },
            });
            if (invitation) {
                var newBuddy = new Buddies_1.default();
                newBuddy.user = invitation.user;
                newBuddy.buddy = user;
                newBuddy.relationshipStatus = invitation.relationshipStatus;
                newBuddy.buddyType = invitation.buddyType;
                newBuddy.buddyStatus = "accepted";
                yield buddyRepo.save(newBuddy);
                yield invitationRepo.delete(invitation.id);
                return res
                    .status(200)
                    .json({ success: true, message: "Buddy request accepted" });
            }
            const buddy = yield buddyRepo.findOne({
                where: { user: { id: id }, buddy: { id: user === null || user === void 0 ? void 0 : user.id } },
            });
            if (buddy) {
                buddy.buddyStatus = "accepted";
                yield buddyRepo.save(buddy);
                return res
                    .status(200)
                    .json({ success: true, message: "Buddy request accepted" });
            }
            return res
                .status(200)
                .json({ success: false, message: "Buddy request not found" });
        }
        catch (err) { }
    }),
    getBuddy: (req, res) => __awaiter(void 0, void 0, void 0, function* () { }),
    updateBuddy: (req, res) => __awaiter(void 0, void 0, void 0, function* () { }),
    deleteBuddy: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { type, id } = req.body;
            if (type === "BD") {
                const buddy = yield buddyRepo.findOne({ where: { id: id } });
                yield buddyRepo.delete(buddy === null || buddy === void 0 ? void 0 : buddy.id);
            }
            else {
                const invitation = yield invitationRepo.findOne({ where: { id: id } });
                yield invitationRepo.delete(invitation === null || invitation === void 0 ? void 0 : invitation.id);
            }
            return res.status(200).json({ success: true, message: "Buddy deleted" });
        }
        catch (err) {
            console.log(err);
            return res
                .status(200)
                .json({ success: false, message: "Something went wrong" });
        }
    }),
};

import { AppDataSource } from "../../../../config";
import { Response } from "express";
import { Request } from "../../../../utils/@types";
import Buddy from "../../../models/Buddies";
import { UserAuth } from "../../../models/UserAuth";
import { Notification } from "../../../models/notification";
import { transporter } from "../../../../config";
import BuddyInvitation from "../../../models/invitation";

const buddyRepo = AppDataSource.getRepository(Buddy);
const authRepo = AppDataSource.getRepository(UserAuth);
const invitationRepo = AppDataSource.getRepository(BuddyInvitation);
const notificationRepo = AppDataSource.getRepository(Notification);

export const buddyController = {
  getBuddies: async (req: Request, res: Response) => {
    const user = await authRepo.findOne({ where: { id: req.user as any } });
    const buddies = await buddyRepo.find({
      where: { user: { id: user?.id } },
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
    const invitations = await invitationRepo.find({
      where: { user: { id: user?.id } },
      relations: ["user"],
    });
    return res.status(200).json({
      success: true,
      message: "Buddies fetched",
      buddies,
      invitations,
    });
  },

  addBuddy: async (req: Request, res: Response) => {
    const { email, relation, type } = req.body;

    const buddy = await authRepo.findOne({ where: { email: email } });
    const user = await authRepo.findOne({ where: { id: req.user as any } });

    var primeBuddyExists = await buddyRepo.find({
      where: { user: { id: user?.id }, buddyType: "subprime" },
    });
    console.log(primeBuddyExists);

    var extBuddies = await buddyRepo.find({
      where: { user: { id: user?.id }, buddy: { id: buddy?.id } },
    });
    var extInvitations = await invitationRepo.find({
      where: { user: { id: user?.id }, buddy: email },
    });
    var extNotifications = await notificationRepo.find({
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
    var notification = new Notification();
    notification.email = email;
    notification.message = "You have a new buddy request";
    notification.type = "buddy";
    notification.status = "unread";
    notification.data = JSON.stringify({
      email: email,
      relation: relation,
      type: "buddy",
      inviterId: req.user,
      inviterEmail: user?.email,
    });
    await notificationRepo.save(notification);
    if (!buddy) {
      var invitation = new BuddyInvitation();
      invitation.buddy = email;
      invitation.relationshipStatus = relation;
      invitation.buddyType =
        primeBuddyExists.length >= 1 ? "buddy" : "subprime";
      invitation.buddyStatus = "Invited";
      invitation.user = user!;

      await invitationRepo.save(invitation);

      const mailOptions = {
        from: "Store And Share Vault",
        to: email,
        subject: "Buddy Request",
        html: `<p>Hi ${email.split("@")[0]},</p><br/><p> ${
          user?.email.split("@")[0]
        } would like to add you as a Buddy on their Store and Share Vault Account! Click the link below to register:</p><br/><a href="https://app.sandsvault.io/signup">https://app.sandsvault.io/signup</a><br/><p>Once you register, you will be able to access your buddy's account and view their files.</p><br/><p>Thanks,</p><br/><p>Store and Share Vault Team</p>`,
      };

      transporter.sendMail(mailOptions, async function (error, info) {
        if (error) {
          console.log(error);
        } else {
        }
      });

      return res
        .status(200)
        .json({ success: true, message: "Buddy request sent" });
    }

    var newBuddy = new Buddy();
    newBuddy.user = user!;
    newBuddy.buddy = buddy;
    newBuddy.relationshipStatus = relation;
    newBuddy.buddyType = primeBuddyExists.length >= 1 ? "buddy" : "subprime";
    newBuddy.buddyStatus = "pending";

    await buddyRepo.save(newBuddy);

    return res
      .status(200)
      .json({ success: true, message: "Buddy request sent" });
  },

  acceptBuddy: async (req: Request, res: Response) => {
    try {
      const { id } = req.body;

      const user = await authRepo.findOne({ where: { id: req.user as any } });

      const invitation = await invitationRepo.findOne({
        where: { user: { id: id }, buddy: user?.email },
      });

      if (invitation) {
        var newBuddy = new Buddy();
        newBuddy.user = invitation.user;
        newBuddy.buddy = user!;
        newBuddy.relationshipStatus = invitation.relationshipStatus;
        newBuddy.buddyType = invitation.buddyType;
        newBuddy.buddyStatus = "accepted";

        await buddyRepo.save(newBuddy);

        await invitationRepo.delete(invitation.id!);

        return res
          .status(200)
          .json({ success: true, message: "Buddy request accepted" });
      }

      const buddy = await buddyRepo.findOne({
        where: { user: { id: id }, buddy: { id: user?.id } },
      });

      if (buddy) {
        buddy.buddyStatus = "accepted";
        await buddyRepo.save(buddy);

        return res
          .status(200)
          .json({ success: true, message: "Buddy request accepted" });
      }

      return res
        .status(200)
        .json({ success: false, message: "Buddy request not found" });
    } catch (err) {}
  },

  getBuddy: async (req: Request, res: Response) => {},

  updateBuddy: async (req: Request, res: Response) => {},

  deleteBuddy: async (req: Request, res: Response) => {
    try {
      const { type, id } = req.body;

      if (type === "BD") {
        const buddy = await buddyRepo.findOne({ where: { id: id } });
        await buddyRepo.delete(buddy?.id!);
      } else {
        const invitation = await invitationRepo.findOne({ where: { id: id } });
        await invitationRepo.delete(invitation?.id!);
      }

      return res.status(200).json({ success: true, message: "Buddy deleted" });
    } catch (err) {
      console.log(err);
      return res
        .status(200)
        .json({ success: false, message: "Something went wrong" });
    }
  },
};

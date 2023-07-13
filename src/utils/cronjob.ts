import { AppDataSource, transporter } from "../config";
import cron from "node-cron";
const interval = "*/10 * * * * *";
import moment from "moment";
import { Verification } from "../app/models/verification";
import { UserAuth } from "../app/models/UserAuth";
import { UserProfile } from "../app/models/UserProfile";
import { Permission } from "../app/models/permissions";
import Buddy from "../app/models/Buddies";
import File from "../app/models/File";
import Folder from "../app/models/Folder";
import BankAccountPassword from "../app/models/BankAccountPassword";
import LoanAccountPassword from "../app/models/LoanAccountPassword";
import MerchantAccountPassword from "../app/models/MerchantAccountPassword";
import CreditCardPassword from "../app/models/CreditCardPassword";
import MiscPasswordStorage from "../app/models/MiscPasswordForm";
import PasswordStorage from "../app/models/PasswordStorageForm";
import RecipeForm from "../app/models/RecipeForm";

const VerificationRepo = AppDataSource.getRepository(Verification);
const UserAuthRepo = AppDataSource.getRepository(UserAuth);
const UserProfileRepo = AppDataSource.getRepository(UserProfile);
const PermissionRepo = AppDataSource.getRepository(Permission);
const BuddiesRepo = AppDataSource.getRepository(Buddy);
const FileRepo = AppDataSource.getRepository(File);
const FolderRepo = AppDataSource.getRepository(Folder);
const BankAccountRepo = AppDataSource.getRepository(BankAccountPassword);
const LoanAccountRepo = AppDataSource.getRepository(LoanAccountPassword);
const MerchantAccountRepo = AppDataSource.getRepository(
  MerchantAccountPassword
);
const CreditCardRepo = AppDataSource.getRepository(CreditCardPassword);
const MiscPasswordRepo = AppDataSource.getRepository(MiscPasswordStorage);
const PasswordStorageRepo = AppDataSource.getRepository(PasswordStorage);
const RecipeRepo = AppDataSource.getRepository(RecipeForm);

const sendEmail = async (row: any) => {
  const mailOptions = {
    from: "smtp@gmail.com",
    to: row.email,
    subject: "Verification Email",
    html: `
      <p>Please click the button below to verify your email:</p>
      <a href="${process.env.CLIENT_URL}/home/verify-user">Verify Email</a>
    `,
    // html: `<p>Hi ${email.split("@")[0]},</p><br/><p> ${
    //   email.split("@")[0]
    // } would like to add you as a Buddy on their Store and Share Vault Account! Click the link below to register:</p><br/><a href="https://app.sandsvault.io/signup">https://app.sandsvault.io/signup</a><br/><p>Once you register, you will be able to access your buddy's account and view their files.</p><br/><p>Thanks,</p><br/><p>Store and Share Vault Team</p>`,
  };

  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
    } else {
      const verificationData = await VerificationRepo.createQueryBuilder(
        "verification"
      )
        .where("verification.userAuth = :userAuth", {
          userAuth: row.userAuth.id,
        })
        .getOne();

      const newReponse: any = {
        ...verificationData,
        email_sent_for_verification: true,
        email_sent_expire_date: moment().add(1, "day"),
      };

      VerificationRepo.save(newReponse);
    }
  });
};

const performActions = (userId: string) => {
  console.log(`Actions performed for user with ID ${userId}`);
};

const checkVerificationStatus = async () => {
  const verificationQuery = "SELECT * from verification";

  AppDataSource.query(verificationQuery)
    .then((results: any[]) => {
      results.forEach(async (row: any) => {
        if (
          moment(row.dateJoined, "DD/MM/YYYY")
            .add(row.verficationPeriod, "days")
            .isBefore(moment(), "day")
        ) {
          if (row.email_sent_for_verification) {
            if (
              moment().isAfter(
                moment(row.email_sent_expire_date, "DD/MM/YYYY"),
                "day"
              )
            ) {
              const getSubPrimeBuddy = await BuddiesRepo.findOne({
                where: {
                  user: { id: row.userAuth.id },
                  buddyType: "subprime",
                },
              });
              const getProfileOfUser = await UserProfileRepo.findOne({
                where: {
                  userAuth: { id: row.userAuth.id },
                },
                select: ["id"],
              });
              const getUserProfileIdWithBuddyId = await UserProfileRepo.findOne(
                {
                  where: {
                    userAuth: { id: getSubPrimeBuddy?.buddy.id },
                  },
                  select: ["id"],
                }
              );
              const userId = {
                user: {
                  id: getUserProfileIdWithBuddyId?.id,
                },
              };

              const userProId = {
                userProfile: {
                  id: getUserProfileIdWithBuddyId?.id,
                },
              };

              await FileRepo.update(userId, {
                user: { id: getProfileOfUser?.id },
              });
              await FolderRepo.update(userId, {
                user: { id: getProfileOfUser?.id },
              });
              await BankAccountRepo.update(userProId, {
                userProfile: { id: getProfileOfUser?.id },
              });
              await LoanAccountRepo.update(userProId, {
                userProfile: { id: getProfileOfUser?.id },
              });
              await MerchantAccountRepo.update(userProId, {
                userProfile: { id: getProfileOfUser?.id },
              });
              await MiscPasswordRepo.update(userProId, {
                userProfile: { id: getProfileOfUser?.id },
              });
              await CreditCardRepo.update(userProId, {
                userProfile: { id: getProfileOfUser?.id },
              });
              await PasswordStorageRepo.update(userProId, {
                userProfile: { id: getProfileOfUser?.id },
              });
              await RecipeRepo.update(userProId, {
                userProfile: { id: getProfileOfUser?.id },
              });

              await PermissionRepo.delete({
                userAuth: { id: row.userAuth.id },
              });
              await UserAuthRepo.delete({
                id: row.userAuth.id,
              });
              await UserProfileRepo.delete({
                id: getProfileOfUser?.id,
              });
              await BuddiesRepo.delete({
                user: { id: row.userAuth.id },
              });
            }
          } else {
            cron.schedule(interval, async () => {
              sendEmail(row);
            });
          }
        }
      });
    })
    .catch((error: any) => {
      console.error("Error retrieving users from the database:", error);
    });

  //   if (verified) {
  //     performActions(userId);
  //   } else {
  //     sendEmail("user@example.com");
  //   }
};

export const scheduleCronJob = async () => {
  checkVerificationStatus();
};

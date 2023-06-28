import { AppDataSource, transporter } from "../config";
import cron from "node-cron";
const interval = "*/10 * * * * *";
import moment from "moment";
import { Verification } from "../app/models/verification";

const VerificationRepo = AppDataSource.getRepository(Verification);

const sendEmail = async (row: any) => {
  const mailOptions = {
    from: "smtp@gmail.com",
    to: row.email,
    subject: "Verification Email",
    html: `
      <p>Please click the button below to verify your email:</p>
      <a href="https://app.sandsvault.io/signup">Verify Email</a>
    `,
    // html: `<p>Hi ${email.split("@")[0]},</p><br/><p> ${
    //   email.split("@")[0]
    // } would like to add you as a Buddy on their Store and Share Vault Account! Click the link below to register:</p><br/><a href="https://app.sandsvault.io/signup">https://app.sandsvault.io/signup</a><br/><p>Once you register, you will be able to access your buddy's account and view their files.</p><br/><p>Thanks,</p><br/><p>Store and Share Vault Team</p>`,
  };

  console.log(row);

  const verificationData = await VerificationRepo.findOne({
    where: {
      userAuth: { id: row.userAuth.id },
    },
    relations: ["userAuth"],
  });

  console.log(verificationData, "email");

  // transporter.sendMail(mailOptions, async (error, info) => {
  //   if (error) {
  //     console.error("Error sending email: ", error);
  //   } else {
  //     console.log("Email sent: ", info.response);
  //     const verificationData = await VerificationRepo.createQueryBuilder(
  //       "verification"
  //     )
  //       .where("verification.userAuth = :userAuth", {
  //         userAuth: row.userAuth.id,
  //       })
  //       .getOne();

  //     console.log(verificationData, "email");

  //     const newReponse = {
  //       ...verificationData,
  //       email_sent_for_verification: true,
  //       email_sent_expire_date: moment().add(1, "day"),
  //     };

  //     VerificationRepo.save(newReponse);
  //   }
  // });
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
          moment("20/06/2023", "DD/MM/YYYY")
            .add(row.verficationPeriod, "days")
            .isBefore(moment(), "day")
        ) {
          console.log(row);
          if (row.email_sent_for_verification) {
            if (!moment(row.email_sent_expire_date).isBefore(moment(), "day")) {
              const verificationData =
                await VerificationRepo.createQueryBuilder("verification")
                  .where("verification.userAuth = :userAuth", {
                    userAuth: row.userAuth.id,
                  })
                  .getOne();
              console.log(verificationData, "normal");
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

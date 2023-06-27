import { AppDataSource, transporter } from "../config";
import cron from "node-cron";
const interval = "*/10 * * * * *";
import moment from "moment";
import { Verification } from "../app/models/verification";

const VerificationRepo = AppDataSource.getRepository(Verification);

const sendEmail = (email: string) => {
  const mailOptions = {
    from: "smtp@gmail.com",
    to: email,
    subject: "Verification Email",
    html: `
      <p>Please click the button below to verify your email:</p>
      <a href="https://app.sandsvault.io/signup">Verify Email</a>
    `,
    // html: `<p>Hi ${email.split("@")[0]},</p><br/><p> ${
    //   email.split("@")[0]
    // } would like to add you as a Buddy on their Store and Share Vault Account! Click the link below to register:</p><br/><a href="https://app.sandsvault.io/signup">https://app.sandsvault.io/signup</a><br/><p>Once you register, you will be able to access your buddy's account and view their files.</p><br/><p>Thanks,</p><br/><p>Store and Share Vault Team</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
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
      results.forEach((row: any) => {
        if (
          moment(row.dateJoined)
            .add(row.verficationPeriod, "days")
            .isBefore(moment(), "day")
        ) {
          if (row?.email_sent_for_verification) {
            if (moment(row?.email_sent_date).isBefore(moment(), "day")) {
              const response = VerificationRepo.findOne({
                where: {
                  userAuth: { id: row.userAuth.id },
                },
              });
            }
          } else {
            cron.schedule("0 0 * * *", () => {
              sendEmail(row.email);
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

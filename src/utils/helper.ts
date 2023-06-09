export const PERMISSION_FORM_TYPE_ENUMS = {
  BANK_ACCOUNT_FORM_TYPE_ENUM: "bank-account",
  CREDIT_CARD_FORM_TYPE_ENUM: "credit-card",
  LOAN_ACCOUNT_FORM_TYPE_ENUM: "loan-account",
  MERCHANT_ACCOUNT_FORM_TYPE_ENUM: "merchant-account",
  MISC_PASSWORD_FORM_TYPE_ENUM: "misc-password",
  PASSWORD_STORAGE_FORM_TYPE_ENUM: "password-storage",
  RECIPE_FORM_TYPE_ENUM: "recipe-storage",
};

export const mailOptions = (email: any, user: any) => {
  return {
    from: "Store And Share Vault",
    to: email,
    subject: "Buddy Request",
    html: `<p>Hi ${email.split("@")[0]},</p><br/><p> ${
      user?.email.split("@")[0]
    } would like to add you as a Buddy on their Store and Share Vault Account! Click the link below to register:</p><br/><a href="https://app.sandsvault.io/signup">https://app.sandsvault.io/signup</a><br/><p>Once you register, you will be able to access your buddy's account and view their files.</p><br/><p>Thanks,</p><br/><p>Store and Share Vault Team</p>`,
  };
};

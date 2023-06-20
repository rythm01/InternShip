import { Router } from "express";

const app = Router();

app.use("/auth", require("./auth").default);
app.use("/files", require("./files").default);
app.use("/profile", require("./profile").default);
app.use("/folders", require("./folders").default);
app.use("/payments", require("./payments").default);
app.use("/plans", require("./plans").default);
app.use("/video-addons", require("./videoAddon").default);
app.use("/notifications", require("./notification").default);
app.use("/buddies", require("./buddies").default);
app.use("/permissions", require("./permissions").default);
app.use("/storage-addons", require("./storageAddon").default);
app.use("/password-type/bank-password", require("./bankAccount").default);

export default app;

import express from "express";
import cors from "cors";

import routes from "./routes/index";
import cron from "node-cron";
import { UserProfile } from "./models/UserProfile";
import { scheduleCronJob } from "../utils/cronjob";
const interval = "*/10 * * * * *";

// const UserProfileRepo = AppDataSource.getRepository(UserProfile);

const app = express();
// cron.schedule(interval, () => {
//   scheduleCronJob();
// });
app.use(cors());
app.use(express.json());
app.use("/", routes);

export default app;

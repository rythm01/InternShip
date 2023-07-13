import { Router } from "express";
import { authenticateUser } from "../../../../middlewares/verifyUsers";
import { paymentController } from "../../../controllers/apis/v1/payments";

const router = Router();

router.use(authenticateUser);

router.post("/", paymentController.createPaymentIntent);
router.get("/live-config", paymentController.sendPublishableKey);
router.get("/completion", paymentController.verifySessionId);

export default router;

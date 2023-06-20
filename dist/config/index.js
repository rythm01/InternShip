"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripe = exports.uploadFile = exports.transporter = exports.s3 = exports.twilio = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const twilio_1 = __importDefault(require("twilio"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_smtp_transport_1 = __importDefault(require("nodemailer-smtp-transport"));
const multer_1 = __importDefault(require("multer"));
const AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
    port: 5432,
    entities: ["src/app/models/*{.ts,.js}"],
    synchronize: true,
    logging: true,
    ssl: false, // Disable SSL
});
exports.AppDataSource = AppDataSource;
const twilio = (0, twilio_1.default)(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
exports.twilio = twilio;
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_STORAGE_REGION,
});
exports.s3 = s3;
var transporter = nodemailer_1.default.createTransport((0, nodemailer_smtp_transport_1.default)({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    },
}));
exports.transporter = transporter;
const uploadFile = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
});
exports.uploadFile = uploadFile;
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST_KEY);
exports.stripe = stripe;

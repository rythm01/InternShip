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
exports.authController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../../../config");
const UserAuth_1 = require("../../../models/UserAuth");
const admin_1 = require("../../../models/admin");
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateOtp_1 = __importDefault(require("../../../../utils/generateOtp"));
const google_auth_library_1 = require("google-auth-library");
const UserRepo = config_1.AppDataSource.getRepository(UserAuth_1.UserAuth);
const AdminRepo = config_1.AppDataSource.getRepository(admin_1.Admin);
exports.authController = {
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const user = yield UserRepo.findOne({ where: { email } });
            if (!user) {
                return res.status(200).json({ message: 'User not found', success: false });
            }
            const isMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!isMatch) {
                return res.status(200).json({ message: 'Incorrect password', success: false });
            }
            if (!user.is2fa) {
                const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || "hcjhad7842687ahdcb");
                return res.json({ token, user, success: true, is2fa: false });
            }
            const OTP = (0, generateOtp_1.default)();
            config_1.twilio.messages.create({
                body: `Hi! ${user.name} your Store And Share Vault verification OTP is ${OTP}..`,
                to: user.phoneNumber,
                from: process.env.TWILIO_PHONE
            }).then((message) => __awaiter(void 0, void 0, void 0, function* () {
                if (!message.sid)
                    return res.status(200).json({ success: false, message: 'Something went wrong!' });
                var date = new Date();
                user.generatedOTP = OTP;
                user.otpExpiresIn = new Date(date.getTime() + 300000);
                yield UserRepo.save(user);
                return res.json({ id: user.id, success: true, message: 'OTP sent successfully', is2fa: true });
            })).catch((error) => {
                console.error(error);
                return res.json({ success: false, message: 'Something went wrong!' });
            });
        }
        catch (error) {
            console.log(error);
            res.status(200).json({ success: false, message: 'Something went wrong' });
        }
    }),
    loginWithGoogle: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
            var ticket = yield client.verifyIdToken({ idToken: req.body.credential, audience: process.env.GOOGLE_CLIENT_ID });
            var data = ticket.getPayload();
            if (!data) {
                return res.status(200).json({ success: false, message: 'Something went wrong' });
            }
            const user = yield UserRepo.findOne({ where: { email: data.email } });
            if (!user) {
                return res.status(200).json({ success: false, message: 'User not found' });
            }
            if (!user.is2fa) {
                const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || "hcjhad7842687ahdcb");
                return res.json({ token, user, success: true, is2fa: false });
            }
            const OTP = (0, generateOtp_1.default)();
            config_1.twilio.messages.create({
                body: `Hi! ${user.name} your Store And Share Vault verification OTP is ${OTP}..`,
                to: user.phoneNumber,
                from: process.env.TWILIO_PHONE
            }).then((message) => __awaiter(void 0, void 0, void 0, function* () {
                if (!message.sid)
                    return res.status(200).json({ success: false, message: 'Something went wrong!' });
                var date = new Date();
                user.generatedOTP = OTP;
                user.otpExpiresIn = new Date(date.getTime() + 300000);
                yield UserRepo.save(user);
                return res.json({ id: user.id, success: true, message: 'OTP sent successfully', is2fa: true });
            })).catch((error) => {
                console.error(error);
                return res.json({ success: false, message: 'Something went wrong!' });
            });
        }
        catch (error) {
            console.log(error);
            return res.status(200).json({ success: false, message: 'Something went wrong' });
        }
    }),
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, email, password, phoneNumber } = req.body;
            if (!name || !email || !password || !phoneNumber) {
                return res.status(200).json({ message: 'Please fill all the fields', success: false });
            }
            const user = yield UserRepo.findOne({ where: [{ phoneNumber }, { email }] });
            if (user) {
                return res.status(200).json({ message: 'User already exists', success: false });
            }
            const newUser = new UserAuth_1.UserAuth();
            newUser.name = name;
            newUser.email = email;
            newUser.password = bcrypt_1.default.hashSync(password, 10);
            newUser.phoneNumber = phoneNumber;
            yield UserRepo.save(newUser);
            // const mailOptions = {
            //     from: 'Store And Share Vault',
            //     to: email,
            //     subject: 'Welcome Email',
            //     html: `<p>${name}</p>
            //     <p>Welcome to Store &amp; Share Vault, your central location for managing and sharing important files, documents and photos with loved ones. Let others know you care about them by adding them as a Buddy and sharing this information with them in a closed network. Find comfort in the fact that you and your loved ones will never have to frantically search for important information ever again!</p>
            //     <p>Feel free to reach out to our Customer Support Team at anytime with questions, comments or concerns. Info@StoreAndShareVault.io</p>`,
            // };
            // transporter.sendMail(mailOptions, async function (error, info) {
            //     if (error) {
            //         console.log(error);
            //     } else {
            //     }
            // });
            //Sending registraion success message
            if (!newUser.is2fa) {
                const token = jsonwebtoken_1.default.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET || "hcjhad7842687ahdcb");
                return res.json({ token, newUser, success: true, is2fa: false });
            }
            // console.log(name + email + password + phoneNumber);
            // Generate OTP
            const OTP = (0, generateOtp_1.default)();
            // Send OTP to the user's phone number
            config_1.twilio.messages.create({
                body: `Hi! ${newUser.name}, your Store And Share Vault verification OTP is ${OTP}..`,
                to: newUser.phoneNumber,
                from: process.env.TWILIO_PHONE
            }).then((message) => __awaiter(void 0, void 0, void 0, function* () {
                if (!message.sid) {
                    // Handle error when OTP sending fails
                    console.error('Failed to send OTP');
                }
                else {
                    // Save the generated OTP and its expiration time
                    const date = new Date();
                    newUser.generatedOTP = OTP;
                    newUser.otpExpiresIn = new Date(date.getTime() + 300000);
                    yield UserRepo.save(newUser);
                    // Handle successful OTP sending
                    return res.json({ id: newUser.id, success: true, message: 'OTP sent successfully', is2fa: true });
                }
            })).catch((error) => {
                // Handle error when OTP sending fails
                console.error(error);
                return res.json({ success: false, message: 'Something went wrong!' });
            });
        }
        catch (error) {
            console.log(error);
            res.status(200).json({ success: false, message: 'Something went wrong' });
        }
    }),
    twoFactorAuth: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id, otp } = req.body;
            const user = yield UserRepo.findOne({ where: { id } });
            if (!user) {
                return res.json({ success: false, message: 'User not found' });
            }
            //check otp is correct or not
            if (user.generatedOTP != otp) {
                return res.json({ success: false, message: 'Incorrect OTP' });
            }
            //check otp is expired or not
            if (user.otpExpiresIn < new Date()) {
                return res.json({ success: false, message: 'OTP expired' });
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || "hcjhad7842687ahdcb");
            return res.json({ success: true, token });
        }
        catch (error) {
            console.log(error);
            res.status(200).json({ success: true, message: 'Something went wrong' });
        }
    }),
    resendCode: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.body;
            const otp = (0, generateOtp_1.default)();
            const user = yield UserRepo.findOne({ where: { id } });
            if (!user) {
                return res.json({ success: false, message: 'User not found' });
            }
            config_1.twilio.messages.create({
                body: `Hi! ${user.name} your verification OTP is ${otp}.`,
                to: user.phoneNumber,
                from: process.env.TWILIO_PHONE
            }).then((message) => __awaiter(void 0, void 0, void 0, function* () {
                if (!message.sid)
                    return res.status(200).json({ success: false, message: 'Something went wrong!' });
                var date = new Date();
                user.generatedOTP = otp;
                user.otpExpiresIn = new Date(date.getTime() + 300000);
                yield UserRepo.save(user);
                return res.json({ success: true, message: 'OTP sent successfully' });
            })).catch((error) => {
                console.error(error);
                return res.json({ success: false, message: 'Something went wrong!' });
            });
        }
        catch (error) {
            console.log(error);
            res.status(200).json({ message: 'Something went wrong', success: false });
        }
    }),
    sendForgotPasswordOTP: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email } = req.body;
            const user = yield UserRepo.findOne({ where: { email } });
            if (!user) {
                return res.json({ success: false, message: 'User not found' });
            }
            const OTP = (0, generateOtp_1.default)();
            config_1.twilio.messages.create({
                body: `Hi! ${user.name} your verification OTP is ${OTP} for forgot password request.`,
                to: user.phoneNumber,
                from: process.env.TWILIO_PHONE
            }).then((message) => __awaiter(void 0, void 0, void 0, function* () {
                if (!message.sid)
                    return res.status(200).json({ success: false, message: 'Something went wrong!' });
                var date = new Date();
                user.generatedOTP = OTP;
                user.otpExpiresIn = new Date(date.getTime() + 300000);
                yield UserRepo.save(user);
                return res.json({ id: user.id, success: true, message: 'OTP sent successfully' });
            })).catch((error) => {
                console.error(error);
                return res.json({ success: false, message: 'Something went wrong!' });
            });
        }
        catch (error) {
            console.log(error);
            return res.status(200).json({ success: false, message: 'Something went wrong' });
        }
    }),
    changePassword: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password, otp } = req.body;
            const user = yield UserRepo.findOne({ where: { email } });
            if (!user) {
                return res.json({ success: false, message: 'User not found' });
            }
            //check otp is correct or not
            if (user.generatedOTP != otp) {
                return res.json({ success: false, message: 'Incorrect OTP' });
            }
            //check otp is expired or not
            if (user.otpExpiresIn < new Date()) {
                return res.json({ success: false, message: 'OTP expired' });
            }
            const newPassword = bcrypt_1.default.hashSync(password, 10);
            user.password = newPassword;
            UserRepo.save(user);
            return res.json({ success: true, message: 'Password changed successfully' });
        }
        catch (error) {
            console.log(error);
            return res.status(200).json({ success: false, message: 'Something went wrong' });
        }
    }),
    loginAdmin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const user = yield AdminRepo.findOne({ where: { email } });
            if (!user) {
                return res.status(200).json({ message: 'User not found', success: false });
            }
            const isMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!isMatch) {
                return res.status(200).json({ message: 'Incorrect password', success: false });
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET || "hcjhad7842687ahdcb");
            return res.json({ token, user, success: true, is2fa: false });
        }
        catch (error) {
            console.log(error);
            res.status(200).json({ success: false, message: 'Something went wrong' });
        }
    }),
    registerAdmin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                return res.status(200).json({ message: 'Please fill all the fields', success: false });
            }
            const user = yield UserRepo.findOne({ where: { email } });
            if (user) {
                return res.status(200).json({ message: 'User already exists', success: false });
            }
            const newUser = new admin_1.Admin();
            newUser.name = name;
            newUser.email = email;
            newUser.password = bcrypt_1.default.hashSync(password, 10);
            newUser.role = 'admin';
            var newEntry = yield AdminRepo.save(newUser);
            const token = jsonwebtoken_1.default.sign({ id: newUser.id, email: newUser.email, role: newEntry.role }, process.env.JWT_SECRET || "hcjhad7842687ahdcb");
            res.json({ token, success: true });
        }
        catch (error) {
            console.log(error);
            res.status(200).json({ success: false, message: 'Something went wrong' });
        }
    })
};

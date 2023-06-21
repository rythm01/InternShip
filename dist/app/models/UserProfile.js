"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfile = void 0;
const typeorm_1 = require("typeorm");
const UserAuth_1 = require("./UserAuth");
const File_1 = __importDefault(require("./File"));
const Folder_1 = __importDefault(require("./Folder"));
const plans_1 = __importDefault(require("./plans"));
let UserProfile = class UserProfile {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", Number)
], UserProfile.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserProfile.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserProfile.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserProfile.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserProfile.prototype, "stripeCustomer", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserProfile.prototype, "storage", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserProfile.prototype, "storageLeft", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserProfile.prototype, "profilePicture", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserProfile.prototype, "profilePictureKey", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => plans_1.default, (plan) => plan.user),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", plans_1.default)
], UserProfile.prototype, "plan", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UserProfile.prototype, "dateJoined", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => File_1.default, (file) => file.user),
    __metadata("design:type", Array)
], UserProfile.prototype, "files", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => Folder_1.default, (folder) => folder.user),
    __metadata("design:type", Array)
], UserProfile.prototype, "folders", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserProfile.prototype, "verficationPeriod", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => UserAuth_1.UserAuth, (userAuth) => userAuth.userProfile),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", UserAuth_1.UserAuth)
], UserProfile.prototype, "userAuth", void 0);
UserProfile = __decorate([
    (0, typeorm_1.Entity)()
], UserProfile);
exports.UserProfile = UserProfile;

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
exports.Permission = void 0;
const typeorm_1 = require("typeorm");
const File_1 = __importDefault(require("./File"));
const UserAuth_1 = require("./UserAuth");
let Permission = class Permission {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Permission.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => UserAuth_1.UserAuth, (userAuth) => userAuth.id),
    (0, typeorm_1.JoinColumn)({ name: "userAuth" }),
    __metadata("design:type", UserAuth_1.UserAuth)
], Permission.prototype, "userAuth", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => File_1.default, (file) => file.id),
    (0, typeorm_1.JoinColumn)({ name: "fileId" }),
    __metadata("design:type", File_1.default)
], Permission.prototype, "file", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => UserAuth_1.UserAuth, (userAuth) => userAuth.id),
    (0, typeorm_1.JoinColumn)({ name: "buddyId" }),
    __metadata("design:type", UserAuth_1.UserAuth)
], Permission.prototype, "buddy", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Permission.prototype, "canRead", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Permission.prototype, "canWrite", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Permission.prototype, "canShare", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: true }),
    __metadata("design:type", Date)
], Permission.prototype, "timeReleaseDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], Permission.prototype, "instantReleaseDate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Permission.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Permission.prototype, "updatedAt", void 0);
Permission = __decorate([
    (0, typeorm_1.Entity)()
], Permission);
exports.Permission = Permission;

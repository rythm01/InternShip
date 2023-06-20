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
exports.FilePermission = void 0;
const typeorm_1 = require("typeorm");
const File_1 = __importDefault(require("./File"));
const UserAuth_1 = require("./UserAuth");
let FilePermission = class FilePermission {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FilePermission.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => File_1.default),
    __metadata("design:type", File_1.default)
], FilePermission.prototype, "file", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(type => UserAuth_1.UserAuth),
    __metadata("design:type", UserAuth_1.UserAuth)
], FilePermission.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], FilePermission.prototype, "can_read", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], FilePermission.prototype, "can_write", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], FilePermission.prototype, "can_share", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], FilePermission.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], FilePermission.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], FilePermission.prototype, "time_release_sharing", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], FilePermission.prototype, "immediate_sharing", void 0);
FilePermission = __decorate([
    (0, typeorm_1.Entity)()
], FilePermission);
exports.FilePermission = FilePermission;

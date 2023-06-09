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
var Folder_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Folder = void 0;
const typeorm_1 = require("typeorm");
const UserProfile_1 = require("./UserProfile");
const File_1 = __importDefault(require("./File"));
let Folder = Folder_1 = class Folder {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Folder.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Folder.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Folder.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Folder.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => Folder_1, folder => folder.children),
    __metadata("design:type", Folder)
], Folder.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => Folder_1, folder => folder.parent),
    __metadata("design:type", Array)
], Folder.prototype, "children", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => File_1.default, files => files.folder),
    __metadata("design:type", Array)
], Folder.prototype, "files", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => UserProfile_1.UserProfile, user => user.folders),
    __metadata("design:type", UserProfile_1.UserProfile)
], Folder.prototype, "user", void 0);
Folder = Folder_1 = __decorate([
    (0, typeorm_1.Entity)()
], Folder);
exports.Folder = Folder;
exports.default = Folder;

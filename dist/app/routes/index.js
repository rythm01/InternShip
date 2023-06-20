"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apis_1 = __importDefault(require("./apis"));
const express_2 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.Router)();
//serve static react build on home route
app.use('/api', apis_1.default);
app.use('/', express_2.default.static('build'));
app.get('*', (req, res) => {
    res.sendFile(path_1.default.resolve('build', 'index.html'));
});
exports.default = app;

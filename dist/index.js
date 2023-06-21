"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//importing libs
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
require("reflect-metadata");
//configuring env
dotenv_1.default.config();
//importing modules
const app_1 = __importDefault(require("./app/app"));
const config_1 = require("./config");
//declaring variables
const port = process.env.PORT || 5000;
//creating http server using http module
try {
    config_1.AppDataSource.initialize().then(() => {
        http_1.default.createServer({}, app_1.default).listen(port, () => {
            console.log("Server is listening on PORT " + port);
        });
    }).catch((err) => {
        console.log(err);
    });
}
catch (err) {
    console.log(err);
}

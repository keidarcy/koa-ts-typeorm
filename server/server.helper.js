"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
function callback(err) {
    if (err)
        throw err;
    console.log('copied');
}
exports["default"] = (function () {
    fs_1["default"].copyFile(path_1["default"].resolve(__dirname, '../assets/card.css'), path_1["default"].resolve(__dirname, '../assets/vcs.css.liquid'), callback);
});

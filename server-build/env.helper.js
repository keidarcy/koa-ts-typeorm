"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f, _g;
exports.__esModule = true;
exports.isDev = exports.port = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
exports["default"] = {
    DATABASE_URL: (_a = process.env.DATABASE_URL) !== null && _a !== void 0 ? _a : '',
    TUNNEL_URL: (_b = process.env.TUNNEL_URL) !== null && _b !== void 0 ? _b : '',
    PORT: (_c = process.env.PORT) !== null && _c !== void 0 ? _c : '',
    SHOPIFY_API_SECRET_KEY: (_d = process.env.SHOPIFY_API_SECRET_KEY) !== null && _d !== void 0 ? _d : '',
    SHOPIFY_API_KEY: (_e = process.env.SHOPIFY_API_KEY) !== null && _e !== void 0 ? _e : '',
    SHOPIFY_API_VERSION: (_f = process.env.SHOPIFY_API_VERSION) !== null && _f !== void 0 ? _f : '',
    SHOPIFY_API_SCOPE: (_g = process.env.SHOPIFY_API_SCOPE) !== null && _g !== void 0 ? _g : ''
};
exports.port = parseInt(process.env.PORT, 10) || 3000;
exports.isDev = process.env.NODE_ENV !== 'production';

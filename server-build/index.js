"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
require("isomorphic-fetch");
require("colors");
var koa_1 = __importDefault(require("koa"));
var next_1 = __importDefault(require("next"));
var koa_session_1 = __importDefault(require("koa-session"));
var koa_shopify_auth_1 = require("@shopify/koa-shopify-auth");
var env_helper_1 = __importStar(require("./env.helper"));
var addToContext_1 = require("./middlewares/addToContext");
var createShopifyAuth_1 = require("./middlewares/createShopifyAuth");
var letNextJsHandle_1 = require("./middlewares/letNextJsHandle");
var server_helper_1 = __importDefault(require("./server.helper"));
server_helper_1["default"]();
console.log({ dev: env_helper_1.isDev });
var app = next_1["default"]({ dev: env_helper_1.isDev });
var handle = app.getRequestHandler();
var server = new koa_1["default"]();
app.prepare().then(function () {
    server.keys = [env_helper_1["default"].SHOPIFY_API_SECRET_KEY];
    server.use(koa_session_1["default"]({ secure: true, sameSite: 'none' }, server));
    server.use(createShopifyAuth_1.createShopifyAuth());
    server.use(koa_shopify_auth_1.verifyRequest());
    server.use(addToContext_1.addContext);
    server.use(letNextJsHandle_1.letNextJsHandle(handle));
});
server
    .listen(env_helper_1.port)
    .on('listening', function () {
    return console.log(("server started PORT on " + env_helper_1.port + " http://locahost").bgCyan.bold);
});

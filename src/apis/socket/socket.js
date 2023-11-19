"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Socket = void 0;
var isomorphic_ws_1 = require("isomorphic-ws");
var utils_1 = require("../../utils");
var Socket = /** @class */ (function (_super) {
    __extends(Socket, _super);
    /**
     * Provides the API for creating and managing a WebSocket connection to a server, as well as for sending and receiving data on the connection.
     *
     * @param url Defaults to [[MainnetAPI]]
     * @param options Optional
     */
    function Socket(url, options) {
        if (url === void 0) { url = "wss://".concat(utils_1.MainnetAPI, ":443/ext/bc/X/events"); }
        return _super.call(this, url, options) || this;
    }
    /**
     * Send a message to the server
     *
     * @param data
     * @param cb Optional
     */
    Socket.prototype.send = function (data, cb) {
        _super.prototype.send.call(this, data, cb);
    };
    /**
     * Terminates the connection completely
     *
     * @param mcode Optional
     * @param data Optional
     */
    Socket.prototype.close = function (mcode, data) {
        _super.prototype.close.call(this, mcode, data);
    };
    return Socket;
}(isomorphic_ws_1.default));
exports.Socket = Socket;

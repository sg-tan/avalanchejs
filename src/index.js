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
exports.utils = exports.platformvm = exports.metrics = exports.keystore = exports.info = exports.index = exports.health = exports.evm = exports.common = exports.avm = exports.auth = exports.admin = exports.Socket = exports.PubSub = exports.Mnemonic = exports.GenesisData = exports.GenesisAsset = exports.HDNode = exports.DB = exports.Buffer = exports.BN = exports.BinTools = exports.AvalancheCore = exports.Avalanche = void 0;
/**
 * @packageDocumentation
 * @module Avalanche
 */
var avalanche_1 = require("./avalanche");
exports.AvalancheCore = avalanche_1.default;
var api_1 = require("./apis/admin/api");
var api_2 = require("./apis/auth/api");
var api_3 = require("./apis/avm/api");
var api_4 = require("./apis/evm/api");
var genesisasset_1 = require("./apis/avm/genesisasset");
Object.defineProperty(exports, "GenesisAsset", { enumerable: true, get: function () { return genesisasset_1.GenesisAsset; } });
var genesisdata_1 = require("./apis/avm/genesisdata");
Object.defineProperty(exports, "GenesisData", { enumerable: true, get: function () { return genesisdata_1.GenesisData; } });
var api_5 = require("./apis/health/api");
var api_6 = require("./apis/index/api");
var api_7 = require("./apis/info/api");
var api_8 = require("./apis/keystore/api");
var api_9 = require("./apis/metrics/api");
var api_10 = require("./apis/platformvm/api");
var socket_1 = require("./apis/socket/socket");
Object.defineProperty(exports, "Socket", { enumerable: true, get: function () { return socket_1.Socket; } });
var constants_1 = require("./utils/constants");
var helperfunctions_1 = require("./utils/helperfunctions");
var bintools_1 = require("./utils/bintools");
exports.BinTools = bintools_1.default;
var db_1 = require("./utils/db");
exports.DB = db_1.default;
var mnemonic_1 = require("./utils/mnemonic");
exports.Mnemonic = mnemonic_1.default;
var pubsub_1 = require("./utils/pubsub");
exports.PubSub = pubsub_1.default;
var hdnode_1 = require("./utils/hdnode");
exports.HDNode = hdnode_1.default;
var bn_js_1 = require("bn.js");
exports.BN = bn_js_1.default;
var buffer_1 = require("buffer/");
Object.defineProperty(exports, "Buffer", { enumerable: true, get: function () { return buffer_1.Buffer; } });
/**
 * AvalancheJS is middleware for interacting with Avalanche node RPC APIs.
 *
 * Example usage:
 * ```js
 * const avalanche: Avalanche = new Avalanche("127.0.0.1", 9650, "https")
 * ```
 *
 */
var Avalanche = /** @class */ (function (_super) {
    __extends(Avalanche, _super);
    /**
     * Creates a new Avalanche instance. Sets the address and port of the main Avalanche Client.
     *
     * @param host The hostname to resolve to reach the Avalanche Client RPC APIs
     * @param port The port to resolve to reach the Avalanche Client RPC APIs
     * @param protocol The protocol string to use before a "://" in a request,
     * ex: "http", "https", "git", "ws", etc. Defaults to http
     * @param networkID Sets the NetworkID of the class. Default [[DefaultNetworkID]]
     * @param XChainID Sets the blockchainID for the AVM. Will try to auto-detect,
     * otherwise default "2eNy1mUFdmaxXNj1eQHUe7Np4gju9sJsEtWQ4MX3ToiNKuADed"
     * @param CChainID Sets the blockchainID for the EVM. Will try to auto-detect,
     * otherwise default "2CA6j5zYzasynPsFeNoqWkmTCt3VScMvXUZHbfDJ8k3oGzAPtU"
     * @param hrp The human-readable part of the bech32 addresses
     * @param skipinit Skips creating the APIs. Defaults to false
     */
    function Avalanche(host, port, protocol, networkID, XChainID, CChainID, hrp, skipinit) {
        if (protocol === void 0) { protocol = "http"; }
        if (networkID === void 0) { networkID = constants_1.DefaultNetworkID; }
        if (XChainID === void 0) { XChainID = undefined; }
        if (CChainID === void 0) { CChainID = undefined; }
        if (hrp === void 0) { hrp = undefined; }
        if (skipinit === void 0) { skipinit = false; }
        var _this = _super.call(this, host, port, protocol) || this;
        /**
         * Returns a reference to the Admin RPC.
         */
        _this.Admin = function () { return _this.apis.admin; };
        /**
         * Returns a reference to the Auth RPC.
         */
        _this.Auth = function () { return _this.apis.auth; };
        /**
         * Returns a reference to the EVMAPI RPC pointed at the C-Chain.
         */
        _this.CChain = function () { return _this.apis.cchain; };
        /**
         * Returns a reference to the AVM RPC pointed at the X-Chain.
         */
        _this.XChain = function () { return _this.apis.xchain; };
        /**
         * Returns a reference to the Health RPC for a node.
         */
        _this.Health = function () { return _this.apis.health; };
        /**
         * Returns a reference to the Index RPC for a node.
         */
        _this.Index = function () { return _this.apis.index; };
        /**
         * Returns a reference to the Info RPC for a node.
         */
        _this.Info = function () { return _this.apis.info; };
        /**
         * Returns a reference to the Metrics RPC.
         */
        _this.Metrics = function () { return _this.apis.metrics; };
        /**
         * Returns a reference to the Keystore RPC for a node. We label it "NodeKeys" to reduce
         * confusion about what it's accessing.
         */
        _this.NodeKeys = function () { return _this.apis.keystore; };
        /**
         * Returns a reference to the PlatformVM RPC pointed at the P-Chain.
         */
        _this.PChain = function () { return _this.apis.pchain; };
        var xchainid = XChainID;
        var cchainid = CChainID;
        if (typeof XChainID === "undefined" ||
            !XChainID ||
            XChainID.toLowerCase() === "x") {
            if (networkID.toString() in constants_1.Defaults.network) {
                xchainid = constants_1.Defaults.network["".concat(networkID)].X.blockchainID;
            }
            else {
                xchainid = constants_1.Defaults.network[12345].X.blockchainID;
            }
        }
        if (typeof CChainID === "undefined" ||
            !CChainID ||
            CChainID.toLowerCase() === "c") {
            if (networkID.toString() in constants_1.Defaults.network) {
                cchainid = constants_1.Defaults.network["".concat(networkID)].C.blockchainID;
            }
            else {
                cchainid = constants_1.Defaults.network[12345].C.blockchainID;
            }
        }
        if (typeof networkID === "number" && networkID >= 0) {
            _this.networkID = networkID;
        }
        else if (typeof networkID === "undefined") {
            networkID = constants_1.DefaultNetworkID;
        }
        if (typeof hrp !== "undefined") {
            _this.hrp = hrp;
        }
        else {
            _this.hrp = (0, helperfunctions_1.getPreferredHRP)(_this.networkID);
        }
        if (!skipinit) {
            _this.addAPI("admin", api_1.AdminAPI);
            _this.addAPI("auth", api_2.AuthAPI);
            _this.addAPI("xchain", api_3.AVMAPI, "/ext/bc/X", xchainid);
            _this.addAPI("cchain", api_4.EVMAPI, "/ext/bc/C/avax", cchainid);
            _this.addAPI("health", api_5.HealthAPI);
            _this.addAPI("info", api_7.InfoAPI);
            _this.addAPI("index", api_6.IndexAPI);
            _this.addAPI("keystore", api_8.KeystoreAPI);
            _this.addAPI("metrics", api_9.MetricsAPI);
            _this.addAPI("pchain", api_10.PlatformVMAPI);
        }
        return _this;
    }
    return Avalanche;
}(avalanche_1.default));
exports.Avalanche = Avalanche;
exports.default = Avalanche;
exports.admin = require("./apis/admin");
exports.auth = require("./apis/auth");
exports.avm = require("./apis/avm");
exports.common = require("./common");
exports.evm = require("./apis/evm");
exports.health = require("./apis/health");
exports.index = require("./apis/index");
exports.info = require("./apis/info");
exports.keystore = require("./apis/keystore");
exports.metrics = require("./apis/metrics");
exports.platformvm = require("./apis/platformvm");
exports.utils = require("./utils");

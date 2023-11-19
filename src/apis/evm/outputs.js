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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EVMOutput = exports.SECPTransferOutput = exports.AmountOutput = exports.TransferableOutput = exports.SelectOutputClass = void 0;
/**
 * @packageDocumentation
 * @module API-EVM-Outputs
 */
var buffer_1 = require("buffer/");
var bn_js_1 = require("bn.js");
var bintools_1 = require("../../utils/bintools");
var constants_1 = require("./constants");
var output_1 = require("../../common/output");
var errors_1 = require("../../utils/errors");
var bintools = bintools_1.default.getInstance();
/**
 * Takes a buffer representing the output and returns the proper Output instance.
 *
 * @param outputID A number representing the outputID parsed prior to the bytes passed in
 *
 * @returns An instance of an [[Output]]-extended class.
 */
var SelectOutputClass = function (outputID) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (outputID == constants_1.EVMConstants.SECPXFEROUTPUTID) {
        return new (SECPTransferOutput.bind.apply(SECPTransferOutput, __spreadArray([void 0], args, false)))();
    }
    throw new errors_1.OutputIdError("Error - SelectOutputClass: unknown outputID");
};
exports.SelectOutputClass = SelectOutputClass;
var TransferableOutput = /** @class */ (function (_super) {
    __extends(TransferableOutput, _super);
    function TransferableOutput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._typeName = "TransferableOutput";
        _this._typeID = undefined;
        return _this;
    }
    //serialize is inherited
    TransferableOutput.prototype.deserialize = function (fields, encoding) {
        if (encoding === void 0) { encoding = "hex"; }
        _super.prototype.deserialize.call(this, fields, encoding);
        this.output = (0, exports.SelectOutputClass)(fields["output"]["_typeID"]);
        this.output.deserialize(fields["output"], encoding);
    };
    TransferableOutput.prototype.fromBuffer = function (bytes, offset) {
        if (offset === void 0) { offset = 0; }
        this.assetID = bintools.copyFrom(bytes, offset, offset + constants_1.EVMConstants.ASSETIDLEN);
        offset += constants_1.EVMConstants.ASSETIDLEN;
        var outputid = bintools
            .copyFrom(bytes, offset, offset + 4)
            .readUInt32BE(0);
        offset += 4;
        this.output = (0, exports.SelectOutputClass)(outputid);
        return this.output.fromBuffer(bytes, offset);
    };
    return TransferableOutput;
}(output_1.StandardTransferableOutput));
exports.TransferableOutput = TransferableOutput;
var AmountOutput = /** @class */ (function (_super) {
    __extends(AmountOutput, _super);
    function AmountOutput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._typeName = "AmountOutput";
        _this._typeID = undefined;
        return _this;
    }
    //serialize and deserialize both are inherited
    /**
     *
     * @param assetID An assetID which is wrapped around the Buffer of the Output
     */
    AmountOutput.prototype.makeTransferable = function (assetID) {
        return new TransferableOutput(assetID, this);
    };
    AmountOutput.prototype.select = function (id) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return exports.SelectOutputClass.apply(void 0, __spreadArray([id], args, false));
    };
    return AmountOutput;
}(output_1.StandardAmountOutput));
exports.AmountOutput = AmountOutput;
/**
 * An [[Output]] class which specifies an Output that carries an ammount for an assetID and uses secp256k1 signature scheme.
 */
var SECPTransferOutput = /** @class */ (function (_super) {
    __extends(SECPTransferOutput, _super);
    function SECPTransferOutput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._typeName = "SECPTransferOutput";
        _this._typeID = constants_1.EVMConstants.SECPXFEROUTPUTID;
        return _this;
    }
    //serialize and deserialize both are inherited
    /**
     * Returns the outputID for this output
     */
    SECPTransferOutput.prototype.getOutputID = function () {
        return this._typeID;
    };
    SECPTransferOutput.prototype.create = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new (SECPTransferOutput.bind.apply(SECPTransferOutput, __spreadArray([void 0], args, false)))();
    };
    SECPTransferOutput.prototype.clone = function () {
        var newout = this.create();
        newout.fromBuffer(this.toBuffer());
        return newout;
    };
    return SECPTransferOutput;
}(AmountOutput));
exports.SECPTransferOutput = SECPTransferOutput;
var EVMOutput = /** @class */ (function () {
    /**
     * An [[EVMOutput]] class which contains address, amount, and assetID.
     *
     * @param address The address recieving the asset as a {@link https://github.com/feross/buffer|Buffer} or a string.
     * @param amount A {@link https://github.com/indutny/bn.js/|BN} or number representing the amount.
     * @param assetID The assetID which is being sent as a {@link https://github.com/feross/buffer|Buffer} or a string.
     */
    function EVMOutput(address, amount, assetID) {
        var _this = this;
        if (address === void 0) { address = undefined; }
        if (amount === void 0) { amount = undefined; }
        if (assetID === void 0) { assetID = undefined; }
        this.address = buffer_1.Buffer.alloc(20);
        this.amount = buffer_1.Buffer.alloc(8);
        this.amountValue = new bn_js_1.default(0);
        this.assetID = buffer_1.Buffer.alloc(32);
        /**
         * Returns the address of the input as {@link https://github.com/feross/buffer|Buffer}
         */
        this.getAddress = function () { return _this.address; };
        /**
         * Returns the address as a bech32 encoded string.
         */
        this.getAddressString = function () { return _this.address.toString("hex"); };
        /**
         * Returns the amount as a {@link https://github.com/indutny/bn.js/|BN}.
         */
        this.getAmount = function () { return _this.amountValue.clone(); };
        /**
         * Returns the assetID of the input as {@link https://github.com/feross/buffer|Buffer}
         */
        this.getAssetID = function () { return _this.assetID; };
        if (typeof address !== "undefined" &&
            typeof amount !== "undefined" &&
            typeof assetID !== "undefined") {
            if (typeof address === "string") {
                // if present then remove `0x` prefix
                var prefix = address.substring(0, 2);
                if (prefix === "0x") {
                    address = address.split("x")[1];
                }
                address = buffer_1.Buffer.from(address, "hex");
            }
            // convert number amount to BN
            var amnt = void 0;
            if (typeof amount === "number") {
                amnt = new bn_js_1.default(amount);
            }
            else {
                amnt = amount;
            }
            // convert string assetID to Buffer
            if (!(assetID instanceof buffer_1.Buffer)) {
                assetID = bintools.cb58Decode(assetID);
            }
            this.address = address;
            this.amountValue = amnt.clone();
            this.amount = bintools.fromBNToBuffer(amnt, 8);
            this.assetID = assetID;
        }
    }
    /**
     * Returns a {@link https://github.com/feross/buffer|Buffer} representation of the [[EVMOutput]].
     */
    EVMOutput.prototype.toBuffer = function () {
        var bsize = this.address.length + this.amount.length + this.assetID.length;
        var barr = [this.address, this.amount, this.assetID];
        var buff = buffer_1.Buffer.concat(barr, bsize);
        return buff;
    };
    /**
     * Decodes the [[EVMOutput]] as a {@link https://github.com/feross/buffer|Buffer} and returns the size.
     */
    EVMOutput.prototype.fromBuffer = function (bytes, offset) {
        if (offset === void 0) { offset = 0; }
        this.address = bintools.copyFrom(bytes, offset, offset + 20);
        offset += 20;
        this.amount = bintools.copyFrom(bytes, offset, offset + 8);
        offset += 8;
        this.assetID = bintools.copyFrom(bytes, offset, offset + 32);
        offset += 32;
        this.amountValue = new bn_js_1.default(this.amount);
        return offset;
    };
    /**
     * Returns a base-58 representation of the [[EVMOutput]].
     */
    EVMOutput.prototype.toString = function () {
        return bintools.bufferToB58(this.toBuffer());
    };
    EVMOutput.prototype.create = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new (EVMOutput.bind.apply(EVMOutput, __spreadArray([void 0], args, false)))();
    };
    EVMOutput.prototype.clone = function () {
        var newEVMOutput = this.create();
        newEVMOutput.fromBuffer(this.toBuffer());
        return newEVMOutput;
    };
    /**
     * Returns a function used to sort an array of [[EVMOutput]]s
     */
    EVMOutput.comparator = function () {
        return function (a, b) {
            // primarily sort by address
            var sorta = a.getAddress();
            var sortb = b.getAddress();
            // secondarily sort by assetID
            if (sorta.equals(sortb)) {
                sorta = a.getAssetID();
                sortb = b.getAssetID();
            }
            return buffer_1.Buffer.compare(sorta, sortb);
        };
    };
    return EVMOutput;
}());
exports.EVMOutput = EVMOutput;

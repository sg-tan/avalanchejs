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
exports.EVMInput = exports.SECPTransferInput = exports.AmountInput = exports.TransferableInput = exports.SelectInputClass = void 0;
/**
 * @packageDocumentation
 * @module API-EVM-Inputs
 */
var buffer_1 = require("buffer/");
var bintools_1 = require("../../utils/bintools");
var constants_1 = require("./constants");
var input_1 = require("../../common/input");
var outputs_1 = require("./outputs");
var bn_js_1 = require("bn.js");
var credentials_1 = require("../../common/credentials");
var errors_1 = require("../../utils/errors");
var utils_1 = require("../../utils");
/**
 * @ignore
 */
var bintools = bintools_1.default.getInstance();
/**
 * Takes a buffer representing the output and returns the proper [[Input]] instance.
 *
 * @param inputID A number representing the inputID parsed prior to the bytes passed in
 *
 * @returns An instance of an [[Input]]-extended class.
 */
var SelectInputClass = function (inputID) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (inputID === constants_1.EVMConstants.SECPINPUTID) {
        return new (SECPTransferInput.bind.apply(SECPTransferInput, __spreadArray([void 0], args, false)))();
    }
    /* istanbul ignore next */
    throw new errors_1.InputIdError("Error - SelectInputClass: unknown inputID");
};
exports.SelectInputClass = SelectInputClass;
var TransferableInput = /** @class */ (function (_super) {
    __extends(TransferableInput, _super);
    function TransferableInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._typeName = "TransferableInput";
        _this._typeID = undefined;
        /**
         *
         * Assesses the amount to be paid based on the number of signatures required
         * @returns the amount to be paid
         */
        _this.getCost = function () {
            var numSigs = _this.getInput().getSigIdxs().length;
            return numSigs * utils_1.Defaults.network[1].C.costPerSignature;
        };
        return _this;
    }
    //serialize is inherited
    TransferableInput.prototype.deserialize = function (fields, encoding) {
        if (encoding === void 0) { encoding = "hex"; }
        _super.prototype.deserialize.call(this, fields, encoding);
        this.input = (0, exports.SelectInputClass)(fields["input"]["_typeID"]);
        this.input.deserialize(fields["input"], encoding);
    };
    /**
     * Takes a {@link https://github.com/feross/buffer|Buffer} containing a [[TransferableInput]], parses it, populates the class, and returns the length of the [[TransferableInput]] in bytes.
     *
     * @param bytes A {@link https://github.com/feross/buffer|Buffer} containing a raw [[TransferableInput]]
     *
     * @returns The length of the raw [[TransferableInput]]
     */
    TransferableInput.prototype.fromBuffer = function (bytes, offset) {
        if (offset === void 0) { offset = 0; }
        this.txid = bintools.copyFrom(bytes, offset, offset + 32);
        offset += 32;
        this.outputidx = bintools.copyFrom(bytes, offset, offset + 4);
        offset += 4;
        this.assetID = bintools.copyFrom(bytes, offset, offset + constants_1.EVMConstants.ASSETIDLEN);
        offset += 32;
        var inputid = bintools
            .copyFrom(bytes, offset, offset + 4)
            .readUInt32BE(0);
        offset += 4;
        this.input = (0, exports.SelectInputClass)(inputid);
        return this.input.fromBuffer(bytes, offset);
    };
    return TransferableInput;
}(input_1.StandardTransferableInput));
exports.TransferableInput = TransferableInput;
var AmountInput = /** @class */ (function (_super) {
    __extends(AmountInput, _super);
    function AmountInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._typeName = "AmountInput";
        _this._typeID = undefined;
        return _this;
    }
    //serialize and deserialize both are inherited
    AmountInput.prototype.select = function (id) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return exports.SelectInputClass.apply(void 0, __spreadArray([id], args, false));
    };
    return AmountInput;
}(input_1.StandardAmountInput));
exports.AmountInput = AmountInput;
var SECPTransferInput = /** @class */ (function (_super) {
    __extends(SECPTransferInput, _super);
    function SECPTransferInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._typeName = "SECPTransferInput";
        _this._typeID = constants_1.EVMConstants.SECPINPUTID;
        _this.getCredentialID = function () { return constants_1.EVMConstants.SECPCREDENTIAL; };
        return _this;
    }
    //serialize and deserialize both are inherited
    /**
     * Returns the inputID for this input
     */
    SECPTransferInput.prototype.getInputID = function () {
        return constants_1.EVMConstants.SECPINPUTID;
    };
    SECPTransferInput.prototype.create = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new (SECPTransferInput.bind.apply(SECPTransferInput, __spreadArray([void 0], args, false)))();
    };
    SECPTransferInput.prototype.clone = function () {
        var newout = this.create();
        newout.fromBuffer(this.toBuffer());
        return newout;
    };
    return SECPTransferInput;
}(AmountInput));
exports.SECPTransferInput = SECPTransferInput;
var EVMInput = /** @class */ (function (_super) {
    __extends(EVMInput, _super);
    /**
     * An [[EVMInput]] class which contains address, amount, assetID, nonce.
     *
     * @param address is the EVM address from which to transfer funds.
     * @param amount is the amount of the asset to be transferred (specified in nAVAX for AVAX and the smallest denomination for all other assets).
     * @param assetID The assetID which is being sent as a {@link https://github.com/feross/buffer|Buffer} or as a string.
     * @param nonce A {@link https://github.com/indutny/bn.js/|BN} or a number representing the nonce.
     */
    function EVMInput(address, amount, assetID, nonce) {
        if (address === void 0) { address = undefined; }
        if (amount === void 0) { amount = undefined; }
        if (assetID === void 0) { assetID = undefined; }
        if (nonce === void 0) { nonce = undefined; }
        var _this = _super.call(this, address, amount, assetID) || this;
        _this.nonce = buffer_1.Buffer.alloc(8);
        _this.nonceValue = new bn_js_1.default(0);
        _this.sigCount = buffer_1.Buffer.alloc(4);
        _this.sigIdxs = []; // idxs of signers from utxo
        /**
         * Returns the array of [[SigIdx]] for this [[Input]]
         */
        _this.getSigIdxs = function () { return _this.sigIdxs; };
        /**
         * Creates and adds a [[SigIdx]] to the [[Input]].
         *
         * @param addressIdx The index of the address to reference in the signatures
         * @param address The address of the source of the signature
         */
        _this.addSignatureIdx = function (addressIdx, address) {
            var sigidx = new credentials_1.SigIdx();
            var b = buffer_1.Buffer.alloc(4);
            b.writeUInt32BE(addressIdx, 0);
            sigidx.fromBuffer(b);
            sigidx.setSource(address);
            _this.sigIdxs.push(sigidx);
            _this.sigCount.writeUInt32BE(_this.sigIdxs.length, 0);
        };
        /**
         * Returns the nonce as a {@link https://github.com/indutny/bn.js/|BN}.
         */
        _this.getNonce = function () { return _this.nonceValue.clone(); };
        _this.getCredentialID = function () { return constants_1.EVMConstants.SECPCREDENTIAL; };
        if (typeof nonce !== "undefined") {
            // convert number nonce to BN
            var n = void 0;
            if (typeof nonce === "number") {
                n = new bn_js_1.default(nonce);
            }
            else {
                n = nonce;
            }
            _this.nonceValue = n.clone();
            _this.nonce = bintools.fromBNToBuffer(n, 8);
        }
        return _this;
    }
    /**
     * Returns a {@link https://github.com/feross/buffer|Buffer} representation of the [[EVMOutput]].
     */
    EVMInput.prototype.toBuffer = function () {
        var superbuff = _super.prototype.toBuffer.call(this);
        var bsize = superbuff.length + this.nonce.length;
        var barr = [superbuff, this.nonce];
        return buffer_1.Buffer.concat(barr, bsize);
    };
    /**
     * Decodes the [[EVMInput]] as a {@link https://github.com/feross/buffer|Buffer} and returns the size.
     *
     * @param bytes The bytes as a {@link https://github.com/feross/buffer|Buffer}.
     * @param offset An offset as a number.
     */
    EVMInput.prototype.fromBuffer = function (bytes, offset) {
        if (offset === void 0) { offset = 0; }
        offset = _super.prototype.fromBuffer.call(this, bytes, offset);
        this.nonce = bintools.copyFrom(bytes, offset, offset + 8);
        offset += 8;
        return offset;
    };
    /**
     * Returns a base-58 representation of the [[EVMInput]].
     */
    EVMInput.prototype.toString = function () {
        return bintools.bufferToB58(this.toBuffer());
    };
    EVMInput.prototype.create = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new (EVMInput.bind.apply(EVMInput, __spreadArray([void 0], args, false)))();
    };
    EVMInput.prototype.clone = function () {
        var newEVMInput = this.create();
        newEVMInput.fromBuffer(this.toBuffer());
        return newEVMInput;
    };
    return EVMInput;
}(outputs_1.EVMOutput));
exports.EVMInput = EVMInput;

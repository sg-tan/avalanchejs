"use strict";
/**
 * @packageDocumentation
 * @module Common-Output
 */
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseNFTOutput = exports.StandardAmountOutput = exports.StandardTransferableOutput = exports.StandardParseableOutput = exports.Output = exports.OutputOwners = exports.Address = void 0;
var buffer_1 = require("buffer/");
var bn_js_1 = require("bn.js");
var bintools_1 = require("../utils/bintools");
var nbytes_1 = require("./nbytes");
var helperfunctions_1 = require("../utils/helperfunctions");
var serialization_1 = require("../utils/serialization");
var errors_1 = require("../utils/errors");
/**
 * @ignore
 */
var bintools = bintools_1.default.getInstance();
var serialization = serialization_1.Serialization.getInstance();
/**
 * Class for representing an address used in [[Output]] types
 */
var Address = /** @class */ (function (_super) {
    __extends(Address, _super);
    /**
     * Class for representing an address used in [[Output]] types
     */
    function Address() {
        var _this = _super.call(this) || this;
        _this._typeName = "Address";
        _this._typeID = undefined;
        //serialize and deserialize both are inherited
        _this.bytes = buffer_1.Buffer.alloc(20);
        _this.bsize = 20;
        return _this;
    }
    /**
     * Returns a base-58 representation of the [[Address]].
     */
    Address.prototype.toString = function () {
        return bintools.cb58Encode(this.toBuffer());
    };
    /**
     * Takes a base-58 string containing an [[Address]], parses it, populates the class, and returns the length of the Address in bytes.
     *
     * @param bytes A base-58 string containing a raw [[Address]]
     *
     * @returns The length of the raw [[Address]]
     */
    Address.prototype.fromString = function (addr) {
        var addrbuff = bintools.b58ToBuffer(addr);
        if (addrbuff.length === 24 && bintools.validateChecksum(addrbuff)) {
            var newbuff = bintools.copyFrom(addrbuff, 0, addrbuff.length - 4);
            if (newbuff.length === 20) {
                this.bytes = newbuff;
            }
        }
        else if (addrbuff.length === 24) {
            throw new errors_1.ChecksumError("Error - Address.fromString: invalid checksum on address");
        }
        else if (addrbuff.length === 20) {
            this.bytes = addrbuff;
        }
        else {
            /* istanbul ignore next */
            throw new errors_1.AddressError("Error - Address.fromString: invalid address");
        }
        return this.getSize();
    };
    Address.prototype.clone = function () {
        var newbase = new Address();
        newbase.fromBuffer(this.toBuffer());
        return newbase;
    };
    Address.prototype.create = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new Address();
    };
    /**
     * Returns a function used to sort an array of [[Address]]es
     */
    Address.comparator = function () {
        return function (a, b) {
            return buffer_1.Buffer.compare(a.toBuffer(), b.toBuffer());
        };
    };
    return Address;
}(nbytes_1.NBytes));
exports.Address = Address;
/**
 * Defines the most basic values for output ownership. Mostly inherited from, but can be used in population of NFT Owner data.
 */
var OutputOwners = /** @class */ (function (_super) {
    __extends(OutputOwners, _super);
    /**
     * An [[Output]] class which contains addresses, locktimes, and thresholds.
     *
     * @param addresses An array of {@link https://github.com/feross/buffer|Buffer}s representing output owner's addresses
     * @param locktime A {@link https://github.com/indutny/bn.js/|BN} representing the locktime
     * @param threshold A number representing the the threshold number of signers required to sign the transaction
     */
    function OutputOwners(addresses, locktime, threshold) {
        if (addresses === void 0) { addresses = undefined; }
        if (locktime === void 0) { locktime = undefined; }
        if (threshold === void 0) { threshold = undefined; }
        var _this = _super.call(this) || this;
        _this._typeName = "OutputOwners";
        _this._typeID = undefined;
        _this.locktime = buffer_1.Buffer.alloc(8);
        _this.threshold = buffer_1.Buffer.alloc(4);
        _this.numaddrs = buffer_1.Buffer.alloc(4);
        _this.addresses = [];
        /**
         * Returns the threshold of signers required to spend this output.
         */
        _this.getThreshold = function () { return _this.threshold.readUInt32BE(0); };
        /**
         * Returns the a {@link https://github.com/indutny/bn.js/|BN} repersenting the UNIX Timestamp when the lock is made available.
         */
        _this.getLocktime = function () { return bintools.fromBufferToBN(_this.locktime); };
        /**
         * Returns an array of {@link https://github.com/feross/buffer|Buffer}s for the addresses.
         */
        _this.getAddresses = function () {
            var result = [];
            for (var i = 0; i < _this.addresses.length; i++) {
                result.push(_this.addresses["".concat(i)].toBuffer());
            }
            return result;
        };
        /**
         * Returns the index of the address.
         *
         * @param address A {@link https://github.com/feross/buffer|Buffer} of the address to look up to return its index.
         *
         * @returns The index of the address.
         */
        _this.getAddressIdx = function (address) {
            for (var i = 0; i < _this.addresses.length; i++) {
                if (_this.addresses["".concat(i)].toBuffer().toString("hex") ===
                    address.toString("hex")) {
                    return i;
                }
            }
            /* istanbul ignore next */
            return -1;
        };
        /**
         * Returns the address from the index provided.
         *
         * @param idx The index of the address.
         *
         * @returns Returns the string representing the address.
         */
        _this.getAddress = function (idx) {
            if (idx < _this.addresses.length) {
                return _this.addresses["".concat(idx)].toBuffer();
            }
            throw new errors_1.AddressIndexError("Error - Output.getAddress: idx out of range");
        };
        /**
         * Given an array of address {@link https://github.com/feross/buffer|Buffer}s and an optional timestamp, returns true if the addresses meet the threshold required to spend the output.
         */
        _this.meetsThreshold = function (addresses, asOf) {
            if (asOf === void 0) { asOf = undefined; }
            var now;
            if (typeof asOf === "undefined") {
                now = (0, helperfunctions_1.UnixNow)();
            }
            else {
                now = asOf;
            }
            var qualified = _this.getSpenders(addresses, now);
            var threshold = _this.threshold.readUInt32BE(0);
            if (qualified.length >= threshold) {
                return true;
            }
            return false;
        };
        /**
         * Given an array of addresses and an optional timestamp, select an array of address {@link https://github.com/feross/buffer|Buffer}s of qualified spenders for the output.
         */
        _this.getSpenders = function (addresses, asOf) {
            if (asOf === void 0) { asOf = undefined; }
            var qualified = [];
            var now;
            if (typeof asOf === "undefined") {
                now = (0, helperfunctions_1.UnixNow)();
            }
            else {
                now = asOf;
            }
            var locktime = bintools.fromBufferToBN(_this.locktime);
            if (now.lte(locktime)) {
                // not unlocked, not spendable
                return qualified;
            }
            var threshold = _this.threshold.readUInt32BE(0);
            for (var i = 0; i < _this.addresses.length && qualified.length < threshold; i++) {
                for (var j = 0; j < addresses.length && qualified.length < threshold; j++) {
                    if (addresses["".concat(j)].toString("hex") ===
                        _this.addresses["".concat(i)].toBuffer().toString("hex")) {
                        qualified.push(addresses["".concat(j)]);
                    }
                }
            }
            return qualified;
        };
        if (typeof addresses !== "undefined" && addresses.length) {
            var addrs = [];
            for (var i = 0; i < addresses.length; i++) {
                addrs["".concat(i)] = new Address();
                addrs["".concat(i)].fromBuffer(addresses["".concat(i)]);
            }
            _this.addresses = addrs;
            _this.addresses.sort(Address.comparator());
            _this.numaddrs.writeUInt32BE(_this.addresses.length, 0);
        }
        if (typeof threshold !== undefined) {
            _this.threshold.writeUInt32BE(threshold || 1, 0);
        }
        if (typeof locktime !== "undefined") {
            _this.locktime = bintools.fromBNToBuffer(locktime, 8);
        }
        return _this;
    }
    OutputOwners.prototype.serialize = function (encoding) {
        if (encoding === void 0) { encoding = "hex"; }
        var fields = _super.prototype.serialize.call(this, encoding);
        return __assign(__assign({}, fields), { locktime: serialization.encoder(this.locktime, encoding, "Buffer", "decimalString", 8), threshold: serialization.encoder(this.threshold, encoding, "Buffer", "decimalString", 4), addresses: this.addresses.map(function (a) {
                return a.serialize(encoding);
            }) });
    };
    OutputOwners.prototype.deserialize = function (fields, encoding) {
        if (encoding === void 0) { encoding = "hex"; }
        _super.prototype.deserialize.call(this, fields, encoding);
        this.locktime = serialization.decoder(fields["locktime"], encoding, "decimalString", "Buffer", 8);
        this.threshold = serialization.decoder(fields["threshold"], encoding, "decimalString", "Buffer", 4);
        this.addresses = fields["addresses"].map(function (a) {
            var addr = new Address();
            addr.deserialize(a, encoding);
            return addr;
        });
        this.numaddrs = buffer_1.Buffer.alloc(4);
        this.numaddrs.writeUInt32BE(this.addresses.length, 0);
    };
    /**
     * Returns a base-58 string representing the [[Output]].
     */
    OutputOwners.prototype.fromBuffer = function (bytes, offset) {
        if (offset === void 0) { offset = 0; }
        this.locktime = bintools.copyFrom(bytes, offset, offset + 8);
        offset += 8;
        this.threshold = bintools.copyFrom(bytes, offset, offset + 4);
        offset += 4;
        this.numaddrs = bintools.copyFrom(bytes, offset, offset + 4);
        offset += 4;
        var numaddrs = this.numaddrs.readUInt32BE(0);
        this.addresses = [];
        for (var i = 0; i < numaddrs; i++) {
            var addr = new Address();
            offset = addr.fromBuffer(bytes, offset);
            this.addresses.push(addr);
        }
        this.addresses.sort(Address.comparator());
        return offset;
    };
    /**
     * Returns the buffer representing the [[Output]] instance.
     */
    OutputOwners.prototype.toBuffer = function () {
        this.addresses.sort(Address.comparator());
        this.numaddrs.writeUInt32BE(this.addresses.length, 0);
        var bsize = this.locktime.length + this.threshold.length + this.numaddrs.length;
        var barr = [this.locktime, this.threshold, this.numaddrs];
        for (var i = 0; i < this.addresses.length; i++) {
            var b = this.addresses["".concat(i)].toBuffer();
            barr.push(b);
            bsize += b.length;
        }
        return buffer_1.Buffer.concat(barr, bsize);
    };
    /**
     * Returns a base-58 string representing the [[Output]].
     */
    OutputOwners.prototype.toString = function () {
        return bintools.bufferToB58(this.toBuffer());
    };
    OutputOwners.comparator = function () {
        return function (a, b) {
            var aoutid = buffer_1.Buffer.alloc(4);
            aoutid.writeUInt32BE(a.getOutputID(), 0);
            var abuff = a.toBuffer();
            var boutid = buffer_1.Buffer.alloc(4);
            boutid.writeUInt32BE(b.getOutputID(), 0);
            var bbuff = b.toBuffer();
            var asort = buffer_1.Buffer.concat([aoutid, abuff], aoutid.length + abuff.length);
            var bsort = buffer_1.Buffer.concat([boutid, bbuff], boutid.length + bbuff.length);
            return buffer_1.Buffer.compare(asort, bsort);
        };
    };
    return OutputOwners;
}(serialization_1.Serializable));
exports.OutputOwners = OutputOwners;
var Output = /** @class */ (function (_super) {
    __extends(Output, _super);
    function Output() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._typeName = "Output";
        _this._typeID = undefined;
        return _this;
    }
    return Output;
}(OutputOwners));
exports.Output = Output;
var StandardParseableOutput = /** @class */ (function (_super) {
    __extends(StandardParseableOutput, _super);
    /**
     * Class representing an [[ParseableOutput]] for a transaction.
     *
     * @param output A number representing the InputID of the [[ParseableOutput]]
     */
    function StandardParseableOutput(output) {
        if (output === void 0) { output = undefined; }
        var _this = _super.call(this) || this;
        _this._typeName = "StandardParseableOutput";
        _this._typeID = undefined;
        _this.getOutput = function () { return _this.output; };
        if (output instanceof Output) {
            _this.output = output;
        }
        return _this;
    }
    StandardParseableOutput.prototype.serialize = function (encoding) {
        if (encoding === void 0) { encoding = "hex"; }
        var fields = _super.prototype.serialize.call(this, encoding);
        return __assign(__assign({}, fields), { output: this.output.serialize(encoding) });
    };
    StandardParseableOutput.prototype.toBuffer = function () {
        var outbuff = this.output.toBuffer();
        var outid = buffer_1.Buffer.alloc(4);
        outid.writeUInt32BE(this.output.getOutputID(), 0);
        var barr = [outid, outbuff];
        return buffer_1.Buffer.concat(barr, outid.length + outbuff.length);
    };
    /**
     * Returns a function used to sort an array of [[ParseableOutput]]s
     */
    StandardParseableOutput.comparator = function () {
        return function (a, b) {
            var sorta = a.toBuffer();
            var sortb = b.toBuffer();
            return buffer_1.Buffer.compare(sorta, sortb);
        };
    };
    return StandardParseableOutput;
}(serialization_1.Serializable));
exports.StandardParseableOutput = StandardParseableOutput;
var StandardTransferableOutput = /** @class */ (function (_super) {
    __extends(StandardTransferableOutput, _super);
    /**
     * Class representing an [[StandardTransferableOutput]] for a transaction.
     *
     * @param assetID A {@link https://github.com/feross/buffer|Buffer} representing the assetID of the [[Output]]
     * @param output A number representing the InputID of the [[StandardTransferableOutput]]
     */
    function StandardTransferableOutput(assetID, output) {
        if (assetID === void 0) { assetID = undefined; }
        if (output === void 0) { output = undefined; }
        var _this = _super.call(this, output) || this;
        _this._typeName = "StandardTransferableOutput";
        _this._typeID = undefined;
        _this.assetID = undefined;
        _this.getAssetID = function () { return _this.assetID; };
        if (typeof assetID !== "undefined") {
            _this.assetID = assetID;
        }
        return _this;
    }
    StandardTransferableOutput.prototype.serialize = function (encoding) {
        if (encoding === void 0) { encoding = "hex"; }
        var fields = _super.prototype.serialize.call(this, encoding);
        return __assign(__assign({}, fields), { assetID: serialization.encoder(this.assetID, encoding, "Buffer", "cb58") });
    };
    StandardTransferableOutput.prototype.deserialize = function (fields, encoding) {
        if (encoding === void 0) { encoding = "hex"; }
        _super.prototype.deserialize.call(this, fields, encoding);
        this.assetID = serialization.decoder(fields["assetID"], encoding, "cb58", "Buffer", 32);
    };
    StandardTransferableOutput.prototype.toBuffer = function () {
        var parseableBuff = _super.prototype.toBuffer.call(this);
        var barr = [this.assetID, parseableBuff];
        return buffer_1.Buffer.concat(barr, this.assetID.length + parseableBuff.length);
    };
    return StandardTransferableOutput;
}(StandardParseableOutput));
exports.StandardTransferableOutput = StandardTransferableOutput;
/**
 * An [[Output]] class which specifies a token amount .
 */
var StandardAmountOutput = /** @class */ (function (_super) {
    __extends(StandardAmountOutput, _super);
    /**
     * A [[StandardAmountOutput]] class which issues a payment on an assetID.
     *
     * @param amount A {@link https://github.com/indutny/bn.js/|BN} representing the amount in the output
     * @param addresses An array of {@link https://github.com/feross/buffer|Buffer}s representing addresses
     * @param locktime A {@link https://github.com/indutny/bn.js/|BN} representing the locktime
     * @param threshold A number representing the the threshold number of signers required to sign the transaction
     */
    function StandardAmountOutput(amount, addresses, locktime, threshold) {
        if (amount === void 0) { amount = undefined; }
        if (addresses === void 0) { addresses = undefined; }
        if (locktime === void 0) { locktime = undefined; }
        if (threshold === void 0) { threshold = undefined; }
        var _this = _super.call(this, addresses, locktime, threshold) || this;
        _this._typeName = "StandardAmountOutput";
        _this._typeID = undefined;
        _this.amount = buffer_1.Buffer.alloc(8);
        _this.amountValue = new bn_js_1.default(0);
        if (typeof amount !== "undefined") {
            _this.amountValue = amount.clone();
            _this.amount = bintools.fromBNToBuffer(amount, 8);
        }
        return _this;
    }
    StandardAmountOutput.prototype.serialize = function (encoding) {
        if (encoding === void 0) { encoding = "hex"; }
        var fields = _super.prototype.serialize.call(this, encoding);
        return __assign(__assign({}, fields), { amount: serialization.encoder(this.amount, encoding, "Buffer", "decimalString", 8) });
    };
    StandardAmountOutput.prototype.deserialize = function (fields, encoding) {
        if (encoding === void 0) { encoding = "hex"; }
        _super.prototype.deserialize.call(this, fields, encoding);
        this.amount = serialization.decoder(fields["amount"], encoding, "decimalString", "Buffer", 8);
        this.amountValue = bintools.fromBufferToBN(this.amount);
    };
    /**
     * Returns the amount as a {@link https://github.com/indutny/bn.js/|BN}.
     */
    StandardAmountOutput.prototype.getAmount = function () {
        return this.amountValue.clone();
    };
    /**
     * Popuates the instance from a {@link https://github.com/feross/buffer|Buffer} representing the [[StandardAmountOutput]] and returns the size of the output.
     */
    StandardAmountOutput.prototype.fromBuffer = function (outbuff, offset) {
        if (offset === void 0) { offset = 0; }
        this.amount = bintools.copyFrom(outbuff, offset, offset + 8);
        this.amountValue = bintools.fromBufferToBN(this.amount);
        offset += 8;
        return _super.prototype.fromBuffer.call(this, outbuff, offset);
    };
    /**
     * Returns the buffer representing the [[StandardAmountOutput]] instance.
     */
    StandardAmountOutput.prototype.toBuffer = function () {
        var superbuff = _super.prototype.toBuffer.call(this);
        var bsize = this.amount.length + superbuff.length;
        this.numaddrs.writeUInt32BE(this.addresses.length, 0);
        var barr = [this.amount, superbuff];
        return buffer_1.Buffer.concat(barr, bsize);
    };
    return StandardAmountOutput;
}(Output));
exports.StandardAmountOutput = StandardAmountOutput;
/**
 * An [[Output]] class which specifies an NFT.
 */
var BaseNFTOutput = /** @class */ (function (_super) {
    __extends(BaseNFTOutput, _super);
    function BaseNFTOutput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._typeName = "BaseNFTOutput";
        _this._typeID = undefined;
        _this.groupID = buffer_1.Buffer.alloc(4);
        /**
         * Returns the groupID as a number.
         */
        _this.getGroupID = function () {
            return _this.groupID.readUInt32BE(0);
        };
        return _this;
    }
    BaseNFTOutput.prototype.serialize = function (encoding) {
        if (encoding === void 0) { encoding = "hex"; }
        var fields = _super.prototype.serialize.call(this, encoding);
        return __assign(__assign({}, fields), { groupID: serialization.encoder(this.groupID, encoding, "Buffer", "decimalString", 4) });
    };
    BaseNFTOutput.prototype.deserialize = function (fields, encoding) {
        if (encoding === void 0) { encoding = "hex"; }
        _super.prototype.deserialize.call(this, fields, encoding);
        this.groupID = serialization.decoder(fields["groupID"], encoding, "decimalString", "Buffer", 4);
    };
    return BaseNFTOutput;
}(Output));
exports.BaseNFTOutput = BaseNFTOutput;

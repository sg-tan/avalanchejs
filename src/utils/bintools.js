"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @packageDocumentation
 * @module Utils-BinTools
 */
var bn_js_1 = require("bn.js");
var buffer_1 = require("buffer/");
var create_hash_1 = require("create-hash");
var bech32 = require("bech32");
var base58_1 = require("./base58");
var errors_1 = require("../utils/errors");
var ethers_1 = require("ethers");
/**
 * A class containing tools useful in interacting with binary data cross-platform using
 * nodejs & javascript.
 *
 * This class should never be instantiated directly. Instead,
 * invoke the "BinTools.getInstance()" static * function to grab the singleton
 * instance of the tools.
 *
 * Everything in this library uses
 * the {@link https://github.com/feross/buffer|feross's Buffer class}.
 *
 * ```js
 * const bintools: BinTools = BinTools.getInstance();
 * const b58str:  = bintools.bufferToB58(Buffer.from("Wubalubadubdub!"));
 * ```
 */
var BinTools = /** @class */ (function () {
    function BinTools() {
        var _this = this;
        /**
         * Returns true if meets requirements to parse as an address as Bech32 on X-Chain or P-Chain, otherwise false
         * @param address the string to verify is address
         */
        this.isPrimaryBechAddress = function (address) {
            var parts = address.trim().split("-");
            if (parts.length !== 2) {
                return false;
            }
            try {
                bech32.bech32.fromWords(bech32.bech32.decode(parts[1]).words);
            }
            catch (err) {
                return false;
            }
            return true;
        };
        /**
         * Produces a string from a {@link https://github.com/feross/buffer|Buffer}
         * representing a string. ONLY USED IN TRANSACTION FORMATTING, ASSUMED LENGTH IS PREPENDED.
         *
         * @param buff The {@link https://github.com/feross/buffer|Buffer} to convert to a string
         */
        this.bufferToString = function (buff) {
            return _this.copyFrom(buff, 2).toString("utf8");
        };
        /**
         * Produces a {@link https://github.com/feross/buffer|Buffer} from a string. ONLY USED IN TRANSACTION FORMATTING, LENGTH IS PREPENDED.
         *
         * @param str The string to convert to a {@link https://github.com/feross/buffer|Buffer}
         */
        this.stringToBuffer = function (str) {
            var buff = buffer_1.Buffer.alloc(2 + str.length);
            buff.writeUInt16BE(str.length, 0);
            buff.write(str, 2, str.length, "utf8");
            return buff;
        };
        /**
         * Makes a copy (no reference) of a {@link https://github.com/feross/buffer|Buffer}
         * over provided indecies.
         *
         * @param buff The {@link https://github.com/feross/buffer|Buffer} to copy
         * @param start The index to start the copy
         * @param end The index to end the copy
         */
        this.copyFrom = function (buff, start, end) {
            if (start === void 0) { start = 0; }
            if (end === void 0) { end = undefined; }
            if (end === undefined) {
                end = buff.length;
            }
            return buffer_1.Buffer.from(Uint8Array.prototype.slice.call(buff.slice(start, end)));
        };
        /**
         * Takes a {@link https://github.com/feross/buffer|Buffer} and returns a base-58 string of
         * the {@link https://github.com/feross/buffer|Buffer}.
         *
         * @param buff The {@link https://github.com/feross/buffer|Buffer} to convert to base-58
         */
        this.bufferToB58 = function (buff) { return _this.b58.encode(buff); };
        /**
         * Takes a base-58 string and returns a {@link https://github.com/feross/buffer|Buffer}.
         *
         * @param b58str The base-58 string to convert
         * to a {@link https://github.com/feross/buffer|Buffer}
         */
        this.b58ToBuffer = function (b58str) { return _this.b58.decode(b58str); };
        /**
         * Takes a {@link https://github.com/feross/buffer|Buffer} and returns an ArrayBuffer.
         *
         * @param buff The {@link https://github.com/feross/buffer|Buffer} to
         * convert to an ArrayBuffer
         */
        this.fromBufferToArrayBuffer = function (buff) {
            var ab = new ArrayBuffer(buff.length);
            var view = new Uint8Array(ab);
            for (var i = 0; i < buff.length; ++i) {
                view["".concat(i)] = buff["".concat(i)];
            }
            return view;
        };
        /**
         * Takes an ArrayBuffer and converts it to a {@link https://github.com/feross/buffer|Buffer}.
         *
         * @param ab The ArrayBuffer to convert to a {@link https://github.com/feross/buffer|Buffer}
         */
        this.fromArrayBufferToBuffer = function (ab) {
            var buf = buffer_1.Buffer.alloc(ab.byteLength);
            for (var i = 0; i < ab.byteLength; ++i) {
                buf["".concat(i)] = ab["".concat(i)];
            }
            return buf;
        };
        /**
         * Takes a {@link https://github.com/feross/buffer|Buffer} and converts it
         * to a {@link https://github.com/indutny/bn.js/|BN}.
         *
         * @param buff The {@link https://github.com/feross/buffer|Buffer} to convert
         * to a {@link https://github.com/indutny/bn.js/|BN}
         */
        this.fromBufferToBN = function (buff) {
            if (typeof buff === "undefined") {
                return undefined;
            }
            return new bn_js_1.default(buff.toString("hex"), 16, "be");
        };
        /**
         * Takes a {@link https://github.com/indutny/bn.js/|BN} and converts it
         * to a {@link https://github.com/feross/buffer|Buffer}.
         *
         * @param bn The {@link https://github.com/indutny/bn.js/|BN} to convert
         * to a {@link https://github.com/feross/buffer|Buffer}
         * @param length The zero-padded length of the {@link https://github.com/feross/buffer|Buffer}
         */
        this.fromBNToBuffer = function (bn, length) {
            if (typeof bn === "undefined") {
                return undefined;
            }
            var newarr = bn.toArray("be");
            /**
             * CKC: Still unsure why bn.toArray with a "be" and a length do not work right. Bug?
             */
            if (length) {
                // bn toArray with the length parameter doesn't work correctly, need this.
                var x = length - newarr.length;
                for (var i = 0; i < x; i++) {
                    newarr.unshift(0);
                }
            }
            return buffer_1.Buffer.from(newarr);
        };
        /**
         * Takes a {@link https://github.com/feross/buffer|Buffer} and adds a checksum, returning
         * a {@link https://github.com/feross/buffer|Buffer} with the 4-byte checksum appended.
         *
         * @param buff The {@link https://github.com/feross/buffer|Buffer} to append a checksum
         */
        this.addChecksum = function (buff) {
            var hashslice = buffer_1.Buffer.from((0, create_hash_1.default)("sha256").update(buff).digest().slice(28));
            return buffer_1.Buffer.concat([buff, hashslice]);
        };
        /**
         * Takes a {@link https://github.com/feross/buffer|Buffer} with an appended 4-byte checksum
         * and returns true if the checksum is valid, otherwise false.
         *
         * @param b The {@link https://github.com/feross/buffer|Buffer} to validate the checksum
         */
        this.validateChecksum = function (buff) {
            var checkslice = buff.slice(buff.length - 4);
            var hashslice = buffer_1.Buffer.from((0, create_hash_1.default)("sha256")
                .update(buff.slice(0, buff.length - 4))
                .digest()
                .slice(28));
            return checkslice.toString("hex") === hashslice.toString("hex");
        };
        /**
         * Takes a {@link https://github.com/feross/buffer|Buffer} and returns a base-58 string with
         * checksum as per the cb58 standard.
         *
         * @param bytes A {@link https://github.com/feross/buffer|Buffer} to serialize
         *
         * @returns A serialized base-58 string of the Buffer.
         */
        this.cb58Encode = function (bytes) {
            var x = _this.addChecksum(bytes);
            return _this.bufferToB58(x);
        };
        /**
         * Takes a cb58 serialized {@link https://github.com/feross/buffer|Buffer} or base-58 string
         * and returns a {@link https://github.com/feross/buffer|Buffer} of the original data. Throws on error.
         *
         * @param bytes A cb58 serialized {@link https://github.com/feross/buffer|Buffer} or base-58 string
         */
        this.cb58Decode = function (bytes) {
            if (typeof bytes === "string") {
                bytes = _this.b58ToBuffer(bytes);
            }
            if (_this.validateChecksum(bytes)) {
                return _this.copyFrom(bytes, 0, bytes.length - 4);
            }
            throw new errors_1.ChecksumError("Error - BinTools.cb58Decode: invalid checksum");
        };
        this.cb58DecodeWithChecksum = function (bytes) {
            if (typeof bytes === "string") {
                bytes = _this.b58ToBuffer(bytes);
            }
            if (_this.validateChecksum(bytes)) {
                return "0x".concat(_this.copyFrom(bytes, 0, bytes.length).toString("hex"));
            }
            throw new errors_1.ChecksumError("Error - BinTools.cb58Decode: invalid checksum");
        };
        this.addressToString = function (hrp, chainid, bytes) {
            return "".concat(chainid, "-").concat(bech32.bech32.encode(hrp, bech32.bech32.toWords(bytes)));
        };
        this.stringToAddress = function (address, hrp) {
            if (address.substring(0, 2) === "0x") {
                // ETH-style address
                if ((0, ethers_1.isAddress)(address)) {
                    return buffer_1.Buffer.from(address.substring(2), "hex");
                }
                else {
                    throw new errors_1.HexError("Error - Invalid address");
                }
            }
            // Bech32 addresses
            var parts = address.trim().split("-");
            if (parts.length < 2) {
                throw new errors_1.Bech32Error("Error - Valid address should include -");
            }
            if (parts[0].length < 1) {
                throw new errors_1.Bech32Error("Error - Valid address must have prefix before -");
            }
            var split = parts[1].lastIndexOf("1");
            if (split < 0) {
                throw new errors_1.Bech32Error("Error - Valid address must include separator (1)");
            }
            var humanReadablePart = parts[1].slice(0, split);
            if (humanReadablePart.length < 1) {
                throw new errors_1.Bech32Error("Error - HRP should be at least 1 character");
            }
            if (humanReadablePart !== "avax" &&
                humanReadablePart !== "fuji" &&
                humanReadablePart != "local" &&
                humanReadablePart != "custom" &&
                humanReadablePart != hrp) {
                throw new errors_1.Bech32Error("Error - Invalid HRP");
            }
            return buffer_1.Buffer.from(bech32.bech32.fromWords(bech32.bech32.decode(parts[1]).words));
        };
        /**
         * Takes an address and returns its {@link https://github.com/feross/buffer|Buffer}
         * representation if valid. A more strict version of stringToAddress.
         *
         * @param addr A string representation of the address
         * @param blockchainID A cb58 encoded string representation of the blockchainID
         * @param alias A chainID alias, if any, that the address can also parse from.
         * @param addrlen VMs can use any addressing scheme that they like, so this is the appropriate number of address bytes. Default 20.
         *
         * @returns A {@link https://github.com/feross/buffer|Buffer} for the address if valid,
         * undefined if not valid.
         */
        this.parseAddress = function (addr, blockchainID, alias, addrlen) {
            if (alias === void 0) { alias = undefined; }
            if (addrlen === void 0) { addrlen = 20; }
            var abc = addr.split("-");
            if (abc.length === 2 &&
                ((alias && abc[0] === alias) || (blockchainID && abc[0] === blockchainID))) {
                var addrbuff = _this.stringToAddress(addr);
                if ((addrlen && addrbuff.length === addrlen) || !addrlen) {
                    return addrbuff;
                }
            }
            return undefined;
        };
        this.b58 = base58_1.Base58.getInstance();
    }
    /**
     * Retrieves the BinTools singleton.
     */
    BinTools.getInstance = function () {
        if (!BinTools.instance) {
            BinTools.instance = new BinTools();
        }
        return BinTools.instance;
    };
    /**
     * Returns true if base64, otherwise false
     * @param str the string to verify is Base64
     */
    BinTools.prototype.isBase64 = function (str) {
        if (str === "" || str.trim() === "") {
            return false;
        }
        try {
            var b64 = buffer_1.Buffer.from(str, "base64");
            return b64.toString("base64") === str;
        }
        catch (err) {
            return false;
        }
    };
    /**
     * Returns true if cb58, otherwise false
     * @param cb58 the string to verify is cb58
     */
    BinTools.prototype.isCB58 = function (cb58) {
        return this.isBase58(cb58);
    };
    /**
     * Returns true if base58, otherwise false
     * @param base58 the string to verify is base58
     */
    BinTools.prototype.isBase58 = function (base58) {
        if (base58 === "" || base58.trim() === "") {
            return false;
        }
        try {
            return this.b58.encode(this.b58.decode(base58)) === base58;
        }
        catch (err) {
            return false;
        }
    };
    /**
     * Returns true if hexidecimal, otherwise false
     * @param hex the string to verify is hexidecimal
     */
    BinTools.prototype.isHex = function (hex) {
        if (hex === "" || hex.trim() === "") {
            return false;
        }
        var startsWith0x = hex.startsWith("0x");
        var matchResult = startsWith0x
            ? hex.slice(2).match(/[0-9A-Fa-f]/g)
            : hex.match(/[0-9A-Fa-f]/g);
        if ((startsWith0x && hex.length - 2 == matchResult.length) ||
            hex.length == matchResult.length) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Returns true if decimal, otherwise false
     * @param str the string to verify is hexidecimal
     */
    BinTools.prototype.isDecimal = function (str) {
        if (str === "" || str.trim() === "") {
            return false;
        }
        try {
            return new bn_js_1.default(str, 10).toString(10) === str.trim();
        }
        catch (err) {
            return false;
        }
    };
    return BinTools;
}());
exports.default = BinTools;

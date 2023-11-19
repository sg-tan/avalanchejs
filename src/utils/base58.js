"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base58 = void 0;
/**
 * @packageDocumentation
 * @module Utils-Base58
 */
var bn_js_1 = require("bn.js");
var buffer_1 = require("buffer/");
var errors_1 = require("../utils/errors");
/**
 * A Base58 class that uses the cross-platform Buffer module. Built so that Typescript
 * will accept the code.
 *
 * ```js
 * let b58:Base58 = new Base58();
 * let str:string = b58.encode(somebuffer);
 * let buff:Buffer = b58.decode(somestring);
 * ```
 */
var Base58 = /** @class */ (function () {
    function Base58() {
        var _this = this;
        this.b58alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
        this.alphabetIdx0 = "1";
        this.b58 = [
            255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
            255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
            255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
            255, 255, 255, 255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 255, 255, 255, 255, 255, 255,
            255, 9, 10, 11, 12, 13, 14, 15, 16, 255, 17, 18, 19, 20, 21, 255, 22, 23,
            24, 25, 26, 27, 28, 29, 30, 31, 32, 255, 255, 255, 255, 255, 255, 33, 34,
            35, 36, 37, 38, 39, 40, 41, 42, 43, 255, 44, 45, 46, 47, 48, 49, 50, 51, 52,
            53, 54, 55, 56, 57, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
            255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
            255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
            255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
            255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
            255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
            255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
            255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
            255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
            255, 255
        ];
        this.big58Radix = new bn_js_1.default(58);
        this.bigZero = new bn_js_1.default(0);
        /**
         * Encodes a {@link https://github.com/feross/buffer|Buffer} as a base-58 string
         *
         * @param buff A {@link https://github.com/feross/buffer|Buffer} to encode
         *
         * @returns A base-58 string.
         */
        this.encode = function (buff) {
            var x = new bn_js_1.default(buff.toString("hex"), "hex", "be");
            var answer = ""; // = Buffer.alloc(buff.length*136/100, 0);
            while (x.cmp(_this.bigZero) > 0) {
                var mod = x.mod(_this.big58Radix);
                x = x.div(_this.big58Radix);
                answer += _this.b58alphabet[mod.toNumber()];
            }
            for (var i = 0; i < buff.length; i++) {
                if (buff.readUInt8(i) !== 0) {
                    break;
                }
                answer += _this.alphabetIdx0;
            }
            return answer.split("").reverse().join("");
        };
        /**
         * Decodes a base-58 into a {@link https://github.com/feross/buffer|Buffer}
         *
         * @param b A base-58 string to decode
         *
         * @returns A {@link https://github.com/feross/buffer|Buffer} from the decoded string.
         */
        this.decode = function (b) {
            var answer = new bn_js_1.default(0);
            var j = new bn_js_1.default(1);
            for (var i = b.length - 1; i >= 0; i--) {
                var tmp = _this.b58[b.charCodeAt(i)];
                if (tmp === 255) {
                    throw new errors_1.Base58Error("Error - Base58.decode: not a valid base58 string");
                }
                var scratch = new bn_js_1.default(tmp);
                scratch.imul(j);
                answer.iadd(scratch);
                j.imul(_this.big58Radix);
            }
            /* we need to make sure the prefaced 0's are put back to be even in this string */
            var anshex = answer.toString("hex");
            anshex = anshex.length % 2 ? "0".concat(anshex) : anshex;
            /**
             * We need to replace all zeros that were removed during our conversation process.
             * This ensures the buffer returns is the appropriate length.
             */
            var tmpval = buffer_1.Buffer.from(anshex, "hex");
            var numZeros;
            for (numZeros = 0; numZeros < b.length; numZeros++) {
                if (b["".concat(numZeros)] !== _this.alphabetIdx0) {
                    break;
                }
            }
            var xlen = numZeros + tmpval.length;
            var result = buffer_1.Buffer.alloc(xlen, 0);
            tmpval.copy(result, numZeros);
            return result;
        };
    }
    /**
     * Retrieves the Base58 singleton.
     */
    Base58.getInstance = function () {
        if (!Base58.instance) {
            Base58.instance = new Base58();
        }
        return Base58.instance;
    };
    return Base58;
}());
exports.Base58 = Base58;

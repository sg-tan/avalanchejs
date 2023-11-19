"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var src_1 = require("../../src");
var evm_1 = require("../../src/apis/evm");
var utils_1 = require("../../src/utils");
var bech32 = require("bech32");
var cb58 = "cb58";
var serialization = utils_1.Serialization.getInstance();
var getTxData = function (item) {
    var txSplit = item.split("0x000000000001");
    var prefix = "0x0000";
    var txData = prefix + txSplit[1];
    return txData;
};
var fromDecToHex = function (item) {
    var hexVal = item.toString(16);
    var hexString = hexVal.length < 2 ? "0" + hexVal : hexVal;
    return hexString;
};
var fromHexToDec = function (item) {
    var hexString = item.split("0x").join("");
    var decNumber = parseInt(hexString, 16);
    var value = decNumber / Math.pow(10, 9);
    return value;
};
var toHexThenDec = function (item) {
    var toHex = fromDecToHex(item).split(",").join("");
    var hexString = toHex.split("0x").join("");
    var decNumber = parseInt(hexString, 16);
    return decNumber;
};
var bufToHex = function (item) {
    var valueFromJSON = item;
    var bufValueFromJson = src_1.Buffer.from(valueFromJSON);
    var arrValueFromJSON = __spreadArray([], bufValueFromJson, true);
    var hexValueFromJSON = arrValueFromJSON.map(function (item) { return fromDecToHex(item); });
    return "0x" + hexValueFromJSON.toString().split(",").join("");
};
var bech32Encoder = function (item) {
    var hrp = "avax";
    var valueFromJSON = item;
    var bufValueFromJson = src_1.Buffer.from(valueFromJSON);
    var arrValueFromJSON = __spreadArray([], bufValueFromJson, true);
    var bech32Address = bech32.bech32.encode(hrp, bech32.bech32.toWords(arrValueFromJSON));
    return "C-" + bech32Address;
};
var base58Encoder = function (item) {
    var valToBeEncoded = src_1.Buffer.from(item);
    var base58Val = serialization.bufferToType(valToBeEncoded, cb58);
    return base58Val;
};
var chainName = function (item) {
    var chainID = base58Encoder(item);
    var name = "null";
    var cchainID = "2q9e4r6Mu3U68nU1fYjgbR6JvwrRx36CohpAX5UQxse55x1Q5";
    var pchainID = "11111111111111111111111111111111LpoYY";
    chainID == "11111111111111111111111111111111LpoYY"
        ? (name = "P-Chain")
        : (name = "X-Chain");
    chainID == cchainID
        ? (name = "C-Chain")
        : chainID == pchainID
            ? name == "P-Chain"
            : (name = "X-Chain");
    return name;
};
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var blockExtraData, txData, buf, tx, txString, txToObject, displayExportTx, displayImportTx;
    return __generator(this, function (_a) {
        blockExtraData = "0x00000000000100000001000000010427d4b22a2a78bcddd456742caf91b56badbff985ee19aef14573e7343fd652000000000000000000000000000000000000000000000000000000000000000000000001bb900bbe1a20da4d474666b79a5fa6ce1262973300000000009dba8421e67317cbc4be2aeb00677ad6462778a8f52274b9d605df2591b23027a87dff00000000000000370000000121e67317cbc4be2aeb00677ad6462778a8f52274b9d605df2591b23027a87dff000000070000000000989680000000000000000000000001000000015feaa6c211cc8376e16211a76eff1e88bad8079d000000010000000900000001f526c9a38a2da08291583bf86e5160bd8b49df585b3fc2fb57884390c673f748428c58e95c6514b9d6a27d273550c63070ab64d257798e8d07f8a208489ebb2100";
        txData = getTxData(blockExtraData);
        buf = new src_1.Buffer(txData.slice(2), "hex");
        tx = new evm_1.Tx();
        tx.fromBuffer(buf);
        txString = JSON.stringify(tx);
        txToObject = JSON.parse(txString);
        displayExportTx = function () {
            //exportTx
            var exportedTxInputs = txToObject.unsignedTx.transaction.inputs.map(function (input) { return ({
                Address: bufToHex(input.address.data),
                Amount: bufToHex(input.amount.data),
                AmountValue: "0x" + input.amountValue,
                DecimalAmountValue: fromHexToDec(input.amountValue) + " AVAX",
                AssetID: base58Encoder(input.assetID.data),
                Nonce: bufToHex(input.nonce.data),
                NonceValue: input.nonceValue,
                SignaturesCount: toHexThenDec(input.sigCount.data),
                SignaturesIDs: input.sigIdxs
            }); });
            var exportedTxExpOutputs = txToObject.unsignedTx.transaction.exportedOutputs.map(function (out) { return ({
                Type: out._typeName,
                AssetID: base58Encoder(out.assetID.data),
                Output: {
                    Type: out.output._typeName,
                    TypeID: out.output._typeID,
                    Locktime: toHexThenDec(out.output.locktime.data),
                    Threshold: toHexThenDec(out.output.threshold.data),
                    NumberOfAddresses: toHexThenDec(out.output.numaddrs.data),
                    Addresses: out.output.addresses.map(function (address) { return ({
                        Type: address._typeName,
                        Bytes: bufToHex(address.bytes.data),
                        BytesSize: address.bsize,
                        Bech32Format: bech32Encoder(address.bytes.data)
                    }); }),
                    Amount: bufToHex(out.output.amount),
                    AmountValue: "0x" + out.output.amountValue,
                    DecimalAmountValue: fromHexToDec(out.output.amountValue) + " AVAX"
                }
            }); });
            var exportedTxCredentials = txToObject.credentials.map(function (credential) { return ({
                Type: credential._typeName,
                TypeID: credential._typeID,
                Signatures: credential.sigArray.map(function (signature) { return ({
                    Type: signature._typeName,
                    Bytes: bufToHex(signature.bytes.data),
                    BytesSize: signature.bsize
                }); })
            }); });
            var exportTx = {
                Type: txToObject._typeName,
                UnsignedTx: {
                    Type: txToObject.unsignedTx._typeName,
                    CodecID: txToObject.unsignedTx.codecID,
                    Transaction: {
                        Type: txToObject.unsignedTx.transaction._typeName,
                        TypeID: txToObject.unsignedTx.transaction._typeID,
                        NetworkID: toHexThenDec(txToObject.unsignedTx.transaction.networkID.data),
                        BlockchainID: base58Encoder(txToObject.unsignedTx.transaction.blockchainID.data),
                        BlockchainIDName: chainName(txToObject.unsignedTx.transaction.blockchainID.data),
                        DestinationChain: base58Encoder(txToObject.unsignedTx.transaction.destinationChain.data),
                        DestinationChainName: chainName(txToObject.unsignedTx.transaction.destinationChain.data),
                        NumberOfInputs: toHexThenDec(txToObject.unsignedTx.transaction.numInputs.data),
                        Inputs: exportedTxInputs,
                        NumberOfExportedOutputs: toHexThenDec(txToObject.unsignedTx.transaction.numExportedOutputs.data),
                        ExportedOutputs: exportedTxExpOutputs
                    }
                },
                Credentials: exportedTxCredentials
            };
            console.log(require("util").inspect(exportTx, true, 10));
        };
        displayImportTx = function () {
            //importTX
            var importedTxImpInputs = txToObject.unsignedTx.transaction.importIns.map(function (inp) { return ({
                Type: inp._typeName,
                TransactionId: base58Encoder(inp.txid.data),
                OutputId: toHexThenDec(inp.outputidx.data),
                AssetID: base58Encoder(inp.assetID.data),
                Input: {
                    Type: inp.input._typeName,
                    TypeID: inp.input._typeID,
                    SignaturesIds: inp.input.sigIdxs.map(function (signature) { return ({
                        Type: signature._typeName,
                        Source: bufToHex(signature.source),
                        Bytes: bufToHex(signature.bytes.data),
                        BytesSize: signature.bsize
                    }); }),
                    Amount: bufToHex(inp.input.amount),
                    AmountValue: "0x" + inp.input.amountValue,
                    DecimalAmountValue: fromHexToDec(inp.input.amountValue) + " AVAX"
                }
            }); });
            var importedTxOutputs = txToObject.unsignedTx.transaction.outs.map(function (out) { return ({
                Address: bufToHex(out.address.data),
                Amount: bufToHex(out.amount.data),
                AmountValue: "0x" + out.amountValue,
                DecimalAmountValue: fromHexToDec(out.amountValue) + " AVAX",
                AssetID: base58Encoder(out.assetID.data)
            }); });
            var importedTxCredentials = txToObject.credentials.map(function (credential) { return ({
                Type: credential._typeName,
                TypeID: credential._typeID,
                Signatures: credential.sigArray.map(function (signature) { return ({
                    Type: signature._typeName,
                    Bytes: bufToHex(signature.bytes.data),
                    BytesSize: signature.bsize
                }); })
            }); });
            var importTx = {
                Type: txToObject._typeName,
                UnsignedTx: {
                    Type: txToObject.unsignedTx._typeName,
                    CodecID: txToObject.unsignedTx.codecID,
                    Transaction: {
                        Type: txToObject.unsignedTx.transaction._typeName,
                        TypeID: txToObject.unsignedTx.transaction._typeID,
                        NetworkID: toHexThenDec(txToObject.unsignedTx.transaction.networkID.data),
                        BlockchainID: base58Encoder(txToObject.unsignedTx.transaction.blockchainID.data),
                        BlockchainIDName: chainName(txToObject.unsignedTx.transaction.blockchainID.data),
                        SourceChain: base58Encoder(txToObject.unsignedTx.transaction.sourceChain.data),
                        SourceChainName: chainName(txToObject.unsignedTx.transaction.sourceChain.data),
                        NumberOfImportedInputs: toHexThenDec(txToObject.unsignedTx.transaction.numIns.data),
                        ImportedInputs: importedTxImpInputs,
                        NumberOfOutputs: toHexThenDec(txToObject.unsignedTx.transaction.numOuts.data),
                        Outputs: importedTxOutputs
                    }
                },
                Credentials: importedTxCredentials
            };
            console.log(require("util").inspect(importTx, true, 10));
        };
        txToObject.unsignedTx.transaction._typeName == "ExportTx"
            ? displayExportTx()
            : displayImportTx();
        return [2 /*return*/];
    });
}); };
main();

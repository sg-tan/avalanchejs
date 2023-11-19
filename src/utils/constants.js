"use strict";
/**
 * @packageDocumentation
 * @module Utils-Constants
 */
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
exports.Defaults = exports.AVAXSTAKECAP = exports.AVAXGWEI = exports.GWEI = exports.WEI = exports.NANOAVAX = exports.MICROAVAX = exports.MILLIAVAX = exports.CENTIAVAX = exports.DECIAVAX = exports.ONEAVAX = exports.mnemonic = exports.DefaultEVMLocalGenesisAddress = exports.DefaultEVMLocalGenesisPrivateKey = exports.DefaultLocalGenesisPrivateKey = exports.PChainVMName = exports.CChainVMName = exports.XChainVMName = exports.PChainAlias = exports.CChainAlias = exports.XChainAlias = exports.PrimaryNetworkID = exports.PlatformChainID = exports.DefaultNetworkID = exports.FallbackEVMChainID = exports.FallbackNetworkName = exports.FallbackHRP = exports.NetworkNameToNetworkID = exports.NetworkIDToNetworkNames = exports.HRPToNetworkID = exports.NetworkIDToHRP = exports.FujiAPI = exports.MainnetAPI = exports.PrimaryAssetAlias = exports.NodeIDPrefix = exports.PrivateKeyPrefix = void 0;
var bn_js_1 = require("bn.js");
exports.PrivateKeyPrefix = "PrivateKey-";
exports.NodeIDPrefix = "NodeID-";
exports.PrimaryAssetAlias = "AVAX";
exports.MainnetAPI = "api.avax.network";
exports.FujiAPI = "api.avax-test.network";
exports.NetworkIDToHRP = {
    0: "custom",
    1: "avax",
    2: "cascade",
    3: "denali",
    4: "everest",
    5: "fuji",
    1337: "custom",
    12345: "local"
};
exports.HRPToNetworkID = {
    manhattan: 0,
    avax: 1,
    cascade: 2,
    denali: 3,
    everest: 4,
    fuji: 5,
    custom: 1337,
    local: 12345
};
exports.NetworkIDToNetworkNames = {
    0: ["Manhattan"],
    1: ["Avalanche", "Mainnet"],
    2: ["Cascade"],
    3: ["Denali"],
    4: ["Everest"],
    5: ["Fuji", "Testnet"],
    1337: ["Custom Network"],
    12345: ["Local Network"]
};
exports.NetworkNameToNetworkID = {
    Manhattan: 0,
    Avalanche: 1,
    Mainnet: 1,
    Cascade: 2,
    Denali: 3,
    Everest: 4,
    Fuji: 5,
    Testnet: 5,
    Custom: 1337,
    "Custom Network": 1337,
    Local: 12345,
    "Local Network": 12345
};
exports.FallbackHRP = "custom";
exports.FallbackNetworkName = "Custom Network";
exports.FallbackEVMChainID = 43112;
exports.DefaultNetworkID = 1;
exports.PlatformChainID = "11111111111111111111111111111111LpoYY";
exports.PrimaryNetworkID = "11111111111111111111111111111111LpoYY";
exports.XChainAlias = "X";
exports.CChainAlias = "C";
exports.PChainAlias = "P";
exports.XChainVMName = "avm";
exports.CChainVMName = "evm";
exports.PChainVMName = "platformvm";
// DO NOT use the following private keys and/or mnemonic on Fuji or Testnet
// This address/account is for testing on the local avash network
exports.DefaultLocalGenesisPrivateKey = "ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN";
exports.DefaultEVMLocalGenesisPrivateKey = "0x56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027";
exports.DefaultEVMLocalGenesisAddress = "0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC";
exports.mnemonic = "output tooth keep tooth bracket fox city sustain blood raise install pond stem reject long scene clap gloom purpose mean music piece unknown light";
exports.ONEAVAX = new bn_js_1.default(1000000000);
exports.DECIAVAX = exports.ONEAVAX.div(new bn_js_1.default(10));
exports.CENTIAVAX = exports.ONEAVAX.div(new bn_js_1.default(100));
exports.MILLIAVAX = exports.ONEAVAX.div(new bn_js_1.default(1000));
exports.MICROAVAX = exports.ONEAVAX.div(new bn_js_1.default(1000000));
exports.NANOAVAX = exports.ONEAVAX.div(new bn_js_1.default(1000000000));
exports.WEI = new bn_js_1.default(1);
exports.GWEI = exports.WEI.mul(new bn_js_1.default(1000000000));
exports.AVAXGWEI = exports.NANOAVAX.clone();
exports.AVAXSTAKECAP = exports.ONEAVAX.mul(new bn_js_1.default(3000000));
// Start Manhattan
var n0X = {
    blockchainID: "2vrXWHgGxh5n3YsLHMV16YVVJTpT4z45Fmb4y3bL6si8kLCyg9",
    alias: exports.XChainAlias,
    vm: exports.XChainVMName,
    fee: exports.MILLIAVAX,
    creationTxFee: exports.CENTIAVAX,
    mintTxFee: exports.MILLIAVAX
};
var n0P = {
    blockchainID: exports.PlatformChainID,
    alias: exports.PChainAlias,
    vm: exports.PChainVMName,
    fee: exports.MILLIAVAX,
    creationTxFee: exports.CENTIAVAX,
    createSubnetTx: exports.ONEAVAX,
    createChainTx: exports.ONEAVAX,
    minConsumption: 0.1,
    maxConsumption: 0.12,
    maxStakingDuration: new bn_js_1.default(31536000),
    maxSupply: new bn_js_1.default(720000000).mul(exports.ONEAVAX),
    minStake: exports.ONEAVAX.mul(new bn_js_1.default(2000)),
    minStakeDuration: 2 * 7 * 24 * 60 * 60,
    maxStakeDuration: 365 * 24 * 60 * 60,
    minDelegationStake: exports.ONEAVAX.mul(new bn_js_1.default(25)),
    minDelegationFee: new bn_js_1.default(2)
};
var n0C = {
    blockchainID: "2fFZQibQXcd6LTE4rpBPBAkLVXFE91Kit8pgxaBG1mRnh5xqbb",
    alias: exports.CChainAlias,
    vm: exports.CChainVMName,
    fee: exports.MILLIAVAX,
    gasPrice: exports.GWEI.mul(new bn_js_1.default(470)),
    chainID: 43111
};
// End Manhattan
// Start mainnet
var avaxAssetID = "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z";
var n1X = {
    blockchainID: "2oYMBNV4eNHyqk2fjjV5nVQLDbtmNJzq5s3qs3Lo6ftnC6FByM",
    avaxAssetID: avaxAssetID,
    alias: exports.XChainAlias,
    vm: exports.XChainVMName,
    txFee: exports.MILLIAVAX,
    creationTxFee: exports.CENTIAVAX,
    mintTxFee: exports.MILLIAVAX
};
var n1P = {
    blockchainID: exports.PlatformChainID,
    avaxAssetID: avaxAssetID,
    alias: exports.PChainAlias,
    vm: exports.PChainVMName,
    txFee: exports.MILLIAVAX,
    createSubnetTx: exports.ONEAVAX,
    createChainTx: exports.ONEAVAX,
    creationTxFee: exports.CENTIAVAX,
    minConsumption: 0.1,
    maxConsumption: 0.12,
    maxStakingDuration: new bn_js_1.default(31536000),
    maxSupply: new bn_js_1.default(720000000).mul(exports.ONEAVAX),
    minStake: exports.ONEAVAX.mul(new bn_js_1.default(2000)),
    minStakeDuration: 2 * 7 * 24 * 60 * 60,
    maxStakeDuration: 365 * 24 * 60 * 60,
    minDelegationStake: exports.ONEAVAX.mul(new bn_js_1.default(25)),
    minDelegationFee: new bn_js_1.default(2)
};
var n1C = {
    blockchainID: "2q9e4r6Mu3U68nU1fYjgbR6JvwrRx36CohpAX5UQxse55x1Q5",
    alias: exports.CChainAlias,
    vm: exports.CChainVMName,
    txBytesGas: 1,
    costPerSignature: 1000,
    // DEPRECATED - txFee
    // WILL BE REMOVED IN NEXT MAJOR VERSION BUMP
    txFee: exports.MILLIAVAX,
    // DEPRECATED - gasPrice
    // WILL BE REMOVED IN NEXT MAJOR VERSION BUMP
    gasPrice: exports.GWEI.mul(new bn_js_1.default(225)),
    minGasPrice: exports.GWEI.mul(new bn_js_1.default(25)),
    maxGasPrice: exports.GWEI.mul(new bn_js_1.default(1000)),
    chainID: 43114
};
// End Mainnet
// Start Cascade
var n2X = {
    blockchainID: "4ktRjsAKxgMr2aEzv9SWmrU7Xk5FniHUrVCX4P1TZSfTLZWFM",
    alias: exports.XChainAlias,
    vm: exports.XChainVMName,
    txFee: 0,
    creationTxFee: 0,
    mintTxFee: new bn_js_1.default(0)
};
var n2P = {
    blockchainID: exports.PlatformChainID,
    alias: exports.PChainAlias,
    vm: exports.PChainVMName,
    txFee: 0,
    creationTxFee: 0,
    createSubnetTx: exports.ONEAVAX,
    createChainTx: exports.ONEAVAX,
    minConsumption: 0.1,
    maxConsumption: 0.12,
    maxStakingDuration: new bn_js_1.default(31536000),
    maxSupply: new bn_js_1.default(720000000).mul(exports.ONEAVAX),
    minStake: exports.ONEAVAX.mul(new bn_js_1.default(2000)),
    minStakeDuration: 2 * 7 * 24 * 60 * 60,
    maxStakeDuration: 365 * 24 * 60 * 60,
    minDelegationStake: exports.ONEAVAX.mul(new bn_js_1.default(25)),
    minDelegationFee: new bn_js_1.default(2)
};
var n2C = {
    blockchainID: "2mUYSXfLrDtigwbzj1LxKVsHwELghc5sisoXrzJwLqAAQHF4i",
    alias: exports.CChainAlias,
    vm: exports.CChainVMName,
    gasPrice: 0
};
// End Cascade
// Start Denali
var n3X = {
    blockchainID: "rrEWX7gc7D9mwcdrdBxBTdqh1a7WDVsMuadhTZgyXfFcRz45L",
    alias: exports.XChainAlias,
    vm: exports.XChainVMName,
    txFee: 0,
    creationTxFee: 0,
    mintTxFee: new bn_js_1.default(0)
};
var n3P = {
    blockchainID: "",
    alias: exports.PChainAlias,
    vm: exports.PChainVMName,
    txFee: 0,
    creationTxFee: 0,
    createSubnetTx: exports.ONEAVAX,
    createChainTx: exports.ONEAVAX,
    minConsumption: 0.1,
    maxConsumption: 0.12,
    maxStakingDuration: new bn_js_1.default(31536000),
    maxSupply: new bn_js_1.default(720000000).mul(exports.ONEAVAX),
    minStake: exports.ONEAVAX.mul(new bn_js_1.default(2000)),
    minStakeDuration: 2 * 7 * 24 * 60 * 60,
    maxStakeDuration: 365 * 24 * 60 * 60,
    minDelegationStake: exports.ONEAVAX.mul(new bn_js_1.default(25)),
    minDelegationFee: new bn_js_1.default(2)
};
var n3C = {
    blockchainID: "zJytnh96Pc8rM337bBrtMvJDbEdDNjcXG3WkTNCiLp18ergm9",
    alias: exports.CChainAlias,
    vm: exports.CChainVMName,
    gasPrice: 0
};
// End Denali
// Start Everest
var n4X = {
    blockchainID: "jnUjZSRt16TcRnZzmh5aMhavwVHz3zBrSN8GfFMTQkzUnoBxC",
    alias: exports.XChainAlias,
    vm: exports.XChainVMName,
    txFee: exports.MILLIAVAX,
    creationTxFee: exports.CENTIAVAX,
    mintTxFee: exports.MILLIAVAX
};
var n4P = {
    blockchainID: exports.PlatformChainID,
    alias: exports.PChainAlias,
    vm: exports.PChainVMName,
    txFee: exports.MILLIAVAX,
    creationTxFee: exports.CENTIAVAX,
    createSubnetTx: exports.ONEAVAX,
    createChainTx: exports.ONEAVAX,
    minConsumption: 0.1,
    maxConsumption: 0.12,
    maxStakingDuration: new bn_js_1.default(31536000),
    maxSupply: new bn_js_1.default(720000000).mul(exports.ONEAVAX),
    minStake: exports.ONEAVAX.mul(new bn_js_1.default(2000)),
    minStakeDuration: 2 * 7 * 24 * 60 * 60,
    maxStakeDuration: 365 * 24 * 60 * 60,
    minDelegationStake: exports.ONEAVAX.mul(new bn_js_1.default(25)),
    minDelegationFee: new bn_js_1.default(2)
};
var n4C = {
    blockchainID: "saMG5YgNsFxzjz4NMkEkt3bAH6hVxWdZkWcEnGB3Z15pcAmsK",
    alias: exports.CChainAlias,
    vm: exports.CChainVMName,
    gasPrice: exports.GWEI.mul(new bn_js_1.default(470)),
    chainID: 43110
};
// End Everest
// Start Fuji
avaxAssetID = "U8iRqJoiJm8xZHAacmvYyZVwqQx6uDNtQeP3CQ6fcgQk3JqnK";
var n5X = {
    blockchainID: "2JVSBoinj9C2J33VntvzYtVJNZdN2NKiwwKjcumHUWEb5DbBrm",
    avaxAssetID: avaxAssetID,
    alias: exports.XChainAlias,
    vm: exports.XChainVMName,
    txFee: exports.MILLIAVAX,
    creationTxFee: exports.CENTIAVAX,
    mintTxFee: exports.MILLIAVAX
};
var n5P = {
    blockchainID: exports.PlatformChainID,
    avaxAssetID: avaxAssetID,
    alias: exports.PChainAlias,
    vm: exports.PChainVMName,
    txFee: exports.MILLIAVAX,
    creationTxFee: exports.CENTIAVAX,
    createSubnetTx: exports.ONEAVAX,
    createChainTx: exports.ONEAVAX,
    minConsumption: 0.1,
    maxConsumption: 0.12,
    maxStakingDuration: new bn_js_1.default(31536000),
    maxSupply: new bn_js_1.default(720000000).mul(exports.ONEAVAX),
    minStake: exports.ONEAVAX,
    minStakeDuration: 24 * 60 * 60,
    maxStakeDuration: 365 * 24 * 60 * 60,
    minDelegationStake: exports.ONEAVAX,
    minDelegationFee: new bn_js_1.default(2)
};
var n5C = {
    blockchainID: "yH8D7ThNJkxmtkuv2jgBa4P1Rn3Qpr4pPr7QYNfcdoS6k6HWp",
    alias: exports.CChainAlias,
    vm: exports.CChainVMName,
    txBytesGas: 1,
    costPerSignature: 1000,
    // DEPRECATED - txFee
    // WILL BE REMOVED IN NEXT MAJOR VERSION BUMP
    txFee: exports.MILLIAVAX,
    // DEPRECATED - gasPrice
    // WILL BE REMOVED IN NEXT MAJOR VERSION BUMP
    gasPrice: exports.GWEI.mul(new bn_js_1.default(225)),
    minGasPrice: exports.GWEI.mul(new bn_js_1.default(25)),
    maxGasPrice: exports.GWEI.mul(new bn_js_1.default(1000)),
    chainID: 43113
};
// End Fuji
// Start custom network
avaxAssetID = "BUuypiq2wyuLMvyhzFXcPyxPMCgSp7eeDohhQRqTChoBjKziC";
var n1337X = __assign({}, n5X);
n1337X.blockchainID = "qzfF3A11KzpcHkkqznEyQgupQrCNS6WV6fTUTwZpEKqhj1QE7";
n1337X.avaxAssetID = avaxAssetID;
var n1337P = __assign({}, n5P);
n1337P.blockchainID = exports.PlatformChainID;
var n1337C = __assign({}, n5C);
n1337C.blockchainID = "BR28ypgLATNS6PbtHMiJ7NQ61vfpT27Hj8tAcZ1AHsfU5cz88";
n1337C.avaxAssetID = avaxAssetID;
n1337C.chainID = 43112;
// End custom network
// Start local network
avaxAssetID = "2fombhL7aGPwj3KH4bfrmJwW6PVnMobf9Y2fn9GwxiAAJyFDbe";
var n12345X = __assign({}, n5X);
n12345X.blockchainID = "2eNy1mUFdmaxXNj1eQHUe7Np4gju9sJsEtWQ4MX3ToiNKuADed";
n12345X.avaxAssetID = avaxAssetID;
var n12345P = __assign({}, n5P);
n12345P.blockchainID = exports.PlatformChainID;
var n12345C = __assign({}, n5C);
n12345C.blockchainID = "2CA6j5zYzasynPsFeNoqWkmTCt3VScMvXUZHbfDJ8k3oGzAPtU";
n12345C.avaxAssetID = avaxAssetID;
n12345C.chainID = 43112;
// End local network
var Defaults = /** @class */ (function () {
    function Defaults() {
    }
    Defaults.network = {
        0: {
            hrp: exports.NetworkIDToHRP[0],
            X: n0X,
            "2vrXWHgGxh5n3YsLHMV16YVVJTpT4z45Fmb4y3bL6si8kLCyg9": n0X,
            P: n0P,
            "11111111111111111111111111111111LpoYY": n0P,
            C: n0C,
            "2fFZQibQXcd6LTE4rpBPBAkLVXFE91Kit8pgxaBG1mRnh5xqbb": n0C
        },
        1: {
            hrp: exports.NetworkIDToHRP[1],
            X: n1X,
            "2oYMBNV4eNHyqk2fjjV5nVQLDbtmNJzq5s3qs3Lo6ftnC6FByM": n1X,
            P: n1P,
            "11111111111111111111111111111111LpoYY": n1P,
            C: n1C,
            "2q9e4r6Mu3U68nU1fYjgbR6JvwrRx36CohpAX5UQxse55x1Q5": n1C
        },
        2: {
            hrp: exports.NetworkIDToHRP[2],
            X: n2X,
            "4ktRjsAKxgMr2aEzv9SWmrU7Xk5FniHUrVCX4P1TZSfTLZWFM": n2X,
            P: n2P,
            "11111111111111111111111111111111LpoYY": n2P,
            C: n2C,
            "2mUYSXfLrDtigwbzj1LxKVsHwELghc5sisoXrzJwLqAAQHF4i": n2C
        },
        3: {
            hrp: exports.NetworkIDToHRP[3],
            X: n3X,
            rrEWX7gc7D9mwcdrdBxBTdqh1a7WDVsMuadhTZgyXfFcRz45L: n3X,
            P: n3P,
            "11111111111111111111111111111111LpoYY": n3P,
            C: n3C,
            zJytnh96Pc8rM337bBrtMvJDbEdDNjcXG3WkTNCiLp18ergm9: n3C
        },
        4: {
            hrp: exports.NetworkIDToHRP[4],
            X: n4X,
            jnUjZSRt16TcRnZzmh5aMhavwVHz3zBrSN8GfFMTQkzUnoBxC: n4X,
            P: n4P,
            "11111111111111111111111111111111LpoYY": n4P,
            C: n4C,
            saMG5YgNsFxzjz4NMkEkt3bAH6hVxWdZkWcEnGB3Z15pcAmsK: n4C
        },
        5: {
            hrp: exports.NetworkIDToHRP[5],
            X: n5X,
            "2JVSBoinj9C2J33VntvzYtVJNZdN2NKiwwKjcumHUWEb5DbBrm": n5X,
            P: n5P,
            "11111111111111111111111111111111LpoYY": n5P,
            C: n5C,
            yH8D7ThNJkxmtkuv2jgBa4P1Rn3Qpr4pPr7QYNfcdoS6k6HWp: n5C
        },
        1337: {
            hrp: exports.NetworkIDToHRP[1337],
            X: n1337X,
            qzfF3A11KzpcHkkqznEyQgupQrCNS6WV6fTUTwZpEKqhj1QE7: n1337X,
            P: n1337P,
            "11111111111111111111111111111111LpoYY": n1337P,
            C: n1337C,
            BR28ypgLATNS6PbtHMiJ7NQ61vfpT27Hj8tAcZ1AHsfU5cz88: n1337C
        },
        12345: {
            hrp: exports.NetworkIDToHRP[12345],
            X: n12345X,
            "2eNy1mUFdmaxXNj1eQHUe7Np4gju9sJsEtWQ4MX3ToiNKuADed": n12345X,
            P: n12345P,
            "11111111111111111111111111111111LpoYY": n12345P,
            C: n12345C,
            "2CA6j5zYzasynPsFeNoqWkmTCt3VScMvXUZHbfDJ8k3oGzAPtU": n12345C
        }
    };
    return Defaults;
}());
exports.Defaults = Defaults;

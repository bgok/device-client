"use strict";
var _ = require("lodash");
var coin_name_1 = require("./coin-name");
var bignumber_js_1 = require("bignumber.js");
var CoinType = (function () {
    function CoinType(configuration) {
        this.configuration = configuration;
        this._dust = this.parseAmount(this.configuration.dust);
        CoinType.instances.push(this);
    }
    CoinType.get = function (type) {
        return _.find(CoinType.instances, { name: coin_name_1.CoinName[type] });
    };
    CoinType.getByName = function (name) {
        return _.find(CoinType.instances, { name: name });
    };
    CoinType.getBySymbol = function (symbol) {
        var upperSymbol = symbol.toUpperCase();
        return _.find(CoinType.instances, { symbol: upperSymbol });
    };
    CoinType.getList = function () {
        return _.map(CoinType.instances, function (coinType) {
            return coinType.configuration;
        });
    };
    Object.defineProperty(CoinType.prototype, "name", {
        get: function () {
            return this.configuration.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CoinType.prototype, "symbol", {
        get: function () {
            return this.configuration.currencySymbol;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CoinType.prototype, "decimals", {
        get: function () {
            return this.configuration.decimals;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CoinType.prototype, "coinTypeCode", {
        get: function () {
            return this.configuration.coinTypeCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CoinType.prototype, "dust", {
        get: function () {
            return this._dust;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CoinType.prototype, "amountConstructor", {
        get: function () {
            if (!this._amountConstructor) {
                this._amountConstructor = bignumber_js_1.BigNumber.another(this.configuration.amountParameters);
            }
            return this._amountConstructor;
        },
        enumerable: true,
        configurable: true
    });
    CoinType.prototype.parseAmount = function (amount) {
        return new this.amountConstructor(amount);
    };
    CoinType.prototype.amountToFloat = function (amount) {
        return new this.amountConstructor(amount.toString())
            .shift(-this.decimals);
    };
    CoinType.prototype.floatToAmount = function (amount) {
        return new this.amountConstructor(amount)
            .shift(this.decimals);
    };
    CoinType.prototype.equals = function (other) {
        return other instanceof CoinType && this.name === other.name;
    };
    return CoinType;
}());
CoinType.instances = [];
CoinType.Bitcoin = new CoinType({
    name: coin_name_1.CoinName[coin_name_1.CoinName.Bitcoin],
    currencySymbol: 'BTC',
    coinTypeCode: "0'",
    addressFormat: "^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$",
    dust: 546,
    decimals: 8,
    amountParameters: {
        DECIMAL_PLACES: 8
    }
});
CoinType.Litecoin = new CoinType({
    name: coin_name_1.CoinName[coin_name_1.CoinName.Litecoin],
    currencySymbol: 'LTC',
    coinTypeCode: "2'",
    addressFormat: "^[L3][a-km-zA-HJ-NP-Z1-9]{26,33}$",
    dust: 100000,
    decimals: 8,
    amountParameters: {
        DECIMAL_PLACES: 8
    }
});
CoinType.Dogecoin = new CoinType({
    name: coin_name_1.CoinName[coin_name_1.CoinName.Dogecoin],
    currencySymbol: 'DOGE',
    coinTypeCode: "3'",
    addressFormat: "^[DA9][1-9A-HJ-NP-Za-km-z]{33}$",
    dust: "100000000",
    decimals: 8,
    amountParameters: {
        DECIMAL_PLACES: 8
    }
});
CoinType.Ethereum = new CoinType({
    name: coin_name_1.CoinName[coin_name_1.CoinName.Ethereum],
    currencySymbol: 'ETH',
    coinTypeCode: "60'",
    addressFormat: "^(0x)?[0-9a-fA-F]{40}$",
    dust: 1,
    decimals: 18,
    amountParameters: {
        DECIMAL_PLACES: 18,
        EXPONENTIAL_AT: [-19, 9]
    }
});
CoinType.Dash = new CoinType({
    name: coin_name_1.CoinName[coin_name_1.CoinName.Dash],
    currencySymbol: 'DASH',
    coinTypeCode: "5'",
    addressFormat: "^X[a-km-zA-HJ-NP-Z1-9]{25,34}$",
    dust: 546,
    decimals: 8,
    amountParameters: {
        DECIMAL_PLACES: 8
    }
});
exports.CoinType = CoinType;

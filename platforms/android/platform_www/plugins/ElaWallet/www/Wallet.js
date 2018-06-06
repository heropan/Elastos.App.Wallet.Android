cordova.define("ElaWallet.Wallet", function(require, exports, module) {
var exec = require('cordova/exec');

// exports.coolMethod = function (arg0, success, error) {
//     exec(success, error, 'Wallet', 'coolMethod', [arg0]);
// };


var walletFunc = function() {};


walletFunc.prototype.print = function(arg0, success, error) {
    exec(success, error, "Wallet", "print", arg0);
};


walletFunc.prototype.recoverWallet = function(arg0, success, error) {
    exec(success, error, "Wallet", "recoverWallet", arg0);
};

walletFunc.prototype.createWallet = function(arg0, success, error) {
    exec(success, error, "Wallet", "createWallet", arg0);
};

walletFunc.prototype.start = function(arg0, success, error) {
    exec(success, error, "Wallet", "start", arg0);
};

walletFunc.prototype.stop = function(arg0, success, error) {
    exec(success, error, "Wallet", "stop", arg0);
};

walletFunc.prototype.createSubWallet = function(arg0, success, error) {
    exec(success, error, "Wallet", "createSubWallet", arg0);
};

walletFunc.prototype.recoverSubWallet = function(arg0, success, error) {
    exec(success, error, "Wallet", "createSubWallet", arg0);
};

walletFunc.prototype.getPublicKey = function(arg0, success, error) {
    exec(success, error, "Wallet", "getPublicKey", arg0);
};

walletFunc.prototype.createMasterWallet = function(arg0, success, error) {
    exec(success, error, "Wallet", "createMasterWallet", arg0);
};

walletFunc.prototype.importWalletWithKeystore = function(arg0, success, error) {
    exec(success, error, "Wallet", "importWalletWithKeystore", arg0);
};

walletFunc.prototype.importWalletWithMnemonic = function(arg0, success, error) {
    exec(success, error, "Wallet", "importWalletWithMnemonic", arg0);
};

walletFunc.prototype.exportWalletWithKeystore = function(arg0, success, error) {
    exec(success, error, "Wallet", "exportWalletWithKeystore", arg0);
};
walletFunc.prototype.exportWalletWithMnemonic = function(arg0, success, error) {
    exec(success, error, "Wallet", "exportWalletWithMnemonic", arg0);
};

walletFunc.prototype.getBalanceInfo = function(arg0, success, error) {
    exec(success, error, "Wallet", "getBalanceInfo", arg0);
};

walletFunc.prototype.getBalance = function(arg0, success, error) {
    exec(success, error, "Wallet", "getBalance", arg0);
};

walletFunc.prototype.createAddress = function(arg0, success, error) {
    exec(success, error, "Wallet", "createAddress", arg0);
};


// walletFunc.prototype.getTheLastAddress = function (arg0, success, error) {
//   exec(success, error, "Wallet", "getTheLastAddress", arg0);
// };
walletFunc.prototype.getAllAddress = function(arg0, success, error) {
    exec(success, error, "Wallet", "getAllAddress", arg0);
};
walletFunc.prototype.getBalanceWithAddress = function(arg0, success, error) {
    exec(success, error, "Wallet", "getBalanceWithAddress", arg0);
};
walletFunc.prototype.sendTransaction = function(arg0, success, error) {
    exec(success, error, "Wallet", "sendTransaction", arg0);
};
walletFunc.prototype.generateMultiSignTransaction = function(arg0, success, error) {
    exec(success, error, "Wallet", "generateMultiSignTransaction", arg0);
};
walletFunc.prototype.createMultiSignAddress = function(arg0, success, error) {
    exec(success, error, "Wallet", "createMultiSignAddress", arg0);
};
walletFunc.prototype.getAllTransaction = function(arg0, success, error) {
    exec(success, error, "Wallet", "getAllTransaction", arg0);
};
walletFunc.prototype.sign = function(arg0, success, error) {
    exec(success, error, "Wallet", "sign", arg0);
};
walletFunc.prototype.checkSign = function(arg0, success, error) {
    exec(success, error, "Wallet", "checkSign", arg0);
};

walletFunc.prototype.deriveIdAndKeyForPurpose = function(arg0, success, error) {
    exec(success, error, "Wallet", "deriveIdAndKeyForPurpose", arg0);
}


var WALLETFUNC = new walletFunc();
module.exports = WALLETFUNC;
});

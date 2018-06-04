package com.elastos.spvcore;

/**
 * ISidechainSubWallet jni
 */
public class ISidechainSubWallet {
    private long mSidechainProxy;

    public String SendWithdrawTransaction(String fromAddress, String mainchainAccounts, String mainchainAmounts, long fee, String payPassword, String memo)
    {
        return nativeSendWithdrawTransaction(mSidechainProxy, fromAddress, mainchainAccounts, mainchainAmounts, fee, payPassword, memo);
    }

    public ISidechainSubWallet(long proxy) {
        mSidechainProxy = proxy;
    }

    private native String nativeSendWithdrawTransaction(long proxy, String fromAddress, String mainchainAccounts,
                                                  String mainchainAmounts, long fee, String payPassword, String memo);

}

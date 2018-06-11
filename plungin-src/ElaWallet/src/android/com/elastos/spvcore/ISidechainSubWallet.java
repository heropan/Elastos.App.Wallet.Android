package com.elastos.spvcore;

/**
 * ISidechainSubWallet jni
 */
public class ISidechainSubWallet {
    private long mSidechainProxy;

    public String SendWithdrawTransaction(String fromAddress, String toAddress, long amount, String mainchainAccounts,
                String mainchainAmounts, String mainchainIndexs, long fee, String payPassword, String memo)
    {
        return nativeSendWithdrawTransaction(mSidechainProxy, fromAddress, toAddress, amount, mainchainAccounts, mainchainAmounts,
                    mainchainIndexs, fee, payPassword, memo);
    }

    public ISidechainSubWallet(long proxy) {
        mSidechainProxy = proxy;
    }

    private native String nativeSendWithdrawTransaction(long proxy, String fromAddress, String toAddress, long amount, String mainchainAccounts,
                String mainchainAmounts, String mainchainIndexs, long fee, String payPassword, String memo);
}

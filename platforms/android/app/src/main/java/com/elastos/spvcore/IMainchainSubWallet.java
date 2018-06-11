package com.elastos.spvcore;

/**
 * IMainchainSubWallet jni
 */
public class IMainchainSubWallet {
    private long mMainchainProxy;


    public String SendDepositTransaction(String fromAddress, String toAddress, long amount, String sidechainAccounts,
            String sidechainAmounts, String sidechainIndexs, long fee, String payPassword, String memo)
    {
        return nativeSendDepositTransaction(mMainchainProxy, fromAddress, toAddress, amount, sidechainAccounts,
                    sidechainAmounts, sidechainIndexs, fee, payPassword, memo);
    }

    public IMainchainSubWallet(long proxy) {
        mMainchainProxy = proxy;
    }

    private native String nativeSendDepositTransaction(long proxy, String fromAddress, String toAddress, long amount
            , String sidechainAccounts, String sidechainAmounts, String sidechainIndexs, long fee, String payPassword, String memo);
}

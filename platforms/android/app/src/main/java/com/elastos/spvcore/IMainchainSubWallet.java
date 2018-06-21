package com.elastos.spvcore;

/**
 * IMainchainSubWallet jni
 */
public class IMainchainSubWallet {
    private long mMainchainProxy;


    public String CreateDepositTransaction(String fromAddress, String toAddress, long amount, String sidechainAccounts,
            String sidechainAmounts, String sidechainIndexs, long fee, String memo)
    {
        return nativeCreateDepositTransaction(mMainchainProxy, fromAddress, toAddress, amount, sidechainAccounts,
                    sidechainAmounts, sidechainIndexs, fee, memo);
    }

    public IMainchainSubWallet(long proxy) {
        mMainchainProxy = proxy;
    }

    private native String nativeCreateDepositTransaction(long proxy, String fromAddress, String toAddress, long amount
            , String sidechainAccounts, String sidechainAmounts, String sidechainIndexs, long fee, String memo);
}

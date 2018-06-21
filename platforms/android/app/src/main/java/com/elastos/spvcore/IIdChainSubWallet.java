package com.elastos.spvcore;

/**
 * IIdChainSubWallet jni
 */
public class IIdChainSubWallet {
    private long mIDchainProxy;


    public String CreateIdTransaction(String fromAddress, String toAddress, long amount,
            String payloadJson, String programJson, long fee, String memo)
    {
        return nativeCreateIdTransaction(mIDchainProxy, fromAddress, toAddress, amount, payloadJson, programJson, fee, memo);
    }

    public IIdChainSubWallet(long proxy) {
        mIDchainProxy = proxy;
    }

    private native String nativeCreateIdTransaction(long proxy, String fromAddress, String toAddress, long amount,
            String payloadJson, String programJson, long fee, String memo);
}

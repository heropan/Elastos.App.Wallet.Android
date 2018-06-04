package com.elastos.spvcore;

/**
 * IIdChainSubWallet jni
 */
public class IIdChainSubWallet {
    private long mIDchainProxy;

    public String SendIdTransaction(String fromAddress, String payloadJson, String programJson, long fee, String payPassword, String memo)
    {
        return nativeSendIdTransaction(mIDchainProxy, fromAddress, payloadJson, programJson, fee, payPassword, memo);
    }

    public IIdChainSubWallet(long proxy) {
        mIDchainProxy = proxy;
    }

    private native String nativeSendIdTransaction(long proxy, String fromAddress, String payloadJson,
                                                  String programJson, long fee, String payPassword, String memo);

}

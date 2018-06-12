
package com.elastos.spvcore;

import java.util.ArrayList;

/**
 * IMasterWallet
 */
public class IMasterWallet {
    private long mMasterProxy;

    public static class IDKEY {
        public IDKEY() {

        }
        public String id = "";
        public String key = "";
    }

    public String GetId() {
        return nativeGetId(mMasterProxy);
    }

    public ArrayList<ISubWallet> GetAllSubWallets() {
        long[] subWalletProxies = nativeGetAllSubWallets(mMasterProxy);
        ArrayList<ISubWallet> list = new ArrayList<ISubWallet>();
        for (int i = 0; i < subWalletProxies.length; i++) {
            list.add(new ISubWallet(subWalletProxies[i]));
        }
        return list;
    }

    public ISubWallet CreateSubWallet(String chainID, String payPassword, boolean singleAddress, long feePerKb) {
        long subProxy = nativeCreateSubWallet(mMasterProxy, chainID, payPassword, singleAddress, feePerKb);
        return new ISubWallet(subProxy);
    }

    public ISubWallet RecoverSubWallet(String chainID, String payPassword, boolean singleAddress, int limitGap, long feePerKb) {
        long subProxy = nativeRecoverSubWallet(mMasterProxy, chainID, payPassword, singleAddress, limitGap, feePerKb);
        return new ISubWallet(subProxy);
    }

    public void DestroyWallet(ISubWallet wallet)
    {
        nativeDestroyWallet(mMasterProxy, wallet.getProxy());
    }

    public String GetPublicKey()
    {
        return nativeGetPublicKey(mMasterProxy);
    }

    public String Sign(String message, String payPassword)
    {
        return nativeSign(mMasterProxy, message, payPassword);
    }

    public String CheckSign(String publicKey, String message, String signature)
    {
        return nativeCheckSign(mMasterProxy, publicKey, message, signature);
    }

    public IMasterWallet(long proxy) {
        mMasterProxy = proxy;
    }

    public boolean IsAddressValid(String address) {
        return nativeIsAddressValid(mMasterProxy, address);
    }

    private native String nativeGetId(long masterProxy);
    private native long[] nativeGetAllSubWallets(long masterProxy);
    private native long nativeCreateSubWallet(long masterProxy, String chainID, String payPassword, boolean singleAddress, long feePerKb);
    private native long nativeRecoverSubWallet(long masterProxy, String chainID, String payPassword, boolean singleAddress, int limitGap, long feePerKb);
    private native String nativeGetPublicKey(long masterProxy);
    private native void nativeDestroyWallet(long masterProxy, long subWalletProxy);
    private native String nativeSign(long masterProxy, String message, String payPassword);
    private native String nativeCheckSign(long masterProxy, String publicKey, String message, String signature);
    private native boolean nativeIsAddressValid(long masterProxy, String address);
}

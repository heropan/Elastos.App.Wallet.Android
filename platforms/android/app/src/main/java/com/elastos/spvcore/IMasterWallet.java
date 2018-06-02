
package com.elastos.spvcore;

/**
 * WalletManager jni
 */
public class IMasterWallet {
  private long mMasterProxy;

  public enum SubWalletType{
    Normal,
    Mainchain,
    Sidechain,
    Idchain
  };

  public ISubWallet CreateSubWallet(int type, String chainID, int coinTypeIndex, String payPassWord, boolean singleAddress, long feePerKb)
  {
    long subProxy = nativeCreateSubWallet(mMasterProxy, type, chainID, coinTypeIndex, payPassWord, singleAddress, feePerKb);
    return new ISubWallet(subProxy);
  }

  public ISubWallet RecoverSubWallet(int type, String chainID, int coinTypeIndex, String payPassWord, boolean singleAddress, int limitGap, long feePerKb)
  {
    long subProxy = nativeRecoverSubWallet(mMasterProxy, type, chainID, coinTypeIndex, payPassWord, singleAddress, limitGap, feePerKb);
    return new ISubWallet(subProxy);
  }

  public String GetPublicKey()
  {
    return nativeGetPublicKey(mMasterProxy);
  }

  public void DestroyWallet(ISubWallet wallet)
  {
    nativeDestroyWallet(mMasterProxy, wallet.getProxy());
  }

  public String Sign(String message, String payPassword)
  {
    return nativeSign(mMasterProxy, message, payPassword);
  }

  public boolean CheckSign(String address, String message, String signature)
  {
    return nativeCheckSign(mMasterProxy, address, message, signature);
  }

  public IMasterWallet(long proxy) {
    mMasterProxy = proxy;
  }

  // public native void disposeNative();

  public void finalize() {
    // disposeNative();
  }

  private native long nativeCreateSubWallet(long masterProxy, int type, String chainID, int coinTypeIndex, String payPassWord, boolean singleAddress, long feePerKb);
  private native long nativeRecoverSubWallet(long masterProxy, int type, String chainID, int coinTypeIndex, String payPassWord, boolean singleAddress, int limitGap, long feePerKb);
  private native String nativeGetPublicKey(long masterProxy);
  private native void nativeDestroyWallet(long masterProxy, long subWalletProxy);
  private native String nativeSign(long masterProxy, String message, String payPassword);
  private native boolean nativeCheckSign(long masterProxy, String address, String message, String signature);
}

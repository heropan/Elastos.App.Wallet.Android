
package com.elastos.spvcore;

/**
 * WalletManager jni
 */
public class IMasterWallet {


  public native ISubWallet CreateSubWallet(
    String chainID,
    int coinTypeIndex,
    String payPassWord,
    boolean singleAddress,
    int feePerKb);


  public native ISubWallet RecoverSubWallet(
    String chainID,
    int coinTypeIndex,
    String payPassWord,
    boolean singleAddress,
    int limitGap,
    int feePerKb);

  public native String GetPublicKey();

  public native void DestroyWallet(ISubWallet wallet);

  public IMasterWallet() {
    createJni();
  }

  public native static long createJni();


  public native void disposeNative();

  public void finalize() {
    disposeNative();
  }


  public native String Sign(String message, String payPassword);

  public native boolean CheckSign(String address, String message, String signature);


}

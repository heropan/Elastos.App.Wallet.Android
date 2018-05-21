
package com.elastos.spvcore;

/**
 * WalletManager jni
 */
public class IMasterWallet {

  public native void createSubWallet(String chainID, String payPassWord, boolean singleAddress);

  public native String getPublicKey(String keystorePath);


  public IMasterWallet() {
  }

  public native static long createJni();


  public native void disposeNative();

  public void finalize() {
    disposeNative();
  }


}

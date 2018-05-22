
package com.elastos.spvcore;

/**
 * WalletManager jni
 */
public class IMasterWallet {

  /***
   * 创建子私钥
   * @param chainID         币种id
   * @param payPassWord     支付密码
   * @param singleAddress   是否单签地址
   */
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

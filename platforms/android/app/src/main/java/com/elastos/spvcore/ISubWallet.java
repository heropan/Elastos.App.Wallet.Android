
package com.elastos.spvcore;

/**
 * WalletManager jni
 */
public class ISubWallet extends JniReference {


  public native String GetBalanceInfo();

  public native double GetBalance();

  public native String CreateAddress();

  public native String GetTheLastAddress();

  public native String GetAllAddress();

  public native double GetBalanceWithAddress();

  public native void AddCallback(ISubWalletCallback subCallback);

  public native void RemoveCallback(ISubWalletCallback subCallback);

  public native String SendTransaction(String fromAddress, String toAddress, String amount, String fee, String payPassword, String memo, String txId);

  public native String SendRawTransaction(String transactionJson, String payPassword);

  public native void GetAllTransaction(int start, int count, String addressOrTxId);

  /***
   *  签名
   * @param message 签名的信息
   * @param payPassword 支付密码
   * @return
   */
  public native String Sign(String message, String payPassword);

  public native boolean CheckSign(String address, String message, String signature);


  public ISubWallet() {
    super(createJni());
  }

  public native static long createJni();


  public native void disposeNative();

  public void finalize() {
    disposeNative();
  }


}

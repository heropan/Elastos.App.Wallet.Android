
package com.elastos.spvcore;

/**
 * WalletManager jni
 */
public class ISubWallet extends JniReference {


  public native String GetBalanceInfo();

  public native double GetBalance();

  public native String CreateAddress();

//  public native String GetTheLastAddress();

  public native String GetAllAddress(int start,int count);

  public native double GetBalanceWithAddress(String address);

  public native void AddCallback(ISubWalletCallback subCallback);

  public native void RemoveCallback(ISubWalletCallback subCallback);

  public native String SendTransaction(String fromAddress, String toAddress, double amount, double fee, String payPassword, String memo);

  public native String GenerateMultiSignTransaction(String fromAddress, String toAddress, double amount, double fee, String payPassword, String memo);

  public native String CreateMultiSignAddress(String multiPublicKeyJson, int totalSignNum, int requiredSignNum);

  public native String SendRawTransaction(String transactionJson, String payPassword);

  public native String GetAllTransaction(int start, int count, String addressOrTxId);



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

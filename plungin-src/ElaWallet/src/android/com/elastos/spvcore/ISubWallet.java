
package com.elastos.spvcore;

/**
 * WalletManager jni
 */
public class ISubWallet /*extends JniReference*/ {
  private long mSubProxy;

  public String GetBalanceInfo()
  {
    return nativeGetBalanceInfo(mSubProxy);
  }

  public long GetBalance()
  {
    return nativeGetBalance(mSubProxy);
  }

  public String CreateAddress()
  {
    return nativeCreateAddress(mSubProxy);
  }

  public String GetAllAddress(int start,int count)
  {
    return nativeGetAllAddress(mSubProxy, start, count);
  }

  public long GetBalanceWithAddress(String address)
  {
    return nativeGetBalanceWithAddress(mSubProxy, address);
  }

  public void AddCallback(ISubWalletCallback subCallback)
  {
    nativeAddCallback(mSubProxy, subCallback);
  }

  public void RemoveCallback(ISubWalletCallback subCallback)
  {
    nativeRemoveCallback(mSubProxy, subCallback);
  }

  public String SendTransaction(String fromAddress, String toAddress, long amount, long fee, String payPassword, String memo)
  {
    return nativeSendTransaction(mSubProxy, fromAddress, toAddress, amount, fee, payPassword, memo);
  }

  public String GenerateMultiSignTransaction(String fromAddress, String toAddress, long amount, long fee, String payPassword, String memo)
  {
    return nativeGenerateMultiSignTransaction(mSubProxy, fromAddress, toAddress, amount, fee, payPassword, memo);
  }

  public String CreateMultiSignAddress(String multiPublicKeyJson, int totalSignNum, int requiredSignNum)
  {
    return nativeCreateMultiSignAddress(mSubProxy, multiPublicKeyJson, totalSignNum, requiredSignNum);
  }

  public String SendRawTransaction(String transactionJson, String payPassword)
  {
    return nativeSendRawTransaction(mSubProxy, transactionJson, payPassword);
  }

  public String GetAllTransaction(int start, int count, String addressOrTxId)
  {
    return nativeGetAllTransaction(mSubProxy, start, count, addressOrTxId);
  }

  public String Sign(String message, String payPassword)
  {
    return nativeSign(mSubProxy, message, payPassword);
  }

  public boolean CheckSign(String address, String message, String signature)
  {
    return nativeCheckSign(mSubProxy, address, message, signature);
  }

  public ISubWallet(long proxy) {
    mSubProxy = proxy;
  }

  protected long getProxy() {
    return mSubProxy;
  }

  private native String nativeGetBalanceInfo(long subProxy);
  private native long nativeGetBalance(long subProxy);
  private native String nativeCreateAddress(long subProxy);
  private native String nativeGetAllAddress(long subProxy, int start,int count);
  private native long nativeGetBalanceWithAddress(long subProxy, String address);
  private native void nativeAddCallback(long subProxy, ISubWalletCallback subCallback);
  private native void nativeRemoveCallback(long subProxy, ISubWalletCallback subCallback);
  private native String nativeSendTransaction(long subProxy, String fromAddress, String toAddress, long amount, long fee, String payPassword, String memo);
  private native String nativeGenerateMultiSignTransaction(long subProxy, String fromAddress, String toAddress, long amount, long fee, String payPassword, String memo);
  private native String nativeCreateMultiSignAddress(long subProxy, String multiPublicKeyJson, int totalSignNum, int requiredSignNum);
  private native String nativeSendRawTransaction(long subProxy, String transactionJson, String payPassword);
  private native String nativeGetAllTransaction(long subProxy, int start, int count, String addressOrTxId);
  private native String nativeSign(long subProxy, String message, String payPassword);
  private native boolean nativeCheckSign(long subProxy, String address, String message, String signature);
}

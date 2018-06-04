
package com.elastos.spvcore;

/**
 * WalletManager jni
 */
public class IWalletFactory extends JniReference {

  /***
   * 创建主私钥
   * @param name 钱包名
   * @param backupPassword 备份密码
   * @param payPassWord  支付密码
   */
  public IMasterWallet CreateMasterWallet(String backupPassword,String payPassWord)
  {
    long masterProxy = nativeCreateMasterWallet(jniReferenceAddress, backupPassword, payPassWord);
    return new IMasterWallet(masterProxy);
  }

  /***
   * 导入私钥
   * @param keystorePath      文件路径
   * @param backupPassWord    备份密码
   * @param payPassWord       支付密码
   * @return
   */
  public IMasterWallet ImportWalletWithKeystore(String keystorePath,String backupPassWord,String payPassWord)
  {
    long masterProxy = nativeImportWalletWithKeystore(jniReferenceAddress, keystorePath, backupPassWord, payPassWord);
    return new IMasterWallet(masterProxy);
  }

  /***
   * 导入助记词
   * @param mnemonic
   * @param backupPassWord
   * @param payPassWord
   * @return
   */
  public IMasterWallet ImportWalletWithMnemonic(String mnemonic,String backupPassWord,String payPassWord)
  {
    long masterProxy = nativeImportWalletWithMnemonic(jniReferenceAddress, mnemonic, backupPassWord, payPassWord);
    return new IMasterWallet(masterProxy);
  }

  /***
   * 导出私钥
   * @param masterWallet
   * @param backupPassWord
   * @param keystorePath
   */
  public void ExportWalletWithKeystore(IMasterWallet masterWallet, String backupPassWord, String keystorePath)
  {
    nativeExportWalletWithKeystore(jniReferenceAddress, masterWallet, backupPassWord, keystorePath);
  }

  /***
   * 导出助记词
   * @param masterWallet
   * @param backupPassWord
   * @return
   */
  public String ExportWalletWithMnemonic(IMasterWallet masterWallet,String backupPassWord)
  {
    return nativeExportWalletWithMnemonic(jniReferenceAddress, masterWallet, backupPassWord);
  }

  public IWalletFactory() {
    super(nativeCreateJni());
  }

  public native static long nativeCreateJni();

  public void DestroyWallet(IMasterWallet masterWallet)
  {
    nativeDestroyWallet(jniReferenceAddress, masterWallet);
  }

  public void finalize() {
    nativeDisposeNative(jniReferenceAddress);
  }

  private native long nativeCreateMasterWallet(long jniReferenceAddress, String backupPassword, String payPassWord);
  private native long nativeImportWalletWithKeystore(long jniReferenceAddress, String keystorePath,String backupPassWord,String payPassWord);
  private native long nativeImportWalletWithMnemonic(long jniReferenceAddress, String mnemonic,String backupPassWord,String payPassWord);
  private native void nativeExportWalletWithKeystore(long jniReferenceAddress, IMasterWallet masterWallet,String backupPassWord,String keystorePath);
  private native String nativeExportWalletWithMnemonic(long jniReferenceAddress, IMasterWallet masterWallet,String backupPassWord);
  private native void nativeDestroyWallet(long jniReferenceAddress, IMasterWallet masterWallet);
  private native void nativeDisposeNative(long jniReferenceAddress);
}

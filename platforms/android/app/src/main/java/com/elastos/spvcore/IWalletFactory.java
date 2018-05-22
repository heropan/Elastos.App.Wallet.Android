
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
  public native void CreateMasterWallet(String name,String backupPassword,String payPassWord);

  /***
   * 导入私钥
   * @param keystorePath      文件路径
   * @param backupPassWord    备份密码
   * @param payPassWord       支付密码
   * @return
   */
  public native IMasterWallet ImportWalletWithKeystore(String keystorePath,String backupPassWord,String payPassWord);

  /***
   * 导入助记词
   * @param mnemonic
   * @param backupPassWord
   * @param payPassWord
   * @return
   */
  public native IMasterWallet ImportWalletWithMnemonic(String mnemonic,String backupPassWord,String payPassWord);

  /***
   * 导出私钥
   * @param masterWallet
   * @param backupPassWord
   * @param keystorePath
   */
  public native void ExportWalletWithKeystore(IMasterWallet masterWallet,String backupPassWord,String keystorePath);

  /***
   * 导出助记词
   * @param masterWallet
   * @param backupPassWord
   * @return
   */
  public native String ExportWalletWithMnemonic(IMasterWallet masterWallet,String backupPassWord);



  public IWalletFactory() {
    super(createJni());
  }

  public native static long createJni();



  public native void DestroyWallet();

  public native void disposeNative();

  public void finalize() {
    disposeNative();
  }


}

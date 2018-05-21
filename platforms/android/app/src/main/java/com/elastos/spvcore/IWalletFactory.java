
package com.elastos.spvcore;

/**
 * WalletManager jni
 */
public class IWalletFactory extends JniReference {

  public native void CreateMasterWallet(String name,String backupPassword,String payPassWord);

  public native IMasterWallet ImportWalletWithKeystore(String keystorePath,String backupPassWord,String payPassWord);
  public native IMasterWallet ImportWalletWithMnemonic(String mnemonic,String backupPassWord,String payPassWord);
  public native void ExportWalletWithKeystore(IMasterWallet masterWallet,String backupPassWord,String keystorePath);
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

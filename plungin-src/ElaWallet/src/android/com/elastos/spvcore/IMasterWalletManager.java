
package com.elastos.spvcore;

import java.util.ArrayList;

/**
 * IMasterWalletManager jni
 */
public class IMasterWalletManager {
    private long mManagerProxy = 0;


    /***
     * 创建主私钥
     * @param masterWalletId
     * @param language
     */
    public IMasterWallet CreateMasterWallet(String masterWalletId, String language)
    {
        long masterProxy = nativeCreateMasterWallet(mManagerProxy, masterWalletId, language);
        return new IMasterWallet(masterProxy);
    }

    public boolean InitializeMasterWallet(String masterWalletId, String mnemonic,String phrasePassword, String payPassword)
    {
        return nativeInitializeMasterWallet(mManagerProxy, masterWalletId, mnemonic, phrasePassword, payPassword);
    }

    public ArrayList<IMasterWallet> GetAllMasterWallets() {
        long[] masterWalletProxies = nativeGetAllMasterWallets(mManagerProxy);
        ArrayList<IMasterWallet> list = new ArrayList<IMasterWallet>();
        for (int i = 0; i < masterWalletProxies.length; i++) {
            list.add(new IMasterWallet(masterWalletProxies[i]));
        }
        return list;
    }

    public void DestroyWallet(String masterWalletId)
    {
        nativeDestroyWallet(mManagerProxy, masterWalletId);
    }

    /***
     * 导入私钥
     * @param keystoreContent      文件路径
     * @param backupPassWord    备份密码
     * @param payPassWord       支付密码
     * @return
     */
    public IMasterWallet ImportWalletWithKeystore(String masterWalletId, String keystoreContent,String backupPassWord
                    ,String payPassWord, String phrasePassword)
    {
        long masterProxy = nativeImportWalletWithKeystore(mManagerProxy, masterWalletId, keystoreContent, backupPassWord, payPassWord, phrasePassword);
        return new IMasterWallet(masterProxy);
    }

    /***
     * 导入助记词
     * @param masterWalletId
     * @param mnemonic
     * @param phrasePassword
     * @param payPassWord
     * @return
     */
    public IMasterWallet ImportWalletWithMnemonic(String masterWalletId, String mnemonic, String phrasePassword
                    ,String payPassWord, String language)
    {
        long masterProxy = nativeImportWalletWithMnemonic(mManagerProxy, masterWalletId, mnemonic, phrasePassword, payPassWord, language);
        return new IMasterWallet(masterProxy);
    }

    /***
     * 导出私钥
     * @param masterWallet
     * @param backupPassWord
     * @param keystorePath
     */
    public String ExportWalletWithKeystore(IMasterWallet masterWallet, String backupPassWord, String payPassword)
    {
        return nativeExportWalletWithKeystore(mManagerProxy, masterWallet, backupPassWord, payPassword);
    }

    /***
     * 导出助记词
     * @param masterWallet
     * @param backupPassWord
     * @return
     */
    public String ExportWalletWithMnemonic(IMasterWallet masterWallet,String backupPassWord)
    {
        return nativeExportWalletWithMnemonic(mManagerProxy, masterWallet, backupPassWord);
    }

    public IMasterWalletManager(long proxy) {
        mManagerProxy = proxy;
    }

    public void finalize() {
        nativeDisposeNative(mManagerProxy);
    }


    private native long nativeCreateMasterWallet(long proxy, String masterWalletId ,String language);

    private native long nativeImportWalletWithKeystore(long proxy, String masterWalletId,
                    String keystoreContent,String backupPassWord ,String payPassWord, String phrasePassword);

    private native long nativeImportWalletWithMnemonic(long proxy, String masterWalletId, String mnemonic,
                    String phrasePassword,String payPassWord,String language);

    private native String nativeExportWalletWithKeystore(long proxy, IMasterWallet masterWallet,
                    String backupPassWord,String payPassword);

    private native String nativeExportWalletWithMnemonic(long proxy, IMasterWallet masterWallet,String backupPassWord);
    private native void nativeDestroyWallet(long proxy, String masterWalletId);
    private native void nativeDisposeNative(long proxy);
    private native long[] nativeGetAllMasterWallets(long proxy);
    private native boolean nativeInitializeMasterWallet(long proxy, String masterWalletId, String mnemonic
                    ,String phrasePassword, String payPassword);
}

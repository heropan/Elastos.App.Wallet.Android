
package com.elastos.spvcore;


/**
 * IIdChainSubWallet jni
 */
public class Enviroment {
    private static long mEnviromentProxy;

    public static void InitializeRootPath(String rootPath) {
        nativeInitializeRootPath(mEnviromentProxy, rootPath);
    }

    /**
     * Get root path for all master wallets.
     * @return root path.
     */
    public static String GetRootPath() {
        return nativeGetRootPath(mEnviromentProxy);
    }

    public static IMasterWalletManager GetMasterWalletManager() {
        long proxy = nativeGetMasterWalletManager(mEnviromentProxy);
        return new IMasterWalletManager(proxy);
    }

    private static native void nativeInitializeRootPath(long proxy, String rootPath);
    private static native long nativeGetMasterWalletManager(long proxy);
    private static native String nativeGetRootPath(long proxy);
}

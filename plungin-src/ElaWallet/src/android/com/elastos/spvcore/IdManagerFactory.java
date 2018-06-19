
package com.elastos.spvcore;


public class IdManagerFactory {
    public static IDidManager CreateIdManager(IMasterWallet masterWallet) {
        long didManagerProxy = nativeCreateIdManager(masterWallet.GetProxy());
        return new IDidManager(didManagerProxy);
    }

    private static native long nativeCreateIdManager(long masterWalletProxy);
}

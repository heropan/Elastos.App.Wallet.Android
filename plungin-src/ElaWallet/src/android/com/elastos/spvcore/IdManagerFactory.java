
package com.elastos.spvcore;


public class IdManagerFactory {
    public static IDidManager CreateIdManager(IMasterWallet masterWallet, String[] initialAddresses) {
        long didManagerProxy = nativeCreateIdManager(masterWallet.GetProxy(), initialAddresses);
    }

    private static native long nativeCreateIdManager(long masterWalletProxy, String[] initialAddresses);
}

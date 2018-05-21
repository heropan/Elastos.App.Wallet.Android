
package com.elastos.spvcore;

import java.util.List;

/**
 * WalletManager jni
 */
public class WalletManager extends JniReference {

  public static class WalletExecption extends Exception {
  }


  public interface Listener {
    // func balanceChanged(_ balance: UInt64)
    void balanceChanged(long balance);

    // func txAdded(_ tx: BRTxRef)
    void onTxAdded(Transaction transaction);

    // func txUpdated(_ txHashes: [UInt256], blockHeight: UInt32, timestamp: UInt32)
    void onTxUpdated(String hash, int blockHeight, int timeStamp);

    // func txDeleted(_ txHash: UInt256, notifyUser: Bool, recommendRescan: Bool)
    void onTxDeleted(String hash, int notifyUser, final int recommendRescan);
  }

  public native static long recoverJniWalletManager(String stringPhrase, String stringLanguage, ChainParams objChainParams);

  public native static long createJniWalletManager(ChainParams objChainParams);


  /**
   * 创建钱包
   *
   * @param objChainParams
   */
  public WalletManager(ChainParams objChainParams) {
    super(createJniWalletManager(objChainParams));

  }

  /***
   * 从助记词创建钱包
   * @param stringPhrase 助记词
   * @param stringLanguage
   * @param objChainParams
   */
  public WalletManager(String stringPhrase, String stringLanguage, ChainParams objChainParams) {
    super(recoverJniWalletManager(stringPhrase, stringLanguage, objChainParams));

  }


  public native void start();

  public native void stop();

  public native void exportKey(String path, String password);

  public native void importKey(String path, String password);


  public native String getMnemonic();

  public native byte[] getIdData();

  public native byte[] signData(byte[] data);


  public native long createTransaction(WalletManager objectWalletManager, TxParam objectTxParam);


  public native byte[] signAndPublishTransaction(WalletManager objectWalletManager, TransactionPtr objectTransaction);


  public native Transaction[] getTransactions();

  public native void registerWalletListener(Listener listener);


  public native void registerPeerManagerListener(PeerManager.Listener listener);


  public native void disposeNative();

  public void finalize() {
    disposeNative();
  }


}

package com.elastos.spvcore;

/**
 * IMainchainSubWallet jni
 */
public class IMainchainSubWallet extends ISubWallet {
	private long mMainchainProxy;

	public IMainchainSubWallet(long proxy) {
		super(proxy);
		mMainchainProxy = proxy;
	}


	public String CreateDepositTransaction(String fromAddress, String toAddress, long amount, String sidechainAccounts,
			String sidechainAmounts, String sidechainIndexs, String memo, String remark, boolean useVotedUTXO) throws WalletException {
		return nativeCreateDepositTransaction(mMainchainProxy, fromAddress, toAddress, amount, sidechainAccounts,
				sidechainAmounts, sidechainIndexs, memo, remark, useVotedUTXO);
	}

	public String CreateVoteProducerTransaction(long stake, String publicKeys) throws WalletException {
		return nativeCreateVoteProducerTransaction(mMainchainProxy, stake, publicKeys);
	}

	public String GetVotedProducerList() throws WalletException {
		return nativeGetVotedProducerList();
	}


	private native String nativeCreateDepositTransaction(long proxy, String fromAddress, String toAddress, long amount,
			String sidechainAccounts, String sidechainAmounts, String sidechainIndexs, String memo, String remark, boolean useVotedUTXO);

	private native String nativeCreateVoteProducerTransaction(long proxy, long stake, String publicKeys);

	private native String nativeGetVotedProducerList();

}

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

	public String GenerateProducerPayload(String publicKey, String nodePublicKey, String nickName, String url, String IPAddress, long location, String payPasswd) throws WalletException {
		return nativeGenerateProducerPayload(mMainchainProxy, publicKey, nodePublicKey, nickName, url, IPAddress, location, payPasswd);
	}

	public String GenerateCancelProducerPayload(String publicKey, String payPasswd) throws WalletException {
		return nativeGenerateCancelProducerPayload(mMainchainProxy, publicKey, payPasswd);
	}

	public String CreateRegisterProducerTransaction(String fromAddress, String payloadJson, long amount, String memo, boolean useVotedUTXO) throws WalletException {
		return nativeCreateRegisterProducerTransaction(mMainchainProxy, fromAddress, payloadJson, amount, memo, useVotedUTXO);
	}

	public String CreateUpdateProducerTransaction(String fromAddress, String payloadJson, String memo, boolean useVotedUTXO) throws WalletException {
		return nativeCreateUpdateProducerTransaction(mMainchainProxy, fromAddress, payloadJson, memo, useVotedUTXO);
	}

	public String CreateCancelProducerTransaction(String fromAddress, String payloadJson, String memo, boolean useVotedUTXO) throws WalletException {
		return nativeCreateCancelProducerTransaction(mMainchainProxy, fromAddress, payloadJson, memo, useVotedUTXO);
	}

	public String CreateRetrieveDepositTransaction(String memo) throws WalletException {
		return nativeCreateRetrieveDepositTransaction(mMainchainProxy, memo);
	}

	public String GetPublicKeyForVote() throws WalletException {
		return nativeGetPublicKeyForVote(mMainchainProxy);
	}

	public String CreateVoteProducerTransaction(String fromAddress, long stake, String publicKeys, String memo, boolean useVotedUTXO) throws WalletException {
		return nativeCreateVoteProducerTransaction(mMainchainProxy, fromAddress, stake, publicKeys, memo, useVotedUTXO);
	}

	public String GetVotedProducerList() throws WalletException {
		return nativeGetVotedProducerList(mMainchainProxy);
	}

	public String GetRegisteredProducerInfo() throws WalletException {
		return nativeGetRegisteredProducerInfo(mMainchainProxy);
	}


	private native String nativeCreateDepositTransaction(long proxy, String fromAddress, String toAddress, long amount,
			String sidechainAccounts, String sidechainAmounts, String sidechainIndexs, String memo, String remark, boolean useVotedUTXO);

	private native String nativeGenerateProducerPayload(long proxy, String publicKey, String nodePublicKey, String nickName, String url, String IPAddress, long location, String payPasswd);

	private native String nativeGenerateCancelProducerPayload(long proxy, String publicKey, String payPasswd);

	private native String nativeCreateRegisterProducerTransaction(long proxy, String fromAddress, String payloadJson, long amount, String memo, boolean useVotedUTXO);

	private native String nativeCreateUpdateProducerTransaction(long proxy, String fromAddress, String payloadJson, String memo, boolean useVotedUTXO);

	private native String nativeCreateCancelProducerTransaction(long proxy, String fromAddress, String payloadJson, String memo, boolean useVotedUTXO);

	private native String nativeCreateRetrieveDepositTransaction(long proxy, String memo);

	private native String nativeGetPublicKeyForVote(long proxy);

	private native String nativeCreateVoteProducerTransaction(long proxy, String fromAddress, long stake, String publicKeys, String memo, boolean useVotedUTXO);

	private native String nativeGetVotedProducerList(long proxy);

	private native String nativeGetRegisteredProducerInfo(long proxy);

}

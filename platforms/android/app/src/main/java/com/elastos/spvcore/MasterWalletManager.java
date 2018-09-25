
package com.elastos.spvcore;

import java.util.ArrayList;
import android.util.Log;

public class MasterWalletManager {
	private long mManagerProxy = 0;
	private String mRootPath = null;

	public MasterWalletManager(String rootPath) {
		mRootPath = rootPath;
		mManagerProxy = nativeInitMasterWalletManager(mRootPath);
	}

	public void finalize() {
		nativeDisposeNative(mManagerProxy);
	}

	public IMasterWallet CreateMasterWallet(String masterWalletId, String mnemonic,
			String phrasePassword, String payPassword, String language) throws WalletException {

		long masterProxy = nativeCreateMasterWallet(mManagerProxy, masterWalletId, mnemonic,
				phrasePassword, payPassword, language);

		return new IMasterWallet(masterProxy);
	}

	public ArrayList<IMasterWallet> GetAllMasterWallets() throws WalletException {

		ArrayList<IMasterWallet> list = new ArrayList<IMasterWallet>();
		long[] masterWalletProxies = nativeGetAllMasterWallets(mManagerProxy);

		for (int i = 0; i < masterWalletProxies.length; i++) {
			list.add(new IMasterWallet(masterWalletProxies[i]));
		}

		return list;
	}

	public void DestroyWallet(String masterWalletId) throws WalletException {
		nativeDestroyWallet(mManagerProxy, masterWalletId);
	}

	public IMasterWallet ImportWalletWithKeystore(String masterWalletId, String keystoreContent,
			String backupPassWord, String payPassWord, String phrasePassword) throws WalletException {

		long masterProxy = nativeImportWalletWithKeystore(mManagerProxy, masterWalletId,
				keystoreContent, backupPassWord, payPassWord, phrasePassword);

		return new IMasterWallet(masterProxy);
	}

	public IMasterWallet ImportWalletWithMnemonic(String masterWalletId, String mnemonic,
			String phrasePassword, String payPassWord, String language) throws WalletException {

		long masterProxy = nativeImportWalletWithMnemonic(mManagerProxy, masterWalletId,
				mnemonic, phrasePassword, payPassWord, language);

		return new IMasterWallet(masterProxy);
	}

	public String ExportWalletWithKeystore(IMasterWallet masterWallet,
			String backupPassWord, String payPassword) throws WalletException {

		return nativeExportWalletWithKeystore(mManagerProxy, masterWallet, backupPassWord, payPassword);
	}

	public String ExportWalletWithMnemonic(IMasterWallet masterWallet,
			String payPassWord) throws WalletException {

		return nativeExportWalletWithMnemonic(mManagerProxy, masterWallet, payPassWord);
	}

	public String GenerateMnemonic(String language) throws WalletException {
		return nativeGenerateMnemonic(mManagerProxy, language);
	}

	public void SaveConfigs() {
		nativeSaveConfigs(mManagerProxy);
	}

	public IMasterWallet CreateMultiSignMasterWallet(String masterWallet,
			String coSigners, int requiredSignCount) throws WalletException {

		long masterProxy = nativeCreateMultiSignMasterWallet(mManagerProxy, masterWallet,
				coSigners, requiredSignCount);

		return new IMasterWallet(masterProxy);
	}

	public IMasterWallet CreateMultiSignMasterWallet(String masterWallet, String privKey, String payPassword,
			String coSigners, int requiredSignCount) throws WalletException {

		long masterProxy = nativeCreateMultiSignMasterWalletWithPrivKey(mManagerProxy, masterWallet,
				privKey, payPassword, coSigners, requiredSignCount);

		return new IMasterWallet(masterProxy);
	}

	public IMasterWallet CreateMultiSignMasterWallet(String masterWalletId, String mnemonic, String phrasePassword,
			String payPassword, String coSigners, int requiredSignCount, String language) throws WalletException {

		long masterProxy = nativeCreateMultiSignMasterWalletWithMnemonic(mManagerProxy, masterWalletId, mnemonic,
				phrasePassword, payPassword, coSigners, requiredSignCount, language);

		return new IMasterWallet(masterProxy);
	}

	public String ConvertToHexString(String txJson) {
		return nativeConvertToHexString(mManagerProxy, txJson);
	}

	public String ConvertFromHexString(String hexString) {
		return nativeConvertFromHexString(mManagerProxy, hexString);
	}

	private native void nativeSaveConfigs(long proxy);

	private native String nativeGenerateMnemonic(long proxy, String language);

	private native long nativeCreateMasterWallet(long proxy, String masterWalletId, String mnemonic,
			String phrasePassword, String payPassword, String language);

	private native long nativeCreateMultiSignMasterWallet(long proxy, String masterWalletId,
			String coSigners, int requiredSignCount);

	private native long nativeCreateMultiSignMasterWalletWithPrivKey(long proxy, String masterWalletId, String privKey,
			String payPassword, String coSigners, int requiredSignCount);

	private native long nativeCreateMultiSignMasterWalletWithMnemonic(long proxy, String masterWalletId, String mnemonic,
			String phrasePassword, String payPassword, String coSigners, int requiredSignCount, String language);

	private native long nativeImportWalletWithKeystore(long proxy, String masterWalletId,
			String keystoreContent, String backupPassWord ,String payPassWord, String phrasePassword);

	private native long nativeImportWalletWithMnemonic(long proxy, String masterWalletId, String mnemonic,
			String phrasePassword,String payPassWord,String language);

	private native String nativeExportWalletWithKeystore(long proxy, IMasterWallet masterWallet,
			String backupPassWord,String payPassword);

	private native String nativeExportWalletWithMnemonic(long proxy, IMasterWallet masterWallet, String backupPassWord);

	private native void nativeDestroyWallet(long proxy, String masterWalletId);

	private native long[] nativeGetAllMasterWallets(long proxy);

	private native String nativeConvertToHexString(long proxy, String txJson);

	private native String nativeConvertFromHexString(long proxy, String hexString);

	private native long nativeInitMasterWalletManager(String rootPath);

	private native void nativeDisposeNative(long proxy);
}

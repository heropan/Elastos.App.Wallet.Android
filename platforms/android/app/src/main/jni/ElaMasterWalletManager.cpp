// Copyright (c) 2012-2018 The Elastos Open Source Project
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

#include "ElaUtils.h"
#include "MasterWalletManager.h"

using namespace Elastos::ElaWallet;

#define  CLASS_MASTERWALLET   "com/elastos/spvcore/IMasterWallet"
#define  FIELD_MASTERWALLET   "mMasterProxy"

#define SIG_GENERATE_MNEMONIC "(JLjava/lang/String;)Ljava/lang/String;"
static jstring JNICALL nativeGenerateMnemonic(JNIEnv *env, jobject clazz, jlong jWalletMgr, jstring jlanguage)
{
	bool exception = false;
	std::string msgException;

	MasterWalletManager* walletManager = (MasterWalletManager*)jWalletMgr;
	const char* language = env->GetStringUTFChars(jlanguage, NULL);
	jstring mnemonic = NULL;

	try {
		std::string str = walletManager->GenerateMnemonic(language);
		mnemonic = env->NewStringUTF(str.c_str());
	} catch (std::exception &e) {
		exception = true;
		msgException = e.what();
	}

	env->ReleaseStringUTFChars(jlanguage, language);

	if (exception) {
		ThrowWalletException(env, msgException.c_str());
	}

	return mnemonic;
}

#define SIG_CREATE_MASTER_WALLET "(JLjava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)J"
static jlong JNICALL nativeCreateMasterWallet(JNIEnv *env, jobject clazz, jlong jWalletMgr,
		jstring jmasterWalletId,
		jstring jmnemonic,
		jstring jphrasePassword,
		jstring jpayPassword,
		jstring jlanguage)
{
	bool exception = false;
	std::string msgException;

	const char* masterWalletId = env->GetStringUTFChars(jmasterWalletId, NULL);
	const char* mnemonic = env->GetStringUTFChars(jmnemonic, NULL);
	const char* phrasePassword = env->GetStringUTFChars(jphrasePassword, NULL);
	const char* payPassword = env->GetStringUTFChars(jpayPassword, NULL);
	const char* language = env->GetStringUTFChars(jlanguage, NULL);

	MasterWalletManager* walletManager = (MasterWalletManager*)jWalletMgr;
	IMasterWallet* masterWallet = NULL;

	try {
		masterWallet = walletManager->CreateMasterWallet(masterWalletId, mnemonic, phrasePassword, payPassword, language);
	} catch (std::exception &e) {
		exception = true;
		msgException = e.what();
	}

	env->ReleaseStringUTFChars(jmasterWalletId, masterWalletId);
	env->ReleaseStringUTFChars(jmnemonic, mnemonic);
	env->ReleaseStringUTFChars(jphrasePassword, phrasePassword);
	env->ReleaseStringUTFChars(jpayPassword, payPassword);
	env->ReleaseStringUTFChars(jlanguage, language);

	if (exception) {
		ThrowWalletException(env, msgException.c_str());
	}

	return (jlong)masterWallet;
}

#define SIG_MULTISIGN_WALLET "(JLjava/lang/String;Ljava/lang/String;I)J"
static jlong JNICALL nativeCreateMultiSignMasterWallet(JNIEnv *env, jobject clazz, jlong jWalletMgr,
		jstring jMasterWalletId,
		jstring jCoSigners,
		jint jRequiredSignCount)
{
	bool exception = false;
	std::string msgException;

	const char* masterWalletId = env->GetStringUTFChars(jMasterWalletId, NULL);
	const char* coSigners = env->GetStringUTFChars(jCoSigners, NULL);

	MasterWalletManager* walletManager = (MasterWalletManager*)jWalletMgr;
	IMasterWallet* masterWallet = NULL;
	nlohmann::json coSignersJson = nlohmann::json::parse(coSigners);

	try {
		masterWallet = walletManager->CreateMultiSignMasterWallet(masterWalletId, coSignersJson, jRequiredSignCount);
	} catch (std::exception &e) {
		exception = true;
		msgException = e.what();
	}

	env->ReleaseStringUTFChars(jMasterWalletId, masterWalletId);
	env->ReleaseStringUTFChars(jCoSigners, coSigners);

	if (exception) {
		ThrowWalletException(env, msgException.c_str());
	}

	return (jlong)masterWallet;
}

#define SIG_MULTISIGN_WALLET_PRIV "(JLjava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;I)J"
static jlong JNICALL nativeCreateMultiSignMasterWalletWithPrivKey(JNIEnv *env, jobject clazz, jlong jWalletMgr,
		jstring jMasterWalletId,
		jstring jPrivKey,
		jstring jPayPassword,
		jstring jCoSigners,
		jint jRequiredSignCount)
{
	bool exception = false;
	std::string msgException;

	const char* masterWalletId = env->GetStringUTFChars(jMasterWalletId, NULL);
	const char* privKey = env->GetStringUTFChars(jPrivKey, NULL);
	const char* payPassword = env->GetStringUTFChars(jPayPassword, NULL);
	const char* coSigners = env->GetStringUTFChars(jCoSigners, NULL);

	MasterWalletManager* walletManager = (MasterWalletManager*)jWalletMgr;
	IMasterWallet* masterWallet = NULL;

	try {
		nlohmann::json coSignersJson = nlohmann::json::parse(coSigners);
		masterWallet = walletManager->CreateMultiSignMasterWallet(masterWalletId, privKey, payPassword, coSignersJson, jRequiredSignCount);
	} catch (std::exception &e) {
		exception = true;
		msgException = e.what();
	}

	env->ReleaseStringUTFChars(jMasterWalletId, masterWalletId);
	env->ReleaseStringUTFChars(jPrivKey, privKey);
	env->ReleaseStringUTFChars(jPayPassword, payPassword);
	env->ReleaseStringUTFChars(jCoSigners, coSigners);

	if (exception) {
		ThrowWalletException(env, msgException.c_str());
	}

	return (jlong)masterWallet;
}

#define SIG_MULTISIGN_WALLET_MNEMONIC "(JLjava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;ILjava/lang/String;)J"
static jlong JNICALL nativeCreateMultiSignMasterWalletWithMnemonic(JNIEnv *env, jobject clazz, jlong jWalletMgr,
		jstring jMasterWalletId,
		jstring jMnemonic,
		jstring jPhrasePassword,
		jstring jPayPassword,
		jstring jCoSigners,
		jint jRequiredSignCount,
		jstring jLanguage)
{
	bool exception = false;
	std::string msgException;

	const char *masterWalletId = env->GetStringUTFChars(jMasterWalletId, NULL);
	const char *mnemonic       = env->GetStringUTFChars(jMnemonic, NULL);
	const char *phrasePassword = env->GetStringUTFChars(jPhrasePassword, NULL);
	const char *payPassword    = env->GetStringUTFChars(jPayPassword, NULL);
	const char *coSigners      = env->GetStringUTFChars(jCoSigners, NULL);
	const char *language       = env->GetStringUTFChars(jLanguage, NULL);

	MasterWalletManager* walletManager = (MasterWalletManager*)jWalletMgr;
	IMasterWallet* masterWallet = NULL;

	try {
		nlohmann::json coSignersJson = nlohmann::json::parse(coSigners);
		masterWallet = walletManager->CreateMultiSignMasterWallet(masterWalletId, mnemonic,
				phrasePassword, payPassword, coSignersJson, jRequiredSignCount, language);
	} catch (std::exception &e) {
		exception = true;
		msgException = e.what();
	}

	env->ReleaseStringUTFChars(jMasterWalletId, masterWalletId);
	env->ReleaseStringUTFChars(jMnemonic, mnemonic);
	env->ReleaseStringUTFChars(jPhrasePassword, phrasePassword);
	env->ReleaseStringUTFChars(jPayPassword, payPassword);
	env->ReleaseStringUTFChars(jCoSigners, coSigners);
	env->ReleaseStringUTFChars(jLanguage, language);

	if (exception) {
		ThrowWalletException(env, msgException.c_str());
	}

	return (jlong)masterWallet;
}

#define SIG_DESTROY_WALLET "(JLjava/lang/String;)V"
static void JNICALL nativeDestroyWallet(JNIEnv *env, jobject clazz, jlong jWalletMgr,
		jstring jmasterWalletId)
{
	bool exception = false;
	std::string msgException;

	const char* masterWalletId = env->GetStringUTFChars(jmasterWalletId, NULL);

	MasterWalletManager* walletManager = (MasterWalletManager*)jWalletMgr;

	try {
		walletManager->DestroyWallet(masterWalletId);
	} catch (std::exception &e) {
		exception = true;
		msgException = e.what();
	}

	env->ReleaseStringUTFChars(jmasterWalletId, masterWalletId);

	if (exception) {
		ThrowWalletException(env, msgException.c_str());
	}
}

#define SIG_IMPORT_WALLET_WITH_KEYSTORE "(JLjava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)J"
static jlong JNICALL nativeImportWalletWithKeystore(JNIEnv *env, jobject clazz, jlong jWalletMgr,
		jstring jmasterWalletId,
		jstring jkeystoreContent,
		jstring jbackupPassword,
		jstring jpayPassword,
		jstring jphrasePassword)
{
	bool exception = false;
	std::string msgException;

	const char* masterWalletId = env->GetStringUTFChars(jmasterWalletId, NULL);
	const char* keystoreContent = env->GetStringUTFChars(jkeystoreContent, NULL);
	const char* backupPassword = env->GetStringUTFChars(jbackupPassword, NULL);
	const char* payPassword = env->GetStringUTFChars(jpayPassword, NULL);
	const char* phrasePassword = env->GetStringUTFChars(jphrasePassword, NULL);

	MasterWalletManager* walletManager = (MasterWalletManager*)jWalletMgr;
	IMasterWallet* masterWallet = NULL;

	try {
		masterWallet = walletManager->ImportWalletWithKeystore(masterWalletId,
				nlohmann::json::parse(keystoreContent), backupPassword, payPassword, phrasePassword);
	} catch (std::exception &e) {
		bool exception = true;
		msgException = e.what();
	}

	env->ReleaseStringUTFChars(jmasterWalletId, masterWalletId);
	env->ReleaseStringUTFChars(jkeystoreContent, keystoreContent);
	env->ReleaseStringUTFChars(jbackupPassword, backupPassword);
	env->ReleaseStringUTFChars(jpayPassword, payPassword);
	env->ReleaseStringUTFChars(jphrasePassword, phrasePassword);

	if (exception) {
		ThrowWalletException(env, msgException.c_str());
	}

	return (jlong)masterWallet;
}

#define SIG_IMPORT_WALLET_WITH_MNEMONIC "(JLjava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)J"
static jlong JNICALL nativeImportWalletWithMnemonic(JNIEnv *env, jobject clazz, jlong jWalletMgr,
		jstring jmasterWalletId,
		jstring jmnemonic,
		jstring jphrasePassword,
		jstring jpayPassword,
		jstring jlanguage)
{
	bool exception = false;
	std::string msgException;

	const char* masterWalletId = env->GetStringUTFChars(jmasterWalletId, NULL);
	const char* mnemonic = env->GetStringUTFChars(jmnemonic, NULL);
	const char* phrasePassword = env->GetStringUTFChars(jphrasePassword, NULL);
	const char* payPassword = env->GetStringUTFChars(jpayPassword, NULL);
	const char* language = env->GetStringUTFChars(jlanguage, NULL);

	MasterWalletManager* walletManager = (MasterWalletManager*)jWalletMgr;
	IMasterWallet* masterWallet = NULL;

	try {
		masterWallet = walletManager->ImportWalletWithMnemonic(masterWalletId, mnemonic, phrasePassword, payPassword, language);
	} catch (std::exception &e) {
		exception = true;
		msgException = e.what();
	}

	env->ReleaseStringUTFChars(jmasterWalletId, masterWalletId);
	env->ReleaseStringUTFChars(jmnemonic, mnemonic);
	env->ReleaseStringUTFChars(jphrasePassword, phrasePassword);
	env->ReleaseStringUTFChars(jpayPassword, payPassword);
	env->ReleaseStringUTFChars(jlanguage, language);

	if (exception) {
		ThrowWalletException(env, msgException.c_str());
	}

	return (jlong)masterWallet;
}

#define SIG_EXPORT_WALLET_WITH_KEYSTORE "(JLcom/elastos/spvcore/IMasterWallet;Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;"
static jstring JNICALL nativeExportWalletWithKeystore(JNIEnv *env, jobject clazz, jlong jWalletMgr,
		jobject jmasterWallet,
		jstring jbackupPassword,
		jstring jpayPassword)
{
	bool exception = false;
	std::string msgException;

	const char* backupPassword = env->GetStringUTFChars(jbackupPassword, NULL);
	const char* payPassword = env->GetStringUTFChars(jpayPassword, NULL);

	jclass cls = env->FindClass(CLASS_MASTERWALLET);
	long masterProxy = GetJavaLongField(env, cls, jmasterWallet, FIELD_MASTERWALLET);
	CheckErrorAndLog(env, "nativeExportWalletWithKeystore", __LINE__);
	IMasterWallet *masterWallet = (IMasterWallet*)masterProxy;
	MasterWalletManager *walletManager = (MasterWalletManager*)jWalletMgr;

	jstring result = NULL;

	try {
		nlohmann::json r= walletManager->ExportWalletWithKeystore(masterWallet, backupPassword, payPassword);
		result = env->NewStringUTF(r.dump().c_str());
	} catch (std::exception &e) {
		exception = true;
		msgException = e.what();
	}

	env->ReleaseStringUTFChars(jbackupPassword, backupPassword);
	env->ReleaseStringUTFChars(jpayPassword, payPassword);

	if (exception) {
		ThrowWalletException(env, msgException.c_str());
	}

	return result;
}

#define SIG_EXPORT_WALLET_WITH_MNEMONIC "(JLcom/elastos/spvcore/IMasterWallet;Ljava/lang/String;)Ljava/lang/String;"
static jstring JNICALL nativeExportWalletWithMnemonic(JNIEnv *env, jobject clazz, jlong jWalletMgr,
		jobject jmasterWallet,
		jstring jpayPassword)
{
	bool exception = false;
	std::string msgException;

	jclass cls = env->FindClass(CLASS_MASTERWALLET);
	long masterProxy = GetJavaLongField(env, cls, jmasterWallet, FIELD_MASTERWALLET);
	CheckErrorAndLog(env, "nativeExportWalletWithMnemonic", __LINE__);
	IMasterWallet* masterWallet = (IMasterWallet*)masterProxy;

	const char* payPassword = env->GetStringUTFChars(jpayPassword, NULL);

	MasterWalletManager* walletManager = (MasterWalletManager*)jWalletMgr;

	jstring result = NULL;

	try {
		std::string str = walletManager->ExportWalletWithMnemonic(masterWallet, payPassword);
		result = env->NewStringUTF(str.c_str());
	} catch (std::exception &e) {
		exception = true;
		msgException = e.what();
	}

	env->ReleaseStringUTFChars(jpayPassword, payPassword);

	if (exception) {
		ThrowWalletException(env, msgException.c_str());
	}

	return result;
}

#define SIG_GET_ALL_MASTER_WALLETS "(J)[J"
static jlongArray JNICALL nativeGetAllMasterWallets(JNIEnv *env, jobject clazz, jlong jWalletMgr)
{
	MasterWalletManager* walletManager = (MasterWalletManager*)jWalletMgr;
	std::vector<IMasterWallet *> array;

	try {
		array = walletManager->GetAllMasterWallets();
	} catch (std::exception &e) {
		ThrowWalletException(env, e.what());
		return NULL;
	}

	const int length = array.size();
	jlongArray jarray = env->NewLongArray(length);

	if (length > 0) {
		jlong masterWallets[length];
		for (int i = 0; i < length; i++) {
			masterWallets[i] = (jlong)array[i];
		}
		env->SetLongArrayRegion(jarray, 0, length, masterWallets);
	}

	return jarray;
}

#define SIG_GET_ALL_MASTER_WALLET_IDS "(J)[Ljava/lang/String;"
static jobjectArray JNICALL nativeGetAllMasterWalletIds(JNIEnv *env, jobject clazz, jlong jWalletMgr)
{
	try {
		MasterWalletManager *walletManager = (MasterWalletManager *)jWalletMgr;
		std::vector<std::string> allIds = walletManager->GetAllMasterWalletIds();

		jclass objClass = env->FindClass("java/lang/String");
		jobjectArray objArray = env->NewObjectArray(allIds.size(), objClass, 0);
		for (int i = 0; i < allIds.size(); i++) {
			env->SetObjectArrayElement(objArray, i, env->NewStringUTF(allIds[i].c_str()));
		}

		return objArray;
	} catch (std::exception &e) {
		ThrowWalletException(env, e.what());
		return NULL;
	}
}

#define SIG_GET_WALLET "(JLjava/lang/String;)J"
static jlong JNICALL nativeGetWallet(JNIEnv *env, jobject clazz, jlong jWalletMgr,
		jstring jMasterWalletId)
{
	bool exception = false;
	std::string msgException;

	const char *masterWalletId = env->GetStringUTFChars(jMasterWalletId, NULL);
	IMasterWallet *masterWallet = NULL;

	try {
		MasterWalletManager *walletManager = (MasterWalletManager *)jWalletMgr;
		masterWallet = walletManager->GetWallet(masterWalletId);
	} catch (std::exception &e) {
		exception = true;
		msgException = e.what();
	}

	env->ReleaseStringUTFChars(jMasterWalletId, masterWalletId);

	if (exception) {
		ThrowWalletException(env, msgException.c_str());
	}

	return (jlong)masterWallet;
}

#define SIG_SAVE_CONFIGS "(J)V"
static void JNICALL nativeSaveConfigs(JNIEnv *env, jobject clazz, jlong jWalletMgr)
{
	MasterWalletManager *walletManager = (MasterWalletManager *)jWalletMgr;
	try {
		walletManager->SaveConfigs();
	} catch (std::exception &e) {
		ThrowWalletException(env, e.what());
	}
}

#define SIG_CONVERT_TO_HEXSTRING "(JLjava/lang/String;)Ljava/lang/String;"
static jstring JNICALL nativeConvertToHexString(JNIEnv *env, jobject clazz, jlong jWalletMgr,
		jstring jtxJson)
{
	bool exception = false;
	std::string msgException;

	jstring result = NULL;
	const char *txJson = env->GetStringUTFChars(jtxJson, NULL);

	try {
		MasterWalletManager *walletManager = (MasterWalletManager *)jWalletMgr;

		std::string hexString = walletManager->ConvertToHexString(nlohmann::json::parse(txJson));
		result = env->NewStringUTF(hexString.c_str());
	} catch (std::exception &e) {
		exception = true;
		msgException = e.what();
	}

	env->ReleaseStringUTFChars(jtxJson, txJson);

	if (exception) {
		ThrowWalletException(env, msgException.c_str());
	}

	return result;
}

#define SIG_CONVERT_FROM_HEXSTRING "(JLjava/lang/String;)Ljava/lang/String;"
static jstring JNICALL nativeConvertFromHexString(JNIEnv *env, jobject clazz, jlong jWalletMgr,
		jstring jHexString)
{
	bool exception = false;
	std::string msgException;

	jstring result = NULL;
	const char *hexString = env->GetStringUTFChars(jHexString, NULL);

	try {
		MasterWalletManager *walletManager = (MasterWalletManager *) jWalletMgr;

		nlohmann::json txJson = walletManager->ConvertFromHexString(hexString);
		result = env->NewStringUTF(txJson.dump().c_str());
	} catch (std::exception &e) {
		exception = true;
		msgException = e.what();
	}

	env->ReleaseStringUTFChars(jHexString, hexString);

	if (exception) {
		ThrowWalletException(env, msgException.c_str());
	}

	return result;
}

#define SIG_INIT_MASTER_WALLET_MANAGER "(Ljava/lang/String;)J"
static jlong JNICALL nativeInitMasterWalletManager(JNIEnv *env, jobject clazz, jstring jrootPath)
{
	bool exception = false;
	std::string msgException;

	MasterWalletManager* walletManager = NULL;
	const char* rootPath = env->GetStringUTFChars(jrootPath, NULL);

	try {
		walletManager = new MasterWalletManager(rootPath);
	} catch (std::exception &e) {
		exception = true;
		msgException = e.what();
	}

	env->ReleaseStringUTFChars(jrootPath, rootPath);

	if (exception) {
		ThrowWalletException(env, msgException.c_str());
	}

	return (jlong)walletManager;
}

#define SIG_DISPOSE_NATIVE "(J)V"
static void JNICALL nativeDisposeNative(JNIEnv *env, jobject clazz, jlong jWalletMgr)
{
	MasterWalletManager* walletManager = (MasterWalletManager*)jWalletMgr;
	delete walletManager;
}

static const JNINativeMethod gMethods[] = {
	{ "nativeSaveConfigs", SIG_SAVE_CONFIGS, (void *)nativeSaveConfigs },
	{ "nativeGenerateMnemonic", SIG_GENERATE_MNEMONIC, (void *)nativeGenerateMnemonic },
	{ "nativeCreateMasterWallet", SIG_CREATE_MASTER_WALLET, (void *)nativeCreateMasterWallet },
	{ "nativeCreateMultiSignMasterWallet", SIG_MULTISIGN_WALLET, (void *)nativeCreateMultiSignMasterWallet },
	{ "nativeCreateMultiSignMasterWalletWithPrivKey", SIG_MULTISIGN_WALLET_PRIV, (void *)nativeCreateMultiSignMasterWalletWithPrivKey },
	{ "nativeCreateMultiSignMasterWalletWithMnemonic", SIG_MULTISIGN_WALLET_MNEMONIC, (void *)nativeCreateMultiSignMasterWalletWithMnemonic },
	{ "nativeGetAllMasterWallets", SIG_GET_ALL_MASTER_WALLETS, (void *)nativeGetAllMasterWallets },
	{ "nativeGetAllMasterWalletIds", SIG_GET_ALL_MASTER_WALLET_IDS, (void *)nativeGetAllMasterWalletIds },
	{ "nativeGetWallet", SIG_GET_WALLET, (void *)nativeGetWallet},
	{ "nativeDestroyWallet", SIG_DESTROY_WALLET, (void *)nativeDestroyWallet },
	{ "nativeImportWalletWithKeystore", SIG_IMPORT_WALLET_WITH_KEYSTORE, (void *)nativeImportWalletWithKeystore },
	{ "nativeImportWalletWithMnemonic", SIG_IMPORT_WALLET_WITH_MNEMONIC, (void *)nativeImportWalletWithMnemonic },
	{ "nativeExportWalletWithKeystore", SIG_EXPORT_WALLET_WITH_KEYSTORE, (void *)nativeExportWalletWithKeystore },
	{ "nativeExportWalletWithMnemonic", SIG_EXPORT_WALLET_WITH_MNEMONIC, (void *)nativeExportWalletWithMnemonic },
	{ "nativeConvertToHexString", SIG_CONVERT_TO_HEXSTRING, (void *)nativeConvertToHexString },
	{ "nativeConvertFromHexString", SIG_CONVERT_FROM_HEXSTRING, (void *)nativeConvertFromHexString },
	{ "nativeInitMasterWalletManager", SIG_INIT_MASTER_WALLET_MANAGER, (void *)nativeInitMasterWalletManager },
	{ "nativeDisposeNative", SIG_DISPOSE_NATIVE, (void *)nativeDisposeNative },
};

int register_elastos_spv_IMasterWalletManager(JNIEnv *env)
{
	return jniRegisterNativeMethods(env,
			"com/elastos/spvcore/MasterWalletManager",
			gMethods, NELEM(gMethods));
}


// Copyright (c) 2012-2018 The Elastos Open Source Project
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

#include "ElaUtils.h"
#include "MasterWalletManager.h"

using namespace Elastos::ElaWallet;

#define  CLASS_MASTERWALLET   "com/elastos/spvcore/IMasterWallet"
#define  FIELD_MASTERWALLET   "mMasterProxy"

//"(JLjava/lang/String;)Ljava/lang/String;"
static jstring JNICALL nativeGenerateMnemonic(JNIEnv *env, jobject clazz, jlong jWalletMgr, jstring jlanguage)
{
    MasterWalletManager* walletManager = (MasterWalletManager*)jWalletMgr;
    const char* language = env->GetStringUTFChars(jlanguage, NULL);
    std::string mnemonic;

    try {
        mnemonic = walletManager->GenerateMnemonic(language);
    } catch (std::exception& e) {
        ThrowWalletException(env, e.what());
    }

    env->ReleaseStringUTFChars(jlanguage, language);
    return env->NewStringUTF(mnemonic.c_str());
}

//"(JLjava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)J"
static jlong JNICALL nativeCreateMasterWallet(JNIEnv *env, jobject clazz, jlong jWalletMgr, jstring jmasterWalletId
    , jstring jmnemonic, jstring jphrasePassword, jstring jpayPassword, jstring jlanguage)
{
    const char* masterWalletId = env->GetStringUTFChars(jmasterWalletId, NULL);
    const char* mnemonic = env->GetStringUTFChars(jmnemonic, NULL);
    const char* phrasePassword = env->GetStringUTFChars(jphrasePassword, NULL);
    const char* payPassword = env->GetStringUTFChars(jpayPassword, NULL);
    const char* language = env->GetStringUTFChars(jlanguage, NULL);

    MasterWalletManager* walletManager = (MasterWalletManager*)jWalletMgr;
    IMasterWallet* masterWallet = NULL;

    try {
        masterWallet = walletManager->CreateMasterWallet(masterWalletId, mnemonic, phrasePassword, payPassword,language);
    }
    catch (std::invalid_argument& e) {
        ThrowWalletException(env, e.what());
    }
    catch (std::logic_error& e) {
        ThrowWalletException(env, e.what());
    }
    catch (std::runtime_error& e) {
        ThrowWalletException(env, e.what());
    }
    catch (std::exception& e) {
        ThrowWalletException(env, e.what());
    }

    env->ReleaseStringUTFChars(jmasterWalletId, masterWalletId);
    env->ReleaseStringUTFChars(jmnemonic, mnemonic);
    env->ReleaseStringUTFChars(jphrasePassword, phrasePassword);
    env->ReleaseStringUTFChars(jpayPassword, payPassword);
    env->ReleaseStringUTFChars(jlanguage, language);
    return (jlong)masterWallet;
}

static jlong JNICALL nativeCreateMultiSignMasterWallet(JNIEnv *env, jobject clazz, jlong jWalletMgr,
					jstring jMasterWalletId,
					jstring jPayPassword,
					jstring jCoSigners,
					jint jRequiredSignCount)
{
	const char* masterWalletId = env->GetStringUTFChars(jMasterWalletId, NULL);
    const char* payPassword = env->GetStringUTFChars(jPayPassword, NULL);
    const char* coSigners = env->GetStringUTFChars(jCoSigners, NULL);

    MasterWalletManager* walletManager = (MasterWalletManager*)jWalletMgr;
    IMasterWallet* masterWallet = NULL;
	nlohmann::json coSignersJson = std::string(coSigners);

    try {
        masterWallet = walletManager->CreateMultiSignMasterWallet(masterWalletId, payPassword, coSignersJson, jRequiredSignCount);
    } catch (std::exception& e) {
        ThrowWalletException(env, e.what());
    }

    env->ReleaseStringUTFChars(jMasterWalletId, masterWalletId);
    env->ReleaseStringUTFChars(jPayPassword, payPassword);
    env->ReleaseStringUTFChars(jCoSigners, coSigners);

    return (jlong)masterWallet;
}

// ""
static jlong JNICALL nativeCreateMultiSignMasterWalletWithPrivKey(JNIEnv *env, jobject clazz, jlong jWalletMgr,
					jstring jMasterWalletId,
					jstring jPrivKey,
					jstring jPayPassword,
					jstring jCoSigners,
					jint jRequiredSignCount)
{
	const char* masterWalletId = env->GetStringUTFChars(jMasterWalletId, NULL);
	const char* privKey = env->GetStringUTFChars(jPrivKey, NULL);
	const char* payPassword = env->GetStringUTFChars(jPayPassword, NULL);
	const char* coSigners = env->GetStringUTFChars(jCoSigners, NULL);

	MasterWalletManager* walletManager = (MasterWalletManager*)jWalletMgr;
	IMasterWallet* masterWallet = NULL;
	nlohmann::json coSignersJson = std::string(coSigners);

	try {
		masterWallet = walletManager->CreateMultiSignMasterWallet(masterWalletId, privKey, payPassword, coSignersJson, jRequiredSignCount);
	} catch (std::exception& e) {
		ThrowWalletException(env, e.what());
	}

	env->ReleaseStringUTFChars(jMasterWalletId, masterWalletId);
	env->ReleaseStringUTFChars(jPrivKey, privKey);
	env->ReleaseStringUTFChars(jPayPassword, payPassword);
	env->ReleaseStringUTFChars(jCoSigners, coSigners);

	return (jlong)masterWallet;
}

static void JNICALL nativeDestroyWallet(JNIEnv *env, jobject clazz, jlong jWalletMgr, jstring jmasterWalletId)
{
    const char* masterWalletId = env->GetStringUTFChars(jmasterWalletId, NULL);

    MasterWalletManager* walletManager = (MasterWalletManager*)jWalletMgr;
    LOGD("FUNC=[%s]===================LINE=[%d], masterWalletId=[%s], walletManager=[%p]", __FUNCTION__, __LINE__, masterWalletId, walletManager);

    try {
        walletManager->DestroyWallet(masterWalletId);
    }
    catch (std::invalid_argument& e) {
        ThrowWalletException(env, e.what());
    }
    catch (std::logic_error& e) {
        ThrowWalletException(env, e.what());
    }
    catch (std::runtime_error& e) {
        ThrowWalletException(env, e.what());
    }
    catch (std::exception& e) {
        ThrowWalletException(env, e.what());
    }

    LOGD("FUNC=[%s]===================LINE=[%d]", __FUNCTION__, __LINE__);

    env->ReleaseStringUTFChars(jmasterWalletId, masterWalletId);
}

static jlong JNICALL nativeImportWalletWithKeystore(JNIEnv *env, jobject clazz, jlong jWalletMgr, jstring jmasterWalletId, jstring jkeystoreContent,
        jstring jbackupPassword, jstring jpayPassword, jstring jphrasePassword)
{
    const char* masterWalletId = env->GetStringUTFChars(jmasterWalletId, NULL);
    const char* keystoreContent = env->GetStringUTFChars(jkeystoreContent, NULL);
    const char* backupPassword = env->GetStringUTFChars(jbackupPassword, NULL);
    const char* payPassword = env->GetStringUTFChars(jpayPassword, NULL);
    const char* phrasePassword = env->GetStringUTFChars(jphrasePassword, NULL);

    MasterWalletManager* walletManager = (MasterWalletManager*)jWalletMgr;
    IMasterWallet* masterWallet = NULL;

    try {
        masterWallet = walletManager->ImportWalletWithKeystore(masterWalletId, std::string(keystoreContent), backupPassword, payPassword, phrasePassword);
    }
    catch (std::invalid_argument& e) {
        ThrowWalletException(env, e.what());
    }
    catch (std::logic_error& e) {
        ThrowWalletException(env, e.what());
    }
    catch (std::runtime_error& e) {
        ThrowWalletException(env, e.what());
    }
    catch (std::exception& e) {
        ThrowWalletException(env, e.what());
    }

    env->ReleaseStringUTFChars(jmasterWalletId, masterWalletId);
    env->ReleaseStringUTFChars(jkeystoreContent, keystoreContent);
    env->ReleaseStringUTFChars(jbackupPassword, backupPassword);
    env->ReleaseStringUTFChars(jpayPassword, payPassword);
    env->ReleaseStringUTFChars(jphrasePassword, phrasePassword);
    return (jlong)masterWallet;
}

static jlong JNICALL nativeImportWalletWithMnemonic(JNIEnv *env, jobject clazz, jlong jWalletMgr, jstring jmasterWalletId,
        jstring jmnemonic, jstring jphrasePassword, jstring jpayPassword, jstring jlanguage)
{
    const char* masterWalletId = env->GetStringUTFChars(jmasterWalletId, NULL);
    const char* mnemonic = env->GetStringUTFChars(jmnemonic, NULL);
    const char* phrasePassword = env->GetStringUTFChars(jphrasePassword, NULL);
    const char* payPassword = env->GetStringUTFChars(jpayPassword, NULL);
    const char* language = env->GetStringUTFChars(jlanguage, NULL);

    MasterWalletManager* walletManager = (MasterWalletManager*)jWalletMgr;
    IMasterWallet* masterWallet = NULL;

    try {
        masterWallet = walletManager->ImportWalletWithMnemonic(masterWalletId, mnemonic, phrasePassword, payPassword, language);
    }
    catch (std::invalid_argument& e) {
        ThrowWalletException(env, e.what());
    }
    catch (std::logic_error& e) {
        ThrowWalletException(env, e.what());
    }
    catch (std::runtime_error& e) {
        ThrowWalletException(env, e.what());
    }
    catch (std::exception& e) {
        ThrowWalletException(env, e.what());
    }

    env->ReleaseStringUTFChars(jmasterWalletId, masterWalletId);
    env->ReleaseStringUTFChars(jmnemonic, mnemonic);
    env->ReleaseStringUTFChars(jphrasePassword, phrasePassword);
    env->ReleaseStringUTFChars(jpayPassword, payPassword);
    env->ReleaseStringUTFChars(jlanguage, language);
    return (jlong)masterWallet;
}

static jstring JNICALL nativeExportWalletWithKeystore(JNIEnv *env, jobject clazz, jlong jWalletMgr, jobject jmasterWallet,
        jstring jbackupPassword, jstring jpayPassword)
{
    const char* backupPassword = env->GetStringUTFChars(jbackupPassword, NULL);
    const char* payPassword = env->GetStringUTFChars(jpayPassword, NULL);

    jclass cls = env->FindClass(CLASS_MASTERWALLET);
    long masterProxy = GetJavaLongField(env, cls, jmasterWallet, FIELD_MASTERWALLET);
    CheckErrorAndLog(env, "nativeExportWalletWithKeystore", __LINE__);
    IMasterWallet* masterWallet = (IMasterWallet*)masterProxy;
    MasterWalletManager* walletManager = (MasterWalletManager*)jWalletMgr;
    nlohmann::json result;

    try {
        result = walletManager->ExportWalletWithKeystore(masterWallet, backupPassword, payPassword);
    }
    catch (std::invalid_argument& e) {
        ThrowWalletException(env, e.what());
    }
    catch (std::logic_error& e) {
        ThrowWalletException(env, e.what());
    }
    catch (std::runtime_error& e) {
        ThrowWalletException(env, e.what());
    }
    catch (std::exception& e) {
        ThrowWalletException(env, e.what());
    }

    env->ReleaseStringUTFChars(jbackupPassword, backupPassword);
    env->ReleaseStringUTFChars(jpayPassword, payPassword);
    return env->NewStringUTF(result.dump().c_str());
}

static jstring JNICALL nativeExportWalletWithMnemonic(JNIEnv *env, jobject clazz, jlong jWalletMgr,
        jobject jmasterWallet, jstring jpayPassword)
{
    jclass cls = env->FindClass(CLASS_MASTERWALLET);
    long masterProxy = GetJavaLongField(env, cls, jmasterWallet, FIELD_MASTERWALLET);
    CheckErrorAndLog(env, "nativeExportWalletWithMnemonic", __LINE__);
    IMasterWallet* masterWallet = (IMasterWallet*)masterProxy;

    const char* payPassword = env->GetStringUTFChars(jpayPassword, NULL);

    MasterWalletManager* walletManager = (MasterWalletManager*)jWalletMgr;
    std::string str;

    try {
        str = walletManager->ExportWalletWithMnemonic(masterWallet, payPassword);
    } catch (std::exception& e) {
        ThrowWalletException(env, e.what());
    }

    env->ReleaseStringUTFChars(jpayPassword, payPassword);
    return env->NewStringUTF(str.c_str());
}

//"(J)[J"
static jlongArray JNICALL nativeGetAllMasterWallets(JNIEnv *env, jobject clazz, jlong jWalletMgr)
{
    MasterWalletManager* walletManager = (MasterWalletManager*)jWalletMgr;
    std::vector<IMasterWallet *> array;

	LOGI("walletManager = %p", walletManager);

    try {
        array = walletManager->GetAllMasterWallets();
    }
    catch (std::invalid_argument& e) {
		LOGE("GetAllMasterWallets e = %s", e.what());
        ThrowWalletException(env, e.what());
    }
    catch (std::logic_error& e) {
		LOGE("GetAllMasterWallets e = %s", e.what());
        ThrowWalletException(env, e.what());
    }
    catch (std::runtime_error& e) {
		LOGE("GetAllMasterWallets e = %s", e.what());
        ThrowWalletException(env, e.what());
    }
    catch (std::exception& e) {
		LOGE("GetAllMasterWallets e = %s", e.what());
        ThrowWalletException(env, e.what());
    }

    const int length = array.size();
	LOGI("array.size = %d", array.size());
    if (length > 0) {
        jlong* proxies = new jlong[length];
        for (int i = 0; i < length; ++i) {
            proxies[i] = (jlong)array[i];
        }

        jlongArray jarray = env->NewLongArray(length);
        env->SetLongArrayRegion(jarray, 0, length, proxies);
        delete[] proxies;
        return jarray;
    }

    return NULL;
}

//"()V"
static void JNICALL nativeSaveConfigs(JNIEnv *env, jobject clazz, jlong jWalletMgr)
{
    MasterWalletManager* walletManager = (MasterWalletManager*)jWalletMgr;
    walletManager->SaveConfigs();
}

static jlong JNICALL nativeInitMasterWalletManager(JNIEnv *env, jobject clazz, jstring jrootPath)
{
    const char* rootPath = env->GetStringUTFChars(jrootPath, NULL);

    MasterWalletManager* walletManager = new MasterWalletManager(rootPath);

    env->ReleaseStringUTFChars(jrootPath, rootPath);
    return (jlong)walletManager;
}

static void JNICALL nativeDisposeNative(JNIEnv *env, jobject clazz, jlong jWalletMgr)
{
    MasterWalletManager* walletManager = (MasterWalletManager*)jWalletMgr;
    delete walletManager;
}

static const JNINativeMethod gMethods[] = {
    {"nativeSaveConfigs", "(J)V", (void*)nativeSaveConfigs},
    {"nativeGenerateMnemonic", "(JLjava/lang/String;)Ljava/lang/String;", (void*)nativeGenerateMnemonic},
    {"nativeCreateMasterWallet", "(JLjava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)J", (void*)nativeCreateMasterWallet},
    {"nativeCreateMultiSignMasterWallet", "(JLjava/lang/String;Ljava/lang/String;Ljava/lang/String;I)J", (void*)nativeCreateMultiSignMasterWallet},
    {"nativeCreateMultiSignMasterWalletWithPrivKey", "(JLjava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;I)J", (void*)nativeCreateMultiSignMasterWalletWithPrivKey},
    {"nativeGetAllMasterWallets", "(J)[J", (void*)nativeGetAllMasterWallets},
    {"nativeDestroyWallet", "(JLjava/lang/String;)V", (void*)nativeDestroyWallet},
    {"nativeImportWalletWithKeystore", "(JLjava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)J", (void*)nativeImportWalletWithKeystore},
    {"nativeImportWalletWithMnemonic", "(JLjava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)J", (void*)nativeImportWalletWithMnemonic},
    {"nativeExportWalletWithKeystore", "(JLcom/elastos/spvcore/IMasterWallet;Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;", (void*)nativeExportWalletWithKeystore},
    {"nativeExportWalletWithMnemonic", "(JLcom/elastos/spvcore/IMasterWallet;Ljava/lang/String;)Ljava/lang/String;", (void*)nativeExportWalletWithMnemonic},
    {"nativeInitMasterWalletManager", "(Ljava/lang/String;)J", (void*)nativeInitMasterWalletManager},
    {"nativeDisposeNative", "(J)V", (void*)nativeDisposeNative},
};

int register_elastos_spv_IMasterWalletManager(JNIEnv *env)
{
    return jniRegisterNativeMethods(env, "com/elastos/spvcore/MasterWalletManager",
        gMethods, NELEM(gMethods));
}

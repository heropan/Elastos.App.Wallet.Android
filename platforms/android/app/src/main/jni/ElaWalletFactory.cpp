// Copyright (c) 2012-2018 The Elastos Open Source Project
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

#include "ElaUtils.h"
#include "WalletFactory.h"

using namespace Elastos::SDK;

#define  CLASS_MASTERWALLET   "com/elastos/spvcore/IMasterWallet"
#define  FIELD_MASTERWALLET   "mMasterProxy"

static jlong JNICALL nativeCreateJni(JNIEnv *env, jobject clazz)
{
    WalletFactory* factory = new WalletFactory();
    return (jlong)factory;
}

static void JNICALL nativeDisposeNative(JNIEnv *env, jobject clazz, jlong jfactory)
{
    WalletFactory* factory = (WalletFactory*)jfactory;
    delete factory;
}

static jlong JNICALL nativeCreateMasterWallet(JNIEnv *env, jobject clazz, jlong jfactory/*, jstring jlanguage*/, jstring jphrasePassword, jstring jpayPassword)
{
    const char* phrasePassword = env->GetStringUTFChars(jphrasePassword, NULL);
    const char* payPassword = env->GetStringUTFChars(jpayPassword, NULL);
    // const char* language = env->GetStringUTFChars(jlanguage, NULL);

    IWalletFactory* factory = (IWalletFactory*)jfactory;
    //IMasterWallet* masterWallet = factory->CreateMasterWallet(language, phrasePassword, payPassword);
    IMasterWallet* masterWallet = factory->CreateMasterWallet(phrasePassword, payPassword);

    env->ReleaseStringUTFChars(jphrasePassword, phrasePassword);
    env->ReleaseStringUTFChars(jpayPassword, payPassword);
    // env->ReleaseStringUTFChars(jlanguage, language);
    return (jlong)masterWallet;
}

static void JNICALL nativeDestroyWallet(JNIEnv *env, jobject clazz, jlong jfactory, jobject jmasterWallet)
{
    jclass cls = env->FindClass(CLASS_MASTERWALLET);
    long masterProxy = GetJavaLongField(env, cls, jmasterWallet, FIELD_MASTERWALLET);
    CheckErrorAndLog(env, "nativeDestroyWallet", __LINE__);
    IMasterWallet* masterWallet = (IMasterWallet*)masterProxy;
    IWalletFactory* factory = (IWalletFactory*)jfactory;
    factory->DestroyWallet(masterWallet);
}

static jlong JNICALL nativeImportWalletWithKeystore(JNIEnv *env, jobject clazz, jlong jfactory, jstring jkeystorePath,
        jstring jbackupPassword, jstring jpayPassword)
{
    const char* keystorePath = env->GetStringUTFChars(jkeystorePath, NULL);
    const char* backupPassword = env->GetStringUTFChars(jbackupPassword, NULL);
    const char* payPassword = env->GetStringUTFChars(jpayPassword, NULL);

    IWalletFactory* factory = (IWalletFactory*)jfactory;
    IMasterWallet* masterWallet = factory->ImportWalletWithKeystore(keystorePath, backupPassword, payPassword);

    env->ReleaseStringUTFChars(jkeystorePath, keystorePath);
    env->ReleaseStringUTFChars(jbackupPassword, backupPassword);
    env->ReleaseStringUTFChars(jpayPassword, payPassword);
    return (jlong)masterWallet;
}

static jlong JNICALL nativeImportWalletWithMnemonic(JNIEnv *env, jobject clazz, jlong jfactory, jstring jmnemonic,
        jstring jphrasePassword, jstring jpayPassword)
{
    const char* mnemonic = env->GetStringUTFChars(jmnemonic, NULL);
    const char* phrasePassword = env->GetStringUTFChars(jphrasePassword, NULL);
    const char* payPassword = env->GetStringUTFChars(jpayPassword, NULL);

    IWalletFactory* factory = (IWalletFactory*)jfactory;
    IMasterWallet* masterWallet = factory->ImportWalletWithMnemonic(mnemonic, phrasePassword, payPassword);

    env->ReleaseStringUTFChars(jmnemonic, mnemonic);
    env->ReleaseStringUTFChars(jphrasePassword, phrasePassword);
    env->ReleaseStringUTFChars(jpayPassword, payPassword);
    return (jlong)masterWallet;
}

static void JNICALL nativeExportWalletWithKeystore(JNIEnv *env, jobject clazz, jlong jfactory, jobject jmasterWallet,
        jstring jbackupPassword, jstring jkeystorePath)
{
    const char* backupPassword = env->GetStringUTFChars(jbackupPassword, NULL);
    const char* keystorePath = env->GetStringUTFChars(jkeystorePath, NULL);

    jclass cls = env->FindClass(CLASS_MASTERWALLET);
    long masterProxy = GetJavaLongField(env, cls, jmasterWallet, FIELD_MASTERWALLET);
    CheckErrorAndLog(env, "nativeExportWalletWithKeystore", __LINE__);
    IMasterWallet* masterWallet = (IMasterWallet*)masterProxy;
    IWalletFactory* factory = (IWalletFactory*)jfactory;
    factory->ExportWalletWithKeystore(masterWallet, backupPassword, keystorePath);

    env->ReleaseStringUTFChars(jbackupPassword, backupPassword);
    env->ReleaseStringUTFChars(jkeystorePath, keystorePath);
}

static jstring JNICALL nativeExportWalletWithMnemonic(JNIEnv *env, jobject clazz, jlong jfactory,
        jobject jmasterWallet, jstring jpayPassword)
{
    jclass cls = env->FindClass(CLASS_MASTERWALLET);
    long masterProxy = GetJavaLongField(env, cls, jmasterWallet, FIELD_MASTERWALLET);
    CheckErrorAndLog(env, "nativeExportWalletWithMnemonic", __LINE__);
    IMasterWallet* masterWallet = (IMasterWallet*)masterProxy;

    const char* payPassword = env->GetStringUTFChars(jpayPassword, NULL);

    IWalletFactory* factory = (IWalletFactory*)jfactory;
    std::string str = factory->ExportWalletWithMnemonic(masterWallet, payPassword);
    jstring jstr = env->NewStringUTF(str.c_str());

    env->ReleaseStringUTFChars(jpayPassword, payPassword);
    return jstr;
}

static const JNINativeMethod gMethods[] = {
    {"nativeCreateMasterWallet", "(Ljava/lang/String;Ljava/lang/String;)J", (void*)nativeCreateMasterWallet},
    {"nativeCreateJni", "()J", (void*)nativeCreateJni},
    {"nativeDisposeNative", "(J)V", (void*)nativeDisposeNative},
    {"nativeDestroyWallet", "(JLcom/elastos/spvcore/IMasterWallet;)V", (void*)nativeDestroyWallet},
    {"nativeImportWalletWithKeystore", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)J", (void*)nativeImportWalletWithKeystore},
    {"nativeImportWalletWithMnemonic", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)J", (void*)nativeImportWalletWithMnemonic},
    {"nativeExportWalletWithKeystore", "(Lcom/elastos/spvcore/IMasterWallet;Ljava/lang/String;Ljava/lang/String;)V", (void*)nativeExportWalletWithKeystore},
    {"nativeExportWalletWithMnemonic", "(Lcom/elastos/spvcore/IMasterWallet;Ljava/lang/String;)Ljava/lang/String;", (void*)nativeExportWalletWithMnemonic},
};

int register_elastos_spv_IWalletFactory(JNIEnv *env)
{
    return jniRegisterNativeMethods(env, "com/elastos/spvcore/IWalletFactory",
        gMethods, NELEM(gMethods));
}

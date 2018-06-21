// Copyright (c) 2012-2018 The Elastos Open Source Project
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

#include "ElaUtils.h"
#include "Enviroment.h"
#include "nlohmann/json.hpp"

using namespace Elastos::ElaWallet;

//"(Ljava/lang/String;)V"
static void JNICALL nativeInitializeRootPath(JNIEnv *env, jobject clazz, jstring jRootPath)
{
    const char* rootPath = env->GetStringUTFChars(jRootPath, NULL);
    Enviroment::InitializeRootPath(rootPath);
    env->ReleaseStringUTFChars(jRootPath, rootPath);
}

//"()J"
static jlong JNICALL nativeGetMasterWalletManager(JNIEnv *env, jobject clazz)
{
    IMasterWalletManager* masterMgr = Enviroment::GetMasterWalletManager();
    return (jlong)masterMgr;
}

//"()Ljava/lang/String;"
static jstring JNICALL nativeGetRootPath(JNIEnv *env, jobject clazz)
{
    std::string rootPath = Enviroment::GetRootPath();
    return env->NewStringUTF(rootPath.c_str());
}

//"()Ljava/lang/String;"
static void JNICALL nativeSaveConfigs(JNIEnv *env, jobject clazz)
{
    Enviroment::SaveConfigs();
}

static const JNINativeMethod gMethods[] = {
    {"nativeInitializeRootPath", "(Ljava/lang/String;)V", (void*)nativeInitializeRootPath},
    {"nativeGetMasterWalletManager", "()J", (void*)nativeGetMasterWalletManager},
    {"nativeGetRootPath", "()Ljava/lang/String;", (void*)nativeGetRootPath},
    {"nativeSaveConfigs", "()V", (void*)nativeSaveConfigs},
};

jint register_elastos_spv_Enviroment(JNIEnv *env)
{
    return jniRegisterNativeMethods(env, "com/elastos/spvcore/Enviroment",
        gMethods, NELEM(gMethods));
}

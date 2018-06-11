// Copyright (c) 2012-2018 The Elastos Open Source Project
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

#include "ElaUtils.h"
#include "Enviroment.h"
#include "nlohmann/json.hpp"

using namespace Elastos::SDK;

//"(JLjava/lang/String;)V"
static void JNICALL nativeInitializeRootPath(JNIEnv *env, jobject clazz, jlong jEnviromentProxy, jstring jRootPath)
{
    const char* rootPath = env->GetStringUTFChars(jRootPath, NULL);

    Enviroment* walletEnv = (Enviroment*)jEnviromentProxy;
    walletEnv->InitializeRootPath(rootPath);

    env->ReleaseStringUTFChars(jRootPath, rootPath);
}

//"(J)J"
static jlong JNICALL nativeGetMasterWalletManager(JNIEnv *env, jobject clazz, jlong jEnviromentProxy)
{
    Enviroment* walletEnv = (Enviroment*)jEnviromentProxy;
    IMasterWalletManager* masterMgr = walletEnv->GetMasterWalletManager();
    return (jlong)masterMgr;
}

//"(J)Ljava/lang/String;"
static jstring JNICALL nativeGetRootPath(JNIEnv *env, jobject clazz, jlong jEnviromentProxy)
{
    Enviroment* walletEnv = (Enviroment*)jEnviromentProxy;
    std::string rootPath = walletEnv->GetRootPath();
    return env->NewStringUTF(rootPath.c_str());
}


static const JNINativeMethod gMethods[] = {
    {"nativeInitializeRootPath", "(JLjava/lang/String;)V", (void*)nativeInitializeRootPath},
    {"nativeGetMasterWalletManager", "(J)J", (void*)nativeGetMasterWalletManager},
    {"nativeGetRootPath", "(J)Ljava/lang/String;", (void*)nativeGetRootPath},
};

jint register_elastos_spv_Enviroment(JNIEnv *env)
{
    return jniRegisterNativeMethods(env, "com/elastos/spvcore/Enviroment",
        gMethods, NELEM(gMethods));
}

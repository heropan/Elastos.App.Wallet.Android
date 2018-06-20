// Copyright (c) 2012-2018 The Elastos Open Source Project
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

#include "ElaUtils.h"
#include "IdManagerFactory.h"

using namespace Elastos::ElaWallet;
using namespace Elastos::DID;

//"(J)J"
static jlong JNICALL nativeCreateIdManager(JNIEnv *env, jobject clazz, jlong jmasterWalletProxy)
{
    IMasterWallet* masterWallet = (IMasterWallet*)jmasterWalletProxy;
    IdManagerFactory idManagerFactory;
    IDIDManager *idManager = idManagerFactory.CreateIdManager(masterWallet);
    return (jlong)idManager;
}

static const JNINativeMethod gMethods[] = {
    {"nativeCreateIdManager", "(J)J", (void*)nativeCreateIdManager},
};

jint register_elastos_spv_IdManagerFactory(JNIEnv *env)
{
    return jniRegisterNativeMethods(env, "com/elastos/spvcore/IdManagerFactory",
        gMethods, NELEM(gMethods));
}

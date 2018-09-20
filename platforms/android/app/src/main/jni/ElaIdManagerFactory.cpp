// Copyright (c) 2012-2018 The Elastos Open Source Project
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

#include "ElaUtils.h"
#include "IdManagerFactory.h"

using namespace Elastos::ElaWallet;
using namespace Elastos::DID;

//"(J)J"
static jlong JNICALL nativeCreateIdManager(JNIEnv *env, jobject clazz, jlong jmasterWalletProxy, jstring jrootPath)
{
	bool exception = false;
	std::string msgException;

	const char *rootPath = env->GetStringUTFChars(jrootPath, NULL);
	IDIDManager *idManager = NULL;

	try {
		IMasterWallet* masterWallet = (IMasterWallet*)jmasterWalletProxy;
		IdManagerFactory idManagerFactory;
		idManager = idManagerFactory.CreateIdManager(masterWallet, rootPath);
	} catch (std::exception &e) {
		exception = true;
		msgException = e.what();
	}

	env->ReleaseStringUTFChars(jrootPath, rootPath);

	if (exception)
		ThrowWalletException(env, msgException.c_str());

	return (jlong)idManager;
}

static const JNINativeMethod gMethods[] = {
	{
		"nativeCreateIdManager",
		"(JLjava/lang/String;)J",
		(void*)nativeCreateIdManager
	},
};

jint register_elastos_spv_IdManagerFactory(JNIEnv *env)
{
	return jniRegisterNativeMethods(env,
			"com/elastos/spvcore/IdManagerFactory",
			gMethods, NELEM(gMethods));
}


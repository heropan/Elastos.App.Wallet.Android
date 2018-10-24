// Copyright (c) 2012-2018 The Elastos Open Source Project
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

#include "ElaUtils.h"
#include "IMainchainSubWallet.h"
#include "nlohmann/json.hpp"

using namespace Elastos::ElaWallet;

#define SIG_nativeCreateDepositTransaction "(JLjava/lang/String;Ljava/lang/String;JLjava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;"
static jstring JNICALL nativeCreateDepositTransaction(JNIEnv *env, jobject clazz, jlong jMainSubWalletProxy,
		jstring jfromAddress,
		jstring jtoAddress,
		jlong amount,
		jstring jsidechainAccounts,
		jstring jsidechainAmounts,
		jstring jsidechainIndexs,
		jstring jmemo,
		jstring jremark)
{
	bool exception = false;
	std::string msgException;

	const char* fromAddress = env->GetStringUTFChars(jfromAddress, NULL);
	const char* toAddress = env->GetStringUTFChars(jtoAddress, NULL);
	const char* sidechainAccounts = env->GetStringUTFChars(jsidechainAccounts, NULL);
	const char* sidechainAmounts = env->GetStringUTFChars(jsidechainAmounts, NULL);
	const char* sidechainIndexs = env->GetStringUTFChars(jsidechainIndexs, NULL);
	const char* memo = env->GetStringUTFChars(jmemo, NULL);
	const char* remark = env->GetStringUTFChars(jremark, NULL);

	IMainchainSubWallet* wallet = (IMainchainSubWallet*)jMainSubWalletProxy;
	jstring tx = NULL;

	try {
		nlohmann::json txJson = wallet->CreateDepositTransaction(fromAddress, toAddress, amount, nlohmann::json::parse(sidechainAccounts),
				nlohmann::json::parse(sidechainAmounts), nlohmann::json::parse(sidechainIndexs), memo, remark);
		tx = env->NewStringUTF(txJson.dump().c_str());
	} catch (std::exception &e) {
		exception = true;
		msgException = e.what();
	}

	env->ReleaseStringUTFChars(jfromAddress, fromAddress);
	env->ReleaseStringUTFChars(jtoAddress, toAddress);
	env->ReleaseStringUTFChars(jsidechainAccounts, sidechainAccounts);
	env->ReleaseStringUTFChars(jsidechainAmounts, sidechainAmounts);
	env->ReleaseStringUTFChars(jsidechainIndexs, sidechainIndexs);
	env->ReleaseStringUTFChars(jmemo, memo);
	env->ReleaseStringUTFChars(jremark, remark);

	if (exception) {
		ThrowWalletException(env, msgException.c_str());
	}

	return tx;
}

static const JNINativeMethod gMethods[] = {
	REGISTER_METHOD(nativeCreateDepositTransaction),
};

jint register_elastos_spv_IMainchainSubWallet(JNIEnv *env)
{
	return jniRegisterNativeMethods(env,
			"com/elastos/spvcore/IMainchainSubWallet",
			gMethods, NELEM(gMethods));
}


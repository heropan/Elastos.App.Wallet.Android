// Copyright (c) 2012-2018 The Elastos Open Source Project
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

#include "ElaUtils.h"
#include "IMainchainSubWallet.h"
#include "nlohmann/json.hpp"

using namespace Elastos::ElaWallet;

#define SIG_nativeCreateDepositTransaction "(JLjava/lang/String;Ljava/lang/String;JLjava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Z)Ljava/lang/String;"
static jstring JNICALL nativeCreateDepositTransaction(JNIEnv *env, jobject clazz, jlong jMainSubWalletProxy,
		jstring jfromAddress,
		jstring jtoAddress,
		jlong amount,
		jstring jsidechainAccounts,
		jstring jsidechainAmounts,
		jstring jsidechainIndexs,
		jstring jmemo,
		jstring jremark,
		jboolean useVotedUTXO)
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
				nlohmann::json::parse(sidechainAmounts), nlohmann::json::parse(sidechainIndexs), memo, remark, useVotedUTXO);
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

#define SIG_nativeCreateVoteProducerTransaction "(JJLjava/lang/String;)Ljava/lang/String;"
static jstring JNICALL nativeCreateVoteProducerTransaction(JNIEnv *env, jobject clazz, jlong jMainSubWalletProxy,
		jlong stake,
		jstring jpublicKeys)
{

	bool exception = false;
	std::string msgException;

	const char* publicKeys = env->GetStringUTFChars(jpublicKeys, NULL);

	IMainchainSubWallet* wallet = (IMainchainSubWallet*)jMainSubWalletProxy;
	jstring tx = NULL;

	try {
		nlohmann::json txJson = wallet->CreateVoteProducerTransaction(stake, nlohmann::json::parse(publicKeys));
		tx = env->NewStringUTF(txJson.dump().c_str());
	} catch (std::exception &e) {
		exception = true;
		msgException = e.what();
	}

	env->ReleaseStringUTFChars(jpublicKeys, publicKeys);

	if (exception) {
		ThrowWalletException(env, msgException.c_str());
	}

	return tx;
}

#define SIG_nativeGetVotedProducerList "(J)Ljava/lang/String;"
static jstring JNICALL nativeGetVotedProducerList(JNIEnv *env, jobject clazz, jlong jSubWalletProxy) {
	bool exception = false;
	std::string msgException;

	IMainchainSubWallet *subWallet = (IMainchainSubWallet *) jSubWalletProxy;
	jstring list = NULL;

	try {
		nlohmann::json listJson = subWallet->GetVotedProducerList();
		list = env->NewStringUTF(listJson.dump().c_str());
	} catch (const std::exception &e) {
		exception = true;
		msgException = e.what();
	}

	if (exception) {
		ThrowWalletException(env, msgException.c_str());
	}

	return list;
}

#define SIG_nativeExportProducerKeystore "(JLjava/lang/String;Ljava/lang/String;)Ljava/lang/String;"
static jstring JNICALL nativeExportProducerKeystore(JNIEnv *env, jobject clazz, jlong jSubWalletProxy,
		jstring jBackupPasswd,
		jstring jPayPasswd) {
	bool exception = false;
	jstring keystore = NULL;
	std::string msgException;

	const char *backupPasswd = env->GetStringUTFChars(jBackupPasswd, NULL);
	const char *payPasswd = env->GetStringUTFChars(jPayPasswd, NULL);
	IMainchainSubWallet *subWallet = (IMainchainSubWallet *) jSubWalletProxy;

	try {
		nlohmann::json keystoreJson = subWallet->ExportProducerKeystore(backupPasswd, payPasswd);
		keystore = env->NewStringUTF(keystoreJson.dump().c_str());
	} catch (const std::exception &e) {
		exception = true;
		msgException = e.what();
	}

	env->ReleaseStringUTFChars(jBackupPasswd, backupPasswd);
	env->ReleaseStringUTFChars(jPayPasswd, payPasswd);

	if (exception) {
		ThrowWalletException(env, msgException.c_str());
	}

	return keystore;
}

#define SIG_nativeGetRegisteredProducerInfo "(J)Ljava/lang/String;"
static jstring JNICALL nativeGetRegisteredProducerInfo(JNIEnv *env, jobject clazz, jlong jSubWalletProxy) {
	bool exception = false;
	jstring info = NULL;
	std::string msgException;

	IMainchainSubWallet *subWallet = (IMainchainSubWallet *) jSubWalletProxy;

	try {
		nlohmann::json infoJson = subWallet->GetRegisteredProducerInfo();
		info = env->NewStringUTF(infoJson.dump().c_str());
	} catch(const std::exception &e) {
		exception = true;
		msgException = e.what();
	}

	if (exception) {
		ThrowWalletException(env, msgException.c_str());
	}

	return info;
}

static const JNINativeMethod gMethods[] = {
	REGISTER_METHOD(nativeCreateDepositTransaction),
	REGISTER_METHOD(nativeCreateVoteProducerTransaction),
	REGISTER_METHOD(nativeGetVotedProducerList),
	REGISTER_METHOD(nativeExportProducerKeystore),
	REGISTER_METHOD(nativeGetRegisteredProducerInfo),
};

jint register_elastos_spv_IMainchainSubWallet(JNIEnv *env)
{
	return jniRegisterNativeMethods(env,
			"com/elastos/spvcore/IMainchainSubWallet",
			gMethods, NELEM(gMethods));
}


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

#define SIG_nativeGenerateProducerPayload "(JLjava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;JLjava/lang/String;)Ljava/lang/String;"
static jstring JNICALL nativeGenerateProducerPayload(JNIEnv *env, jobject clazz, jlong jProxy,
		jstring jPublicKey,
		jstring jNickName,
		jstring jURL,
		jstring jIPAddress,
		jlong location,
		jstring jPayPasswd)
{
	bool exception = false;
	std::string msgException;
	jstring payload = NULL;

	const char *publicKey = env->GetStringUTFChars(jPublicKey, NULL);
	const char *nickName  = env->GetStringUTFChars(jNickName, NULL);
	const char *url       = env->GetStringUTFChars(jURL, NULL);
	const char *ipAddress = env->GetStringUTFChars(jIPAddress, NULL);
	const char *payPasswd = env->GetStringUTFChars(jPayPasswd, NULL);

	try {
		IMainchainSubWallet *wallet = (IMainchainSubWallet *)jProxy;
		nlohmann::json payloadJson = wallet->GenerateProducerPayload(publicKey, nickName, url, ipAddress, location, payPasswd);
		payload = env->NewStringUTF(payloadJson.dump().c_str());
	} catch (const std::exception &e) {
		exception = true;
		msgException = e.what();
	}

	env->ReleaseStringUTFChars(jPublicKey, publicKey);
	env->ReleaseStringUTFChars(jNickName, nickName);
	env->ReleaseStringUTFChars(jURL, url);
	env->ReleaseStringUTFChars(jIPAddress, ipAddress);
	env->ReleaseStringUTFChars(jPayPasswd, payPasswd);

	if (exception) {
		ThrowWalletException(env, msgException.c_str());
	}

	return payload;
}

#define SIG_nativeGenerateCancelProducerPayload "(JLjava/lang/String;Ljava/lang/String;)Ljava/lang/String;"
static jstring JNICALL nativeGenerateCancelProducerPayload(JNIEnv *env, jobject clazz, jlong jProxy,
		jstring jPublicKey,
		jstring jPayPasswd)
{
	bool exception = false;
	std::string msgException;
	jstring payload = NULL;

	const char *publicKey = env->GetStringUTFChars(jPublicKey, NULL);
	const char *payPasswd = env->GetStringUTFChars(jPayPasswd, NULL);

	try {
		IMainchainSubWallet *wallet = (IMainchainSubWallet *)jProxy;
		nlohmann::json payloadJson = wallet->GenerateCancelProducerPayload(publicKey, payPasswd);
		payload = env->NewStringUTF(payloadJson.dump().c_str());
	} catch (const std::exception &e) {
		exception = true;
		msgException = e.what();
	}

	env->ReleaseStringUTFChars(jPublicKey, publicKey);
	env->ReleaseStringUTFChars(jPayPasswd, payPasswd);

	if (exception) {
		ThrowWalletException(env, msgException.c_str());
	}

	return payload;
}

#define SIG_nativeCreateRegisterProducerTransaction "(JLjava/lang/String;Ljava/lang/String;JLjava/lang/String;Z)Ljava/lang/String;"
static jstring JNICALL nativeCreateRegisterProducerTransaction(JNIEnv *env, jobject clazz, jlong jProxy,
		jstring jFromAddress,
		jstring jPayloadJson,
		jlong amount,
		jstring jMemo,
		jboolean useVotedUTXO)
{
	bool exception = false;
	std::string msgException;
	jstring tx = NULL;

	const char *fromAddress = env->GetStringUTFChars(jFromAddress, NULL);
	const char *payloadJson = env->GetStringUTFChars(jPayloadJson, NULL);
	const char *memo        = env->GetStringUTFChars(jMemo, NULL);

	try {
		IMainchainSubWallet *wallet = (IMainchainSubWallet *)jProxy;
		nlohmann::json payload = nlohmann::json::parse(payloadJson);
		nlohmann::json txJson = wallet->CreateRegisterProducerTransaction(fromAddress, payload, amount, memo, useVotedUTXO);
		tx = env->NewStringUTF(txJson.dump().c_str());
	} catch (const std::exception &e) {
		exception = true;
		msgException = e.what();
	}

	env->ReleaseStringUTFChars(jFromAddress, fromAddress);
	env->ReleaseStringUTFChars(jPayloadJson, payloadJson);
	env->ReleaseStringUTFChars(jMemo, memo);

	if (exception) {
		ThrowWalletException(env, msgException.c_str());
	}

	return tx;
}

#define SIG_nativeCreateUpdateProducerTransaction "(JLjava/lang/String;Ljava/lang/String;Ljava/lang/String;Z)Ljava/lang/String;"
static jstring JNICALL nativeCreateUpdateProducerTransaction(JNIEnv *env, jobject clazz, jlong jProxy,
		jstring jFromAddress,
		jstring jPayloadJson,
		jstring jMemo,
		jboolean useVotedUTXO)
{
	bool exception = false;
	std::string msgException;
	jstring tx = NULL;

	const char *fromAddress = env->GetStringUTFChars(jFromAddress, NULL);
	const char *payloadJson = env->GetStringUTFChars(jPayloadJson, NULL);
	const char *memo        = env->GetStringUTFChars(jMemo, NULL);

	try {
		IMainchainSubWallet *wallet = (IMainchainSubWallet *)jProxy;
		nlohmann::json payload = nlohmann::json::parse(payloadJson);
		nlohmann::json txJson = wallet->CreateUpdateProducerTransaction(fromAddress, payload, memo, useVotedUTXO);
		tx = env->NewStringUTF(txJson.dump().c_str());
	} catch (const std::exception &e) {
		exception = true;
		msgException = e.what();
	}

	env->ReleaseStringUTFChars(jFromAddress, fromAddress);
	env->ReleaseStringUTFChars(jPayloadJson, payloadJson);
	env->ReleaseStringUTFChars(jMemo, memo);

	if (exception) {
		ThrowWalletException(env, msgException.c_str());
	}

	return tx;
}

#define SIG_nativeCreateCancelProducerTransaction "(JLjava/lang/String;Ljava/lang/String;Ljava/lang/String;Z)Ljava/lang/String;"
static jstring JNICALL nativeCreateCancelProducerTransaction(JNIEnv *env, jobject clazz, jlong jProxy,
		jstring jFromAddress,
		jstring jPayloadJson,
		jstring jMemo,
		jboolean useVotedUTXO)
{
	bool exception = false;
	std::string msgException;
	jstring tx = NULL;

	const char *fromAddress = env->GetStringUTFChars(jFromAddress, NULL);
	const char *payloadJson = env->GetStringUTFChars(jPayloadJson, NULL);
	const char *memo        = env->GetStringUTFChars(jMemo, NULL);

	try {
		IMainchainSubWallet *wallet = (IMainchainSubWallet *)jProxy;
		nlohmann::json payload = nlohmann::json::parse(payloadJson);
		nlohmann::json txJson = wallet->CreateCancelProducerTransaction(fromAddress, payload, memo, useVotedUTXO);
		tx = env->NewStringUTF(txJson.dump().c_str());
	} catch (const std::exception &e) {
		exception = true;
		msgException = e.what();
	}

	env->ReleaseStringUTFChars(jFromAddress, fromAddress);
	env->ReleaseStringUTFChars(jPayloadJson, payloadJson);
	env->ReleaseStringUTFChars(jMemo, memo);

	if (exception) {
		ThrowWalletException(env, msgException.c_str());
	}

	return tx;
}

#define SIG_nativeCreateRetrieveDepositTransaction "(JLjava/lang/String;)Ljava/lang/String;"
static jstring JNICALL nativeCreateRetrieveDepositTransaction(JNIEnv *env, jobject clazz, jlong jProxy,
		jstring jMemo)
{
	bool exception = false;
	std::string msgException;
	jstring tx = NULL;

	const char *memo = env->GetStringUTFChars(jMemo, NULL);

	try {
		IMainchainSubWallet *wallet = (IMainchainSubWallet *)jProxy;
		nlohmann::json txJson = wallet->CreateRetrieveDepositTransaction(memo);
		tx = env->NewStringUTF(txJson.dump().c_str());
	} catch (const std::exception &e) {
		exception = true;
		msgException = e.what();
	}

	env->ReleaseStringUTFChars(jMemo, memo);

	if (exception) {
		ThrowWalletException(env, msgException.c_str());
	}

	return tx;
}

#define SIG_nativeGetPublicKeyForVote "(J)Ljava/lang/String;"
static jstring JNICALL nativeGetPublicKeyForVote(JNIEnv *env, jobject clazz, jlong jProxy)
{
	bool exception = false;
	std::string msgException;
	jstring publicKey = NULL;

	try {
		IMainchainSubWallet *wallet = (IMainchainSubWallet *)jProxy;
		std::string pubKey = wallet->GetPublicKeyForVote();
		publicKey = env->NewStringUTF(pubKey.c_str());
	} catch (const std::exception &e) {
		exception = true;
		msgException = e.what();
	}

	if (exception) {
		ThrowWalletException(env, msgException.c_str());
	}

	return publicKey;
}

#define SIG_nativeCreateVoteProducerTransaction "(JJLjava/lang/String;Ljava/lang/String;Z)Ljava/lang/String;"
static jstring JNICALL nativeCreateVoteProducerTransaction(JNIEnv *env, jobject clazz, jlong jProxy,
		jlong stake,
		jstring jPublicKeys,
		jstring jMemo,
		jboolean useVotedUTXO)
{

	bool exception = false;
	std::string msgException;

	const char *publicKeys = env->GetStringUTFChars(jPublicKeys, NULL);
	const char *memo       = env->GetStringUTFChars(jMemo, NULL);

	jstring tx = NULL;

	try {
		IMainchainSubWallet *wallet = (IMainchainSubWallet*)jProxy;
		nlohmann::json txJson = wallet->CreateVoteProducerTransaction(stake, nlohmann::json::parse(publicKeys), memo, useVotedUTXO);
		tx = env->NewStringUTF(txJson.dump().c_str());
	} catch (std::exception &e) {
		exception = true;
		msgException = e.what();
	}

	env->ReleaseStringUTFChars(jPublicKeys, publicKeys);
	env->ReleaseStringUTFChars(jMemo, memo);

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
	REGISTER_METHOD(nativeGenerateProducerPayload),
	REGISTER_METHOD(nativeGenerateCancelProducerPayload),
	REGISTER_METHOD(nativeCreateRegisterProducerTransaction),
	REGISTER_METHOD(nativeCreateUpdateProducerTransaction),
	REGISTER_METHOD(nativeCreateCancelProducerTransaction),
	REGISTER_METHOD(nativeCreateRetrieveDepositTransaction),
	REGISTER_METHOD(nativeGetPublicKeyForVote),
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


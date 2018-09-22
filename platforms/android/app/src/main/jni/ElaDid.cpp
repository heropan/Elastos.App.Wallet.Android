// Copyright (c) 2012-2018 The Elastos Open Source Project
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

#include "ElaUtils.h"
#include "idid.h"
#include "nlohmann/json.hpp"

using namespace Elastos::DID;

//"(J)Ljava/lang/String;"
static jstring JNICALL nativeGetDIDName(JNIEnv *env, jobject clazz, jlong jDidProxy)
{
	jstring idName = NULL;

	try {
		IDID *did = (IDID*)jDidProxy;
		std::string value = did->GetDIDName();
		idName = env->NewStringUTF(value.c_str());
	} catch (std::exception &e) {
		ThrowWalletException(env, e.what());
	}

	return idName;
}

//"(JLjava/lang/String;Ljava/lang/String;)V"
static void JNICALL nativeSetValue(JNIEnv *env, jobject clazz, jlong jDidProxy,
		jstring jkeyPath,
		jstring jvalueJson)
{
	bool exception = false;
	std::string msgException;

	const char* keyPath = env->GetStringUTFChars(jkeyPath, NULL);
	const char* valueJson = env->GetStringUTFChars(jvalueJson, NULL);

	try {
		IDID* did = (IDID*)jDidProxy;
		did->SetValue(keyPath, nlohmann::json::parse(valueJson));
	} catch (std::exception &e) {
		exception = true;
		msgException = e.what();
	}

	env->ReleaseStringUTFChars(jkeyPath, keyPath);
	env->ReleaseStringUTFChars(jvalueJson, valueJson);

	if (exception) {
		ThrowWalletException(env, msgException.c_str());
	}
}

//"(JLjava/lang/String;)Ljava/lang/String;"
static /*nlohmann::json*/ jstring JNICALL nativeGetValue(JNIEnv *env, jobject clazz, jlong jDidProxy,
		jstring jpath)
{
	bool exception = false;
	std::string msgException;

	const char* path = env->GetStringUTFChars(jpath, NULL);
	jstring value = NULL;

	try {
		IDID* did = (IDID*)jDidProxy;
		nlohmann::json jsonValue = did->GetValue(path);
		value = env->NewStringUTF(jsonValue.dump().c_str());
	} catch (std::exception &e) {
		exception = true;
		msgException = e.what();
	}

	env->ReleaseStringUTFChars(jpath, path);

	if (exception) {
		ThrowWalletException(env, msgException.c_str());
	}

	return value;
}

//"(JLjava/lang/String;)Ljava/lang/String;"
static /*nlohmann::json*/ jstring JNICALL nativeGetHistoryValue(JNIEnv *env, jobject clazz, jlong jDidProxy,
		jstring jkeyPath)
{
	bool exception = false;
	std::string msgException;

	const char* keyPath = env->GetStringUTFChars(jkeyPath, NULL);
	jstring value = NULL;

	try {
		IDID* did = (IDID*)jDidProxy;
		nlohmann::json jsonValue = did->GetHistoryValue(keyPath);
		value = env->NewStringUTF(jsonValue.dump().c_str());
	} catch (std::exception &e) {
		exception = true;
		msgException = e.what();
	}

	env->ReleaseStringUTFChars(jkeyPath, keyPath);

	if (exception) {
		ThrowWalletException(env, msgException.c_str());
	}

	return value;
}

//"(JII)Ljava/lang/String;"
static /*nlohmann::json*/ jstring JNICALL nativeGetAllKeys(JNIEnv *env, jobject clazz, jlong jDidProxy,
		jint jstart,
		jint jcount)
{
	jstring keys = NULL;

	try {
		IDID* did = (IDID*)jDidProxy;
		nlohmann::json jsonValue = did->GetAllKeys(jstart, jcount);
		keys = env->NewStringUTF(jsonValue.dump().c_str());
	} catch (std::exception &e) {
		ThrowWalletException(env, e.what());
	}

	return keys;
}

//"(JLjava/lang/String;Ljava/lang/String;)Ljava/lang/String;"
static jstring JNICALL nativeSign(JNIEnv *env, jobject clazz, jlong jDidProxy,
		jstring jmessage,
		jstring jpassword)
{
	bool exception = false;
	std::string msgException;

	const char* message = env->GetStringUTFChars(jmessage, NULL);
	const char* password = env->GetStringUTFChars(jpassword, NULL);
	jstring result = NULL;

	try {
		IDID* did = (IDID*)jDidProxy;
		std::string r = did->Sign(message, password);
		result = env->NewStringUTF(r.c_str());
	} catch (std::exception &e) {
		exception = true;
		msgException = e.what();
	}

	env->ReleaseStringUTFChars(jmessage, message);
	env->ReleaseStringUTFChars(jpassword, password);

	if (exception) {
		ThrowWalletException(env, msgException.c_str());
	}

	return result;
}

//"(JLjava/lang/String;Ljava/lang/String;)Ljava/lang/String;"
static /*nlohmann::json*/ jstring JNICALL nativeCheckSign(JNIEnv *env, jobject clazz, jlong jDidProxy,
		jstring jmessage,
		jstring jsignature)
{
	bool exception = false;
	std::string msgException;

	const char *message = env->GetStringUTFChars(jmessage, NULL);
	const char *signature = env->GetStringUTFChars(jsignature, NULL);

	jstring result = NULL;

	try {
		IDID *did = (IDID *)jDidProxy;
		nlohmann::json r = did->CheckSign(message, signature);
		result = env->NewStringUTF(r.dump().c_str());
	} catch (std::exception &e) {
		exception = true;
		msgException = e.what();
	}

	env->ReleaseStringUTFChars(jmessage, message);
	env->ReleaseStringUTFChars(jsignature, signature);

	if (exception) {
		ThrowWalletException(env, msgException.c_str());
	}

	return result;
}

//"(J)Ljava/lang/String;"
static jstring JNICALL nativeGetPublicKey(JNIEnv *env, jobject clazz, jlong jDidProxy)
{
	jstring key = NULL;

	try {
		IDID *did = (IDID *)jDidProxy;
		std::string value = did->GetPublicKey();
		key = env->NewStringUTF(value.c_str());
	} catch (std::exception &e) {
		ThrowWalletException(env, e.what());
	}

	return key;
}

//"(JLjava/lang/String;Ljava/lang/String;)Ljava/lang/String;"
static jstring JNICALL nativeGenerateProgram(JNIEnv *env, jobject clazz, jlong jDidProxy,
		jstring jmessage,
		jstring jpassword)
{
	bool exception = false;
	std::string msgException;

	const char *message = env->GetStringUTFChars(jmessage, NULL);
	const char *password = env->GetStringUTFChars(jpassword, NULL);
	jstring program = NULL;

	try {
		IDID* did = (IDID *)jDidProxy;
		nlohmann::json jsonValue = did->GenerateProgram(message, password);
		program = env->NewStringUTF(jsonValue.dump().c_str());
	} catch (std::exception &e) {
		exception = true;
		msgException = e.what();
	}

	env->ReleaseStringUTFChars(jmessage, message);
	env->ReleaseStringUTFChars(jpassword, password);

	if (exception) {
		ThrowWalletException(env, msgException.c_str());
	}

	return program;
}

static const JNINativeMethod gMethods[] = {
	{
		"nativeGetDIDName",
		"(J)Ljava/lang/String;",
		(void*)nativeGetDIDName
	},
	{
		"nativeSetValue",
		"(JLjava/lang/String;Ljava/lang/String;)V",
		(void*)nativeSetValue
	},
	{
		"nativeGetValue",
		"(JLjava/lang/String;)Ljava/lang/String;",
		(void*)nativeGetValue
	},
	{
		"nativeGetHistoryValue",
		"(JLjava/lang/String;)Ljava/lang/String;",
		(void*)nativeGetHistoryValue
	},
	{
		"nativeGetAllKeys",
		"(JII)Ljava/lang/String;",
		(void*)nativeGetAllKeys
	},
	{
		"nativeSign",
		"(JLjava/lang/String;Ljava/lang/String;)Ljava/lang/String;",
		(void*)nativeSign
	},
	{
		"nativeCheckSign",
		"(JLjava/lang/String;Ljava/lang/String;)Ljava/lang/String;",
		(void*)nativeCheckSign
	},
	{
		"nativeGetPublicKey",
		"(J)Ljava/lang/String;",
		(void*)nativeGetPublicKey
	},
	{
		"nativeGenerateProgram",
		"(JLjava/lang/String;Ljava/lang/String;)Ljava/lang/String;",
		(void*)nativeGenerateProgram
	},
};

jint register_elastos_spv_IDid(JNIEnv *env)
{
	return jniRegisterNativeMethods(env,
			"com/elastos/spvcore/IDid",
			gMethods, NELEM(gMethods));
}


// Copyright (c) 2012-2018 The Elastos Open Source Project
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

#include "ElaUtils.h"
#include "IIdChainSubWallet.h"
#include "nlohmann/json.hpp"

using namespace Elastos::ElaWallet;

extern const char* ToStringFromJson(const nlohmann::json& jsonValue);
extern nlohmann::json ToJosnFromString(const char* str);

//"(JLjava/lang/String;Ljava/lang/String;JLjava/lang/String;Ljava/lang/String;JLjava/lang/String;)Ljava/lang/String;"
static jstring JNICALL nativeCreateIdTransaction(JNIEnv *env, jobject clazz, jlong jIdSubWalletProxy, jstring jfromAddress,
        jstring jtoAddress, jlong amount, jstring jpayloadJson, jstring jprogramJson, jlong fee, jstring jmemo, jstring jremark)
{
    const char* fromAddress = env->GetStringUTFChars(jfromAddress, NULL);
    const char* toAddress = env->GetStringUTFChars(jtoAddress, NULL);
    const char* payloadJson = env->GetStringUTFChars(jpayloadJson, NULL);
    const char* programJson = env->GetStringUTFChars(jprogramJson, NULL);
    const char* memo = env->GetStringUTFChars(jmemo, NULL);
    const char* remark = env->GetStringUTFChars(jremark, NULL);

    IIdChainSubWallet* wallet = (IIdChainSubWallet*)jIdSubWalletProxy;
    nlohmann::json txidJson = wallet->CreateIdTransaction(fromAddress, toAddress, amount
            , ToJosnFromString(payloadJson), ToJosnFromString(programJson), fee, memo, remark);

    env->ReleaseStringUTFChars(jfromAddress, fromAddress);
    env->ReleaseStringUTFChars(jtoAddress, toAddress);
    env->ReleaseStringUTFChars(jpayloadJson, payloadJson);
    env->ReleaseStringUTFChars(jprogramJson, programJson);
    env->ReleaseStringUTFChars(jmemo, memo);
    env->ReleaseStringUTFChars(jremark, remark);

    return env->NewStringUTF(ToStringFromJson(txidJson));
}


static const JNINativeMethod gMethods[] = {
    {"nativeCreateIdTransaction",
    "(JLjava/lang/String;Ljava/lang/String;JLjava/lang/String;Ljava/lang/String;JLjava/lang/String;Ljava/lang/String;)Ljava/lang/String;",
    (void*)nativeCreateIdTransaction},
};

jint register_elastos_spv_IIdChainSubWallet(JNIEnv *env)
{
    return jniRegisterNativeMethods(env, "com/elastos/spvcore/IIdChainSubWallet",
        gMethods, NELEM(gMethods));
}
